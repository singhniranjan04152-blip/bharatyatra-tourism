const crypto = require("crypto");
const { promisify } = require("util");
const { Pool } = require("pg");

const scrypt = promisify(crypto.scrypt);
const sessionCookie = "bharatyatra_session";
const sessionDurationMs = 7 * 24 * 60 * 60 * 1000;
const categories = ["Mountain", "Beach", "Heritage", "Nature", "Spiritual", "Adventure"];
const attemptsByEmail = new Map();
let pool;
let schemaPromise;
let attemptChecks = 0;

function database() {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) {
    const connectionUrl = new URL(process.env.DATABASE_URL);
    connectionUrl.searchParams.delete("sslmode");
    connectionUrl.searchParams.delete("ssl");
    pool = new Pool({
      connectionString: connectionUrl.toString(),
      max: 3,
      ssl: { rejectUnauthorized: false }
    });
    pool.on("error", (error) => console.error("Authentication database connection error:", error.message));
  }
  return pool;
}

async function ensureSchema(db) {
  if (!schemaPromise) {
    schemaPromise = db.query(`
      CREATE TABLE IF NOT EXISTS bharatyatra_users (
        id BIGSERIAL PRIMARY KEY,
        name VARCHAR(80) NOT NULL,
        email VARCHAR(254) NOT NULL UNIQUE,
        password_salt TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        preferences JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS bharatyatra_sessions (
        token_hash TEXT PRIMARY KEY,
        user_id BIGINT NOT NULL REFERENCES bharatyatra_users(id) ON DELETE CASCADE,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS bharatyatra_sessions_expiry_idx
        ON bharatyatra_sessions (expires_at);
    `).catch((error) => {
      schemaPromise = null;
      throw error;
    });
  }
  return schemaPromise;
}

function sendJson(response, status, payload, headers = {}) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...headers
  });
  response.end(JSON.stringify(payload));
}

function cookieOptions(maxAgeSeconds) {
  const secure = process.env.NODE_ENV === "production" || Boolean(process.env.RENDER);
  return `${sessionCookie}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAgeSeconds}${secure ? "; Secure" : ""}`;
}

function readCookie(request) {
  const cookies = (request.headers.cookie || "").split(";");
  const entry = cookies.find((cookie) => cookie.trim().startsWith(`${sessionCookie}=`));
  return entry ? entry.trim().slice(sessionCookie.length + 1) : "";
}

function digestToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function publicUser(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    preferences: row.preferences || {}
  };
}

function normalizePreferences(input = {}) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("Trip preferences are required.");
  }
  const days = Number(input.days);
  const budget = Number(input.budget);
  const partySize = Number(input.partySize);
  const pace = input.pace;
  const selectedCategories = Array.isArray(input.categories)
    ? [...new Set(input.categories.filter((category) => categories.includes(category)))]
    : [];

  if (!Number.isInteger(days) || days < 1 || days > 30) {
    throw new Error("Choose between 1 and 30 trip days.");
  }
  if (!Number.isInteger(budget) || budget < 1000 || budget > 5000000) {
    throw new Error("Enter a total budget between Rs. 1,000 and Rs. 50,00,000.");
  }
  if (!Number.isInteger(partySize) || partySize < 1 || partySize > 20) {
    throw new Error("Choose between 1 and 20 travellers.");
  }
  if (!["relaxed", "balanced", "packed"].includes(pace)) {
    throw new Error("Choose a valid travel pace.");
  }

  return { days, budget, partySize, pace, categories: selectedCategories };
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    const contentType = request.headers["content-type"] || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      reject(new Error("Please send JSON data."));
      return;
    }

    let body = "";
    let tooLarge = false;
    request.on("data", (chunk) => {
      if (tooLarge) return;
      body += chunk;
      if (body.length > 10000) {
        tooLarge = true;
        reject(new Error("Request is too large."));
      }
    });
    request.on("end", () => {
      if (tooLarge) return;
      try {
        const parsed = JSON.parse(body || "{}");
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
          reject(new Error("Please send valid JSON data."));
          return;
        }
        resolve(parsed);
      } catch {
        reject(new Error("Please send valid JSON data."));
      }
    });
    request.on("error", reject);
  });
}

function checkAttempt(email) {
  const now = Date.now();
  attemptChecks += 1;
  if (attemptChecks % 100 === 0 || attemptsByEmail.size > 2000) {
    for (const [key, times] of attemptsByEmail) {
      if (!times.some((time) => now - time < 15 * 60 * 1000)) attemptsByEmail.delete(key);
    }
    if (attemptsByEmail.size > 5000) {
      attemptsByEmail.delete(attemptsByEmail.keys().next().value);
    }
  }
  const attempts = (attemptsByEmail.get(email) || []).filter((time) => now - time < 15 * 60 * 1000);
  if (attempts.length >= 10) {
    attemptsByEmail.set(email, attempts);
    return false;
  }
  attempts.push(now);
  attemptsByEmail.set(email, attempts);
  return true;
}

async function createSession(db, userId) {
  const token = crypto.randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + sessionDurationMs);
  await db.query("DELETE FROM bharatyatra_sessions WHERE expires_at <= NOW()");
  await db.query(
    "INSERT INTO bharatyatra_sessions (token_hash, user_id, expires_at) VALUES ($1, $2, $3)",
    [digestToken(token), userId, expiresAt]
  );
  const secure = process.env.NODE_ENV === "production" || Boolean(process.env.RENDER);
  return `${sessionCookie}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${Math.floor(sessionDurationMs / 1000)}${secure ? "; Secure" : ""}`;
}

async function authenticatedUser(db, request) {
  const token = readCookie(request);
  if (!/^[A-Za-z0-9_-]{40,50}$/.test(token)) return null;
  const result = await db.query(`
    SELECT u.id, u.name, u.email, u.preferences
    FROM bharatyatra_sessions s
    JOIN bharatyatra_users u ON u.id = s.user_id
    WHERE s.token_hash = $1 AND s.expires_at > NOW()
  `, [digestToken(token)]);
  return result.rows[0] || null;
}

function destinationCost(value) {
  const amounts = String(value || "").match(/[\d,]+/g) || [];
  const validAmounts = amounts
    .map((amount) => Number(amount.replace(/,/g, "")))
    .filter((amount) => Number.isFinite(amount) && amount >= 1000);
  if (validAmounts.length >= 2) return (validAmounts[0] + validAmounts[1]) / 2;
  return validAmounts[0] || 20000;
}

function makePlan(preferences, destinations) {
  const selected = destinations
    .map((destination) => {
      const matchesInterest = preferences.categories.length === 0
        || preferences.categories.includes(destination.category);
      const estimatedTotal = destinationCost(destination.budget) * preferences.partySize;
      const score = (matchesInterest ? 100 : -100)
        + (estimatedTotal <= preferences.budget ? 25 : -Math.min(40, (estimatedTotal - preferences.budget) / preferences.budget * 40))
        + (Number(destination.rating) || 0);
      return { destination, estimatedTotal, score };
    })
    .filter((item) => item.destination.name)
    .sort((left, right) => right.score - left.score);

  const matches = selected.some((item) => item.score > 0)
    ? selected.filter((item) => item.score > 0)
    : selected;
  const activities = {
    relaxed: ["Arrive, settle in and enjoy an easy local evening.", "Explore one nearby highlight, with time to rest.", "Keep the day flexible for local food and scenery."],
    balanced: ["Arrive, explore a key local highlight and try regional food.", "Visit a major attraction and explore the surrounding area.", "Enjoy a local experience and leave time for a relaxed evening."],
    packed: ["Start early for a landmark visit, then explore the local area.", "Cover two nearby highlights and try a regional food stop.", "Take an early excursion and enjoy an evening in town."]
  }[preferences.pace];

  return Array.from({ length: preferences.days }, (_, index) => {
    const match = matches[index % matches.length];
    return {
      day: index + 1,
      destination: match.destination.name,
      state: match.destination.state,
      category: match.destination.category,
      bestTime: match.destination.bestTime || "Check local seasonal guidance",
      estimatedBudget: Math.round(match.estimatedTotal),
      idea: activities[index % activities.length]
    };
  });
}

async function handleAuthRequest(request, response, requestPath, destinationsLoader) {
  if (!requestPath.startsWith("/api/auth/")) return false;

  if (requestPath === "/api/auth/status" && request.method === "GET") {
    sendJson(response, 200, { configured: Boolean(process.env.DATABASE_URL) });
    return true;
  }

  const db = database();
  if (!db) {
    sendJson(response, 503, { error: "Account storage is not configured yet. Please try again later." });
    return true;
  }

  try {
    await ensureSchema(db);

    if (requestPath === "/api/auth/register" && request.method === "POST") {
      const body = await readBody(request);
      const name = typeof body.name === "string" ? body.name.trim() : "";
      const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
      const password = typeof body.password === "string" ? body.password : "";
      if (name.length < 2 || name.length > 80) {
        sendJson(response, 400, { error: "Enter a name between 2 and 80 characters." });
        return true;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
        sendJson(response, 400, { error: "Enter a valid email address." });
        return true;
      }
      if (password.length < 8 || password.length > 128) {
        sendJson(response, 400, { error: "Password must be between 8 and 128 characters." });
        return true;
      }

      let preferences;
      try {
        preferences = normalizePreferences(body.preferences);
      } catch (error) {
        sendJson(response, 400, { error: error.message });
        return true;
      }
      const salt = crypto.randomBytes(16).toString("hex");
      const passwordHash = await scrypt(password, salt, 64);
      const client = await db.connect();
      try {
        await client.query("BEGIN");
        const inserted = await client.query(`
          INSERT INTO bharatyatra_users (name, email, password_salt, password_hash, preferences)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id, name, email, preferences
        `, [name, email, salt, passwordHash.toString("hex"), preferences]);
        const user = inserted.rows[0];
        const cookie = await createSession(client, user.id);
        await client.query("COMMIT");
        response.setHeader("Set-Cookie", cookie);
        sendJson(response, 201, { user: publicUser(user) });
      } catch (error) {
        await client.query("ROLLBACK");
        if (error.code === "23505") {
          sendJson(response, 409, { error: "An account with this email already exists. Please log in." });
          return true;
        }
        throw error;
      } finally {
        client.release();
      }
      return true;
    }

    if (requestPath === "/api/auth/login" && request.method === "POST") {
      const body = await readBody(request);
      const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
      const password = typeof body.password === "string" ? body.password : "";
      if (!email || !password || !checkAttempt(email)) {
        sendJson(response, email && password ? 429 : 400, {
          error: email && password ? "Too many login attempts. Try again in 15 minutes." : "Email and password are required."
        });
        return true;
      }
      const found = await db.query(
        "SELECT id, name, email, password_salt, password_hash, preferences FROM bharatyatra_users WHERE email = $1",
        [email]
      );
      const user = found.rows[0];
      const salt = user ? user.password_salt : crypto.randomBytes(16).toString("hex");
      const expectedHash = user ? user.password_hash : Buffer.alloc(64).toString("hex");
      const candidateHash = await scrypt(password, salt, 64);
      const isValid = user
        && crypto.timingSafeEqual(candidateHash, Buffer.from(expectedHash, "hex"));
      if (!isValid) {
        sendJson(response, 401, { error: "Email or password is incorrect." });
        return true;
      }
      attemptsByEmail.delete(email);
      response.setHeader("Set-Cookie", await createSession(db, user.id));
      sendJson(response, 200, { user: publicUser(user) });
      return true;
    }

    if (requestPath === "/api/auth/logout" && request.method === "POST") {
      const token = readCookie(request);
      if (token) {
        await db.query("DELETE FROM bharatyatra_sessions WHERE token_hash = $1", [digestToken(token)]);
      }
      sendJson(response, 200, { ok: true }, { "Set-Cookie": cookieOptions(0) });
      return true;
    }

    if (requestPath === "/api/auth/me" && request.method === "GET") {
      const user = await authenticatedUser(db, request);
      sendJson(response, user ? 200 : 401, user
        ? { user: publicUser(user) }
        : { error: "Please log in to continue." });
      return true;
    }

    if (requestPath === "/api/auth/profile" && request.method === "POST") {
      const user = await authenticatedUser(db, request);
      if (!user) {
        sendJson(response, 401, { error: "Please log in to continue." });
        return true;
      }
      const body = await readBody(request);
      let preferences;
      try {
        preferences = normalizePreferences(body.preferences);
      } catch (error) {
        sendJson(response, 400, { error: error.message });
        return true;
      }
      const updated = await db.query(
        "UPDATE bharatyatra_users SET preferences = $1 WHERE id = $2 RETURNING id, name, email, preferences",
        [preferences, user.id]
      );
      sendJson(response, 200, { user: publicUser(updated.rows[0]) });
      return true;
    }

    if (requestPath === "/api/auth/plan" && request.method === "POST") {
      const user = await authenticatedUser(db, request);
      if (!user) {
        sendJson(response, 401, { error: "Please log in to continue." });
        return true;
      }
      const preferences = normalizePreferences(user.preferences);
      const plan = makePlan(preferences, destinationsLoader());
      sendJson(response, 200, {
        plan,
        preferences,
        note: "Budget estimates are approximate per destination and can change with dates, transport and availability."
      });
      return true;
    }

    sendJson(response, 404, { error: "Authentication route not found." });
    return true;
  } catch (error) {
    if (error.message === "Please send JSON data."
      || error.message === "Please send valid JSON data."
      || error.message === "Request is too large.") {
      sendJson(response, 400, { error: error.message });
      return true;
    }
    console.error("Authentication request failed:", error.message);
    sendJson(response, 500, { error: "Account service is temporarily unavailable. Please try again." });
    return true;
  }
}

module.exports = { handleAuthRequest };
