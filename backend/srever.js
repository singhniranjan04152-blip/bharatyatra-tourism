const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || "0.0.0.0";
const rootDir = path.resolve(__dirname, "..");
const envPath = path.join(__dirname, ".env");
const dataPath = path.join(__dirname, "data.json");

function loadEnv() {
  if (!fs.existsSync(envPath)) return;

  fs.readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .forEach((line) => {
      const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)\s*$/);
      if (match && !process.env[match[1]]) {
        process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
      }
    });
}
loadEnv();

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

function getDefaultFacilities(category) {
  const value = (category || "Nature").toLowerCase();

  const facilityMap = {
    mountain: {
      cabOptions: ["Airport cab", "Local taxi", "Mountain transfer"],
      stayOptions: ["Hostel", "Guest house", "Hill resort"]
    },
    beach: {
      cabOptions: ["Airport cab", "Beach taxi", "Bike rental"],
      stayOptions: ["Hostel", "Guest room", "Beach resort"]
    },
    heritage: {
      cabOptions: ["City cab", "Tour taxi", "Private transfer"],
      stayOptions: ["Heritage stay", "Guest room", "Budget hotel"]
    },
    nature: {
      cabOptions: ["Local cab", "Forest route taxi", "Private transfer"],
      stayOptions: ["Eco hostel", "Guest house", "Nature lodge"]
    },
    spiritual: {
      cabOptions: ["Temple cab", "Local taxi", "Rail pickup"],
      stayOptions: ["Dharmshala", "Guest room", "Budget stay"]
    },
    adventure: {
      cabOptions: ["Adventure cab", "SUV transfer", "Local taxi"],
      stayOptions: ["Backpacker hostel", "Guest house", "Adventure lodge"]
    }
  };

  return facilityMap[value] || {
    cabOptions: ["Airport cab", "Local taxi", "Private transfer"],
    stayOptions: ["Hostel", "Guest room", "Budget stay"]
  };
}

const defaultDestinations = [
  {
    name: "Kerala",
    state: "Kerala",
    category: "Nature",
    bestTime: "September to March",
    budget: "Rs. 18,000-35,000 per person",
    description: "Kerala is famous for backwaters, tea gardens, houseboat stays and calm hill town experiences.",
    ...getDefaultFacilities("Nature")
  },
  {
    name: "Goa",
    state: "Goa",
    category: "Beach",
    bestTime: "November to February",
    budget: "Rs. 15,000-30,000 per person",
    description: "Goa offers beaches, nightlife, forts, cafes and relaxed coastal holidays.",
    ...getDefaultFacilities("Beach")
  },
  {
    name: "Rajasthan",
    state: "Rajasthan",
    category: "Heritage",
    bestTime: "October to March",
    budget: "Rs. 20,000-40,000 per person",
    description: "Rajasthan is known for forts, palaces, desert camps and royal heritage experiences.",
    ...getDefaultFacilities("Heritage")
  },
  {
    name: "Kashmir",
    state: "Jammu & Kashmir",
    category: "Mountain",
    bestTime: "April to June / December to March",
    budget: "Rs. 22,000-45,000 per person",
    description: "Kashmir is loved for lakes, valleys, snow views and Mughal gardens.",
    ...getDefaultFacilities("Mountain")
  },
  {
    name: "Himachal",
    state: "Himachal Pradesh",
    category: "Mountain",
    bestTime: "March to June",
    budget: "Rs. 16,000-32,000 per person",
    description: "Himachal offers mountain roads, hill stations and adventure activities.",
    ...getDefaultFacilities("Mountain")
  }
];

function sendJson(response, statusCode, payload, extraHeaders = {}) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    ...extraHeaders
  });
  response.end(JSON.stringify(payload));
}

function readData() {
  try {
    if (!fs.existsSync(dataPath)) {
      const initialData = { trips: [] };
      fs.writeFileSync(dataPath, JSON.stringify(initialData, null, 2));
      return initialData;
    }

    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    return {
      trips: Array.isArray(data.trips) ? data.trips : []
    };
  } catch {
    return { trips: [] };
  }
}

function writeData(data) {
  const temporaryPath = `${dataPath}.tmp`;
  fs.writeFileSync(temporaryPath, JSON.stringify(data, null, 2));
  fs.renameSync(temporaryPath, dataPath);
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 50000) {
        reject(new Error("Request too large"));
      }
    });

    request.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });

    request.on("error", reject);
  });
}

function loadWebsiteDestinations() {
  try {
    const indexPath = path.join(rootDir, "index.html");
    if (!fs.existsSync(indexPath)) return [...defaultDestinations];

    const source = fs.readFileSync(indexPath, "utf8");
    const items = [...source.matchAll(/\{([\s\S]*?)\n\s*\}/g)]
      .map((match) => {
        const block = match[1];
        const read = (field) => {
          const value = block.match(new RegExp(`${field}\\s*:\\s*["']([^"']*)["']`));
          return value ? value[1] : null;
        };

        return {
          name: read("name"),
          state: read("state"),
          category: read("category"),
          image: read("image"),
          description: read("description"),
          bestTime: read("bestTime"),
          budget: read("budget"),
          rating: read("rating")
        };
      })
      .filter((item) => item.name && item.state && item.category && item.description && item.bestTime && item.budget);

    if (items.length > 0) {
      return items.map((destination) => {
        return {
          ...destination,
          ...getDefaultFacilities(destination.category)
        };
      });
    }
  } catch {
    // fallback to default
  }

  return [...defaultDestinations];
}

function websiteFeaturesAnswer() {
  return "Bharatyatra ke features: destination search, category filters, destination details, Favorites, My Trip Planner, AI Travel Assistant, Hindi/English mode, dark mode aur responsive layout.";
}

function parseBudget(query) {
  const budgetMatch = query.match(/(?:rs\.?|inr|₹)\s?([\d,]+)/i);
  return budgetMatch ? Number(budgetMatch[1].replace(/,/g, "")) : null;
}

function parseDays(query) {
  const daysMatch = query.match(/(\d+)\s*(day|days|din)/i);
  return daysMatch ? Number(daysMatch[1]) : null;
}

function findMentionedDestinations(query, destinations) {
  return destinations.filter((destination) =>
    query.includes(destination.name.toLowerCase()) ||
    query.includes(destination.state.toLowerCase())
  );
}

function createItinerary(destination, days) {
  const activities = {
    Mountain: ["arrival and local market", "scenic viewpoint and cafe", "nearby valley or lake", "adventure activity", "slow morning and departure"],
    Beach: ["arrival and sunset beach walk", "water activity and coastal lunch", "old town or fort visit", "quiet beach and local shopping", "departure"],
    Heritage: ["old city walk", "fort or palace visit", "local food trail", "museum and market", "departure"],
    Nature: ["arrival and local sightseeing", "main nature trail or viewpoint", "wildlife, tea garden or waterfall visit", "slow local experience", "departure"],
    Spiritual: ["arrival and evening visit", "temple or ghat exploration", "local culture and food", "nearby landmark", "departure"],
    Adventure: ["arrival and briefing", "main outdoor activity", "scenic route or exploration", "relaxed local day", "departure"]
  };
  const plan = activities[destination.category] || activities.Nature;
  const totalDays = Math.max(2, Math.min(days || 5, 7));

  return Array.from({ length: totalDays }, (_, index) =>
    `Day ${index + 1}: ${plan[Math.min(index, plan.length - 1)]}`
  ).join("\n");
}

function createLocalTravelAnswer(message) {
  const query = (message || "").toLowerCase();
  const days = parseDays(query);
  const budget = parseBudget(query);
  const destinations = loadWebsiteDestinations();
  const mentionedDestinations = findMentionedDestinations(query, destinations);
  const budgetText = budget ? `\nYour mentioned budget: Rs. ${budget.toLocaleString("en-IN")}.` : "";

  if (/(feature|features|kya kya|what can|suvidha)/i.test(query)) {
    return websiteFeaturesAnswer() + " Main itinerary, comparison, budget aur stay/cab suggestions bhi de sakta hoon.";
  }

  if (/(compare|comparison|difference|better|ya | or )/i.test(query) && mentionedDestinations.length >= 2) {
    return mentionedDestinations.slice(0, 3).map((destination) =>
      `${destination.name}: ${destination.category} | ${destination.bestTime} | ${destination.budget}`
    ).join("\n") + "\n\nQuick pick: budget ke liye pehle estimated budget compare karein; weather aur travel season bhi check karein.";
  }

  if (mentionedDestinations.length > 0) {
    const destination = mentionedDestinations[0];
    const asksFacilities = /(cab|taxi|transport|stay|hostel|hotel|guest|room|accommodation)/i.test(query);
    const asksPlan = /(plan|itinerary|schedule|route|days|din)/i.test(query);
    const asksSeason = /(best time|season|kab jana|weather|mausam)/i.test(query);
    const asksSafety = /(safe|safety|suraksha|tips|travel tip)/i.test(query);
    const sections = [`${destination.name}, ${destination.state} (${destination.category})`, destination.description];

    if (asksPlan) {
      sections.push(`\nSuggested ${days || 5}-day plan:\n${createItinerary(destination, days)}`);
    }
    if (asksFacilities) {
      sections.push(`\nCab options: ${(destination.cabOptions || []).join(", ")}`);
      sections.push(`Stay options: ${(destination.stayOptions || []).join(", ")}`);
    }
    if (asksSeason || !asksPlan) sections.push(`Best time: ${destination.bestTime}`);
    sections.push(`Estimated budget: ${destination.budget}.${budgetText}`);
    if (asksSafety) sections.push("Safety tips: licensed cab choose karein, route/weather check karein, aur emergency contacts offline rakhein.");
    sections.push("My Trip Planner me is destination ko save karke itinerary bana sakte hain.");
    return sections.join("\n");
  }

  const category = ["mountain", "beach", "heritage", "nature", "spiritual", "adventure"]
    .find((item) => query.includes(item));

  if (category) {
    const suggestions = destinations
      .filter((destination) => destination.category.toLowerCase() === category)
      .map((destination) => `${destination.name} (${destination.budget})`)
      .join(", ");

    return `${category.charAt(0).toUpperCase() + category.slice(1)} destinations: ${suggestions}. Kisi ek naam ke saath days, budget, cab ya stay poochho for a detailed plan.`;
  }

  const localTravelGuide = {
    kerala: {
      title: "Kerala",
      season: "September to March",
      budget: "Rs. 18,000-35,000 per person for 5 days",
      plan: ["Day 1: Kochi and local food", "Day 2: Munnar tea gardens", "Day 3: Munnar sightseeing", "Day 4: Alleppey houseboat", "Day 5: Kochi departure"],
      tips: "Houseboat booking se pehle reviews check karna zaruri hai."
    },
    goa: {
      title: "Goa",
      season: "November to February",
      budget: "Rs. 15,000-30,000 per person for 4 days",
      plan: ["Day 1: Panjim and Old Goa", "Day 2: North Goa beaches", "Day 3: South Goa beaches", "Day 4: Local shopping and departure"],
      tips: "Beach flags ko check karte rehna best hota hai."
    },
    rajasthan: {
      title: "Rajasthan",
      season: "October to March",
      budget: "Rs. 20,000-40,000 per person for 6 days",
      plan: ["Day 1: Jaipur old city", "Day 2: Amber Fort", "Day 3: Jodhpur", "Day 4: Jaisalmer", "Day 5: Desert camp", "Day 6: Departure"],
      tips: "Desert trips me water aur sunscreen carry rakho."
    },
    kashmir: {
      title: "Kashmir",
      season: "April to June / December to March",
      budget: "Rs. 22,000-45,000 per person for 5 days",
      plan: ["Day 1: Srinagar arrival", "Day 2: Dal Lake", "Day 3: Gulmarg", "Day 4: Pahalgam", "Day 5: Departure"],
      tips: "Hill routes pe weather check karna important hai."
    },
    himachal: {
      title: "Himachal Pradesh",
      season: "March to June",
      budget: "Rs. 16,000-32,000 per person for 5 days",
      plan: ["Day 1: Manali arrival", "Day 2: Solang Valley", "Day 3: Adventure day", "Day 4: Local sightseeing", "Day 5: Departure"],
      tips: "Mountain routes me driving after dark avoid karo."
    }
  };

  let guide = null;

  for (const [keyword, destination] of Object.entries(localTravelGuide)) {
    if (query.includes(keyword)) {
      guide = destination;
      break;
    }
  }

  if (!guide) {
    return "Namaste! Main India tourism assistant hoon. Aap Kerala, Goa, Rajasthan, Kashmir ya Himachal ke liye days, budget, itinerary, best season, hotels ya travel tips pooch sakte hain. Example: '5 din Kerala Rs. 30000 ke andar'.";
  }

  const plan = guide.plan.slice(0, days && days < guide.plan.length ? days : guide.plan.length);

  return `${guide.title} ke liye practical plan:\n\n${plan.join("\n")}\n\nBest time: ${guide.season}\nEstimated budget: ${guide.budget}.${budgetText}\n\nUseful tips: ${guide.tips}`;
}

async function handleAiRequest(request, response) {
  let rawBody = "";

  request.on("data", (chunk) => {
    rawBody += chunk;
    if (rawBody.length > 10000) {
      request.destroy();
    }
  });

  request.on("end", async () => {
    try {
      const payload = JSON.parse(rawBody || "{}");
      const message = (payload.message || "").trim();

      if (!message) {
        sendJson(response, 400, { error: "Please ask something about your trip." });
        return;
      }

      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey || apiKey === "your_rotated_openai_api_key_here") {
        sendJson(response, 200, { answer: createLocalTravelAnswer(message), mode: "local" });
        return;
      }

      try {
        const destinations = loadWebsiteDestinations();
        const destinationContext = destinations
          .map((destination) => `${destination.name} (${destination.state}, ${destination.category}, best time: ${destination.bestTime}, budget: ${destination.budget}, cab: ${(destination.cabOptions || []).join(", ")}, stay: ${(destination.stayOptions || []).join(", ")})`)
          .join("; ");

        const fetchFn = globalThis.fetch;
        if (!fetchFn) {
          sendJson(response, 200, { answer: createLocalTravelAnswer(message), mode: "local" });
          return;
        }

        const apiResponse = await fetchFn("https://api.openai.com/v1/responses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            instructions: `You are Bharatyatra, the travel assistant inside an India tourism website. The website has these features: ${websiteFeaturesAnswer()} Its destination database is: ${destinationContext}. Give practical itineraries, budgets, seasons, safety tips, and explain how to use website features when asked. Use the destination information from the database, and never invent live prices or availability.`,
            input: message,
            max_output_tokens: 500
          })
        });

        const result = await apiResponse.json();

        if (!apiResponse.ok) {
          sendJson(response, 200, { answer: createLocalTravelAnswer(message), mode: "local" });
          return;
        }

        const answer =
          result.output_text ||
          result.output?.[0]?.content?.[0]?.text ||
          "I could not create an answer this time.";

        sendJson(response, 200, { answer });
      } catch {
        sendJson(response, 200, { answer: createLocalTravelAnswer(message), mode: "local" });
      }
    } catch {
      sendJson(response, 400, { error: "Please send a valid JSON message." });
    }
  });
}

async function handleApiRequest(request, response, requestPath) {
  if (requestPath === "/api/health" && request.method === "GET") {
    sendJson(response, 200, { ok: true, service: "bharatyatra-api" });
    return true;
  }

  if (requestPath === "/api/destinations" && request.method === "GET") {
    sendJson(response, 200, { destinations: loadWebsiteDestinations() });
    return true;
  }

  if (requestPath === "/api/trips" && request.method === "GET") {
    sendJson(response, 200, { trips: readData().trips });
    return true;
  }

  if (requestPath === "/api/trips" && request.method === "POST") {
    try {
      const body = await readRequestBody(request);
      if (!body.name || !Array.isArray(body.destinations)) {
        sendJson(response, 400, { error: "Trip name and destinations are required." });
        return true;
      }

      const data = readData();
      const trip = {
        id: Date.now().toString(),
        ...body,
        createdAt: new Date().toISOString()
      };

      data.trips.push(trip);
      writeData(data);

      sendJson(response, 201, { trip });
      return true;
    } catch (error) {
      sendJson(response, 400, { error: error.message });
      return true;
    }
  }

  if (requestPath.startsWith("/api/trips/") && request.method === "PUT") {
    try {
      const id = requestPath.split("/").pop();
      const body = await readRequestBody(request);
      if (!body.name || !Array.isArray(body.destinations)) {
        sendJson(response, 400, { error: "Trip name and destinations are required." });
        return true;
      }

      const data = readData();
      const tripIndex = data.trips.findIndex((trip) => trip.id === id);
      if (tripIndex === -1) {
        sendJson(response, 404, { error: "Trip not found." });
        return true;
      }

      data.trips[tripIndex] = {
        ...data.trips[tripIndex],
        ...body,
        id,
        updatedAt: new Date().toISOString()
      };
      writeData(data);
      sendJson(response, 200, { trip: data.trips[tripIndex] });
      return true;
    } catch (error) {
      sendJson(response, 400, { error: error.message });
      return true;
    }
  }

  if (requestPath.startsWith("/api/trips/") && request.method === "DELETE") {
    const id = requestPath.split("/").pop();
    const data = readData();
    const initialCount = data.trips.length;

    data.trips = data.trips.filter((trip) => trip.id !== id);
    writeData(data);

    sendJson(response, data.trips.length === initialCount ? 404 : 200, {
      ok: data.trips.length !== initialCount
    });
    return true;
  }

  return false;
}

function serveStatic(request, response, requestPath) {
  if (request.method !== "GET") {
    response.writeHead(405);
    response.end("Method not allowed");
    return;
  }

  const relativePath = requestPath === "/" ? "/index.html" : requestPath;
  const filePath = path.resolve(rootDir, `.${relativePath}`);

  if (!filePath.startsWith(rootDir + path.sep) && filePath !== rootDir) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(error.code === "ENOENT" ? 404 : 500);
      response.end(error.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
      "Content-Type": mimeTypes[extension] || "application/octet-stream"
    });
    response.end(file);
  });
}

const server = http.createServer((request, response) => {
  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
    response.end();
    return;
  }

  const requestPath = decodeURIComponent((request.url || "/").split("?")[0]);

  if (request.method === "POST" && requestPath === "/api/ai") {
    handleAiRequest(request, response);
    return;
  }

  handleApiRequest(request, response, requestPath)
    .then((handled) => {
      if (handled) return;
      serveStatic(request, response, requestPath);
    })
    .catch(() => {
      sendJson(response, 500, { error: "Internal server error" });
    });
});

server.listen(port, host, () => {
  console.log(`Bharatyatra is running at http://localhost:${port}`);
  console.log(`Other devices on this Wi-Fi can use your laptop's IP on port ${port}.`);
});