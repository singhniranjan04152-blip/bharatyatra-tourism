const crypto = require("crypto");
const { getDatabase, ensureSchema } = require("./auth");

const packageActivities = {
  "Gulmarg": [["Gulmarg gondola and snow day", 2499, "Gondola ride and guided snow walk"], ["Beginner ski session", 3499, "Introductory slope session with local instructor"]],
  "Pahalgam": [["Lidder riverside guided walk", 1499, "Easy riverside walk and valley viewpoints"], ["Pony trail experience", 1999, "Local pony trail on an operator-approved route"]],
  "Leh": [["Leh acclimatisation and cultural walk", 1299, "Gentle town walk designed for altitude adjustment"], ["Guided high-altitude day excursion", 3999, "Road-based excursion, subject to weather and acclimatisation"]],
  "Manali": [["Solang Valley adventure sampler", 2999, "Choose an operator-approved activity such as zipline or tubing"], ["Guided forest hike", 1799, "Easy guided trail and mountain viewpoints"]],
  "Shimla": [["Mountain biking introduction", 2499, "Beginner ride with helmet and local guide"], ["Guided nature and heritage walk", 1299, "Easy forest-edge walk and town viewpoints"]],
  "Amritsar": [["Heritage cycling and food walk", 1499, "Guided city ride and local food stops"], ["Countryside cycling trail", 1799, "Easy guided ride on an approved local route"]],
  "Jaipur": [["Pink City cycling tour", 1499, "Guided heritage ride on city streets"], ["Hot-air balloon experience", 8999, "Weather-dependent flight with a licensed operator"]],
  "Udaipur": [["Lake kayaking introduction", 1999, "Guided flat-water session when lake conditions allow"], ["Aravalli cycling trail", 2499, "Guided countryside ride for beginners"]],
  "Jaisalmer": [["Thar Desert jeep safari", 2499, "Guided desert drive with sunset stop"], ["Dune camel trail", 1799, "Short operator-led camel experience at the dunes"]],
  "Rishikesh": [["Ganga rafting starter stretch", 1999, "Seasonal guided rafting with approved operator"], ["Riverside bungee experience", 3999, "Age, weight, health and operator rules apply"]],
  "Varanasi": [["Ganga riverside heritage walk", 999, "Guided old-city walking route"], ["Sunrise rowing experience", 1299, "Weather-dependent guided river outing"]],
  "Agra": [["Heritage cycling route", 1299, "Guided early-morning city ride"], ["Yamuna-side birding walk", 999, "Easy nature walk with local guide"]],
  "Goa": [["Coastal kayaking sampler", 1999, "Guided paddle session subject to sea conditions"], ["Snorkelling boat experience", 2999, "Seasonal, operator-led trip with provided safety gear"]],
  "Mumbai": [["Harbour kayaking introduction", 1999, "Guided session in an approved sheltered-water area"], ["Sanjay Gandhi National Park guided cycle", 1499, "Easy guided ride on permitted park routes"]],
  "Pune": [["Sinhagad guided hike", 1299, "Guided fort trail; weather and local rules apply"], ["Pawna lakeside kayaking", 1999, "Flat-water activity with local operator"]],
  "Mahabaleshwar": [["Guided hill trail", 1299, "Easy forest and viewpoint walk"], ["Seasonal valley zipline", 2499, "Subject to operator availability and weather"]],
  "Munnar": [["Tea-country guided hike", 1799, "Guided plantation-edge nature trail"], ["Mountain cycling sampler", 2499, "Beginner route with helmet and local guide"]],
  "Alleppey": [["Backwater kayaking sampler", 1799, "Guided paddle through calm backwater channels"], ["Village cycling and canoe trail", 1499, "Easy guided village ride and canoe experience"]],
  "Ooty": [["Nilgiri guided cycling trail", 1999, "Beginner-friendly ride with local guide"], ["Pykara lakeside boating", 1299, "Operator-run boating, subject to local availability"]],
  "Coorg": [["Coffee estate guided hike", 1499, "Guided plantation-edge nature walk"], ["River rafting introduction", 2499, "Seasonal rafting, only when local operators are running"]],
  "Hampi": [["Tungabhadra coracle ride", 999, "Operator-led river ride when conditions permit"], ["Hampi heritage cycling tour", 1299, "Guided low-speed ride among permitted monuments"]],
  "Mysore": [["Chamundi Hill cycling tour", 1499, "Guided early-morning climb and city views"], ["Kukkarahalli Lake nature walk", 699, "Easy guided bird and nature walk"]],
  "Kanyakumari": [["Coastal cycling sampler", 1499, "Guided town and coastal-viewpoint ride"], ["Sunrise kayak introduction", 1999, "Only in approved sheltered waters and suitable conditions"]],
  "Darjeeling": [["Tea garden guided hike", 1499, "Guided walk through approved tea-estate trails"], ["Mountain biking introduction", 2499, "Beginner route with helmet and guide"]],
  "Gangtok": [["Tsomgo Lake guided day excursion", 2999, "Road-based high-altitude outing; permits and acclimatisation apply"], ["Mountain biking introduction", 2499, "Guided ride on a suitable lower-altitude route"]],
  "Shillong": [["Umiam Lake kayaking sampler", 1999, "Guided flat-water paddle subject to lake conditions"], ["Guided forest waterfall hike", 1499, "Easy guided trail; local access rules apply"]],
  "Cherrapunji": [["Living root bridge guided trek", 1799, "Guided hike; route difficulty and conditions vary"], ["Cave exploration with local guide", 1999, "Only in permitted caves with an experienced guide"]],
  "Tawang": [["Guided monastery and mountain walk", 1499, "Easy walk to support gradual acclimatisation"], ["Sela Pass scenic day excursion", 2999, "Road-based outing subject to weather, permits and altitude"]],
  "Kaziranga": [["Licensed jeep safari", 2999, "Park-approved safari slot; permit and season dependent"], ["Guided birding trail", 1499, "Park-authorised guide and route required"]],
  "Andaman": [["Introductory scuba dive", 4999, "Certified dive operator, medical rules and sea conditions apply"], ["Sea kayaking sampler", 1999, "Guided paddle in an approved sheltered area"]]
};

class BookingError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

function getAdventurePackages(destinations) {
  return destinations.flatMap((destination) =>
    (packageActivities[destination.name] || []).map(([name, unitPrice, description], index) => ({
      id: `${destination.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index + 1}`,
      name,
      destination: destination.name,
      state: destination.state,
      description,
      unitPrice,
      currency: "INR",
      samplePrice: true,
      availabilityNotice: "Sample activity only; confirm the licensed local operator, exact availability, safety requirements and final price before any real launch."
    }))
  );
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 12000) {
        reject(new Error("Request too large"));
        request.destroy();
      }
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    request.on("error", reject);
  });
}

function paymentConfigured() {
  return process.env.RAZORPAY_KEY_ID?.startsWith("rzp_test_") &&
    Boolean(process.env.RAZORPAY_KEY_SECRET) &&
    Boolean(process.env.DATABASE_URL);
}

function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.BOOKING_EMAIL_FROM);
}

function validateBooking(body, packages) {
  const adventure = packages.find((item) => item.id === body.packageId);
  const participants = Number(body.participants);
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const phone = typeof body.phone === "string" ? body.phone.replace(/[^\d+]/g, "") : "";
  const paymentMethod = body.paymentMethod;
  if (!adventure) throw new BookingError("Choose a valid adventure package.");
  if (!Number.isInteger(participants) || participants < 1 || participants > 12) {
    throw new BookingError("Bookings must be for 1 to 12 participants.");
  }
  if (name.length < 2 || name.length > 80 || !validEmail(email) || !/^(?:\+91)?[6-9]\d{9}$/.test(phone)) {
    throw new BookingError("Enter your name, a valid email and a 10-digit Indian phone number.");
  }
  if (!validActivityDate(body.activityDate)) {
    throw new BookingError("Choose an activity date within the next 12 months.");
  }
  if (!["upi", "card", "netbanking", "wallet"].includes(paymentMethod)) {
    throw new BookingError("Choose UPI, card, net banking or wallet as your preferred payment method.");
  }
  return {
    adventure,
    participants,
    name,
    email,
    phone,
    paymentMethod,
    activityDate: body.activityDate,
    totalAmountPaise: adventure.unitPrice * participants * 100
  };
}

function sendJson(response, status, body) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  response.end(JSON.stringify(body));
}

function validEmail(email) {
  return typeof email === "string" && email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validActivityDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const latest = new Date(today);
  latest.setUTCDate(latest.getUTCDate() + 365);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value &&
    date >= today && date <= latest;
}

async function razorpayRequest(endpoint, method, payload) {
  const response = await fetch(`https://api.razorpay.com/v1${endpoint}`, {
    method,
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString("base64")}`,
      "Content-Type": "application/json"
    },
    ...(payload ? { body: JSON.stringify(payload) } : {})
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    console.error("Razorpay API request failed:", response.status, result.error?.code || "unknown error");
    throw new BookingError("Test checkout could not be created. Please retry later.", 502);
  }
  return result;
}

function safeEqualHex(expected, actual) {
  if (typeof actual !== "string" || !/^[a-f0-9]{64}$/i.test(actual)) return false;
  const expectedBytes = Buffer.from(expected, "hex");
  const actualBytes = Buffer.from(actual, "hex");
  return expectedBytes.length === actualBytes.length && crypto.timingSafeEqual(expectedBytes, actualBytes);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
  })[character]);
}

async function sendConfirmation(booking) {
  if (!emailConfigured()) return false;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: process.env.BOOKING_EMAIL_FROM,
      to: [booking.customer_email],
      subject: `Bharatyatra test booking ${booking.id}`,
      html: `<p>Namaste ${escapeHtml(booking.customer_name)},</p><p>Your Razorpay test payment was verified for <strong>${escapeHtml(booking.package_name)}</strong> in ${escapeHtml(booking.destination)} on ${escapeHtml(String(booking.activity_date).slice(0, 10))}.</p><p>Participants: ${booking.participants}<br>Sample test amount: Rs. ${(booking.total_amount_paise / 100).toLocaleString("en-IN")}</p><p>This is a TEST booking only. No real activity is reserved, no operator has been contacted, and no real payment was taken.</p><p>Booking reference: ${escapeHtml(booking.id)}</p>`
    })
  });
  if (!response.ok) {
    console.error("Booking confirmation email failed:", response.status);
    return false;
  }
  return true;
}

async function createOrder(request, response, packages) {
  if (!paymentConfigured()) {
    sendJson(response, 503, { error: "Test checkout needs Razorpay test keys and the PostgreSQL database configured on the server." });
    return;
  }
  const body = await readRequestBody(request);
  const bookingInput = validateBooking(body, packages);

  const db = getDatabase();
  await ensureSchema(db);
  const order = await razorpayRequest("/orders", "POST", {
    amount: bookingInput.totalAmountPaise,
    currency: "INR",
    receipt: `bt_${crypto.randomBytes(10).toString("hex")}`,
    notes: {
      packageId: bookingInput.adventure.id,
      destination: bookingInput.adventure.destination,
      participants: String(bookingInput.participants),
      preferredPaymentMethod: bookingInput.paymentMethod
    }
  });

  const id = crypto.randomBytes(12).toString("hex");
  await db.query(`
    INSERT INTO bharatyatra_adventure_bookings
      (id, package_id, package_name, destination, activity_date, participants,
       unit_amount_paise, total_amount_paise, customer_name, customer_email,
       customer_phone, payment_method, razorpay_order_id)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
  `, [id, bookingInput.adventure.id, bookingInput.adventure.name, bookingInput.adventure.destination,
    bookingInput.activityDate, bookingInput.participants, bookingInput.adventure.unitPrice * 100,
    bookingInput.totalAmountPaise, bookingInput.name, bookingInput.email, bookingInput.phone,
    bookingInput.paymentMethod, order.id]);

  sendJson(response, 201, {
    bookingId: id,
    orderId: order.id,
    amount: bookingInput.totalAmountPaise,
    currency: "INR",
    keyId: process.env.RAZORPAY_KEY_ID,
    packageName: bookingInput.adventure.name,
    destination: bookingInput.adventure.destination,
    emailConfigured: emailConfigured()
  });
}

async function createUnpaidBookingRequest(request, response, packages) {
  const body = await readRequestBody(request);
  const booking = validateBooking(body, packages);
  const db = getDatabase();
  if (!db) {
    sendJson(response, 503, { error: "The booking request service is not configured. Please try again later." });
    return;
  }
  await ensureSchema(db);
  const id = crypto.randomBytes(12).toString("hex");
  await db.query(`
    INSERT INTO bharatyatra_adventure_bookings
      (id, package_id, package_name, destination, activity_date, participants,
       unit_amount_paise, total_amount_paise, customer_name, customer_email,
       customer_phone, payment_method, payment_status)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'requested')
  `, [id, booking.adventure.id, booking.adventure.name, booking.adventure.destination,
    booking.activityDate, booking.participants, booking.adventure.unitPrice * 100,
    booking.totalAmountPaise, booking.name, booking.email, booking.phone, booking.paymentMethod]);

  sendJson(response, 201, {
    bookingId: id,
    status: "request_received",
    paid: false,
    amount: booking.totalAmountPaise,
    currency: "INR",
    email: booking.email,
    paymentMethod: booking.paymentMethod
  });
}

async function verifyPayment(request, response) {
  if (!paymentConfigured()) {
    sendJson(response, 503, { error: "Razorpay test checkout is not configured." });
    return;
  }
  const body = await readRequestBody(request);
  const db = getDatabase();
  await ensureSchema(db);
  const result = await db.query(
    "SELECT * FROM bharatyatra_adventure_bookings WHERE id = $1 AND razorpay_order_id = $2",
    [body.bookingId, body.orderId]
  );
  const booking = result.rows[0];
  if (!booking) {
    sendJson(response, 404, { error: "Booking reference was not found." });
    return;
  }
  if (booking.payment_status === "paid") {
    let emailSent = booking.email_status === "sent";
    if (!emailSent && emailConfigured()) {
      try {
        emailSent = await sendConfirmation(booking);
      } catch (error) {
        console.error("Adventure booking confirmation retry failed:", error.message);
      }
      await db.query(
        "UPDATE bharatyatra_adventure_bookings SET email_status = $2 WHERE id = $1",
        [booking.id, emailSent ? "sent" : "failed"]
      );
    }
    sendJson(response, 200, { paid: true, emailSent, bookingId: booking.id });
    return;
  }

  const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${body.orderId}|${body.paymentId}`).digest("hex");
  if (!safeEqualHex(expectedSignature, body.signature)) {
    sendJson(response, 400, { error: "Payment signature verification failed." });
    return;
  }
  const payment = await razorpayRequest(`/payments/${encodeURIComponent(body.paymentId)}`, "GET");
  if (payment.order_id !== booking.razorpay_order_id || payment.status !== "captured" ||
      payment.amount !== booking.total_amount_paise || payment.currency !== "INR") {
    sendJson(response, 400, { error: "Payment is not captured for the expected test booking amount." });
    return;
  }

  const updated = await db.query(`
    UPDATE bharatyatra_adventure_bookings
    SET razorpay_payment_id = $2, payment_status = 'paid', paid_at = NOW()
    WHERE id = $1 AND payment_status = 'pending'
    RETURNING *
  `, [booking.id, payment.id]);
  if (!updated.rows[0]) {
    sendJson(response, 409, { error: "This booking payment has already been processed." });
    return;
  }

  let emailSent = false;
  try {
    emailSent = await sendConfirmation(updated.rows[0]);
  } catch (error) {
    console.error("Adventure booking confirmation email failed:", error.message);
  }
  await db.query(
    "UPDATE bharatyatra_adventure_bookings SET email_status = $2 WHERE id = $1",
    [booking.id, emailSent ? "sent" : (emailConfigured() ? "failed" : "pending")]
  );
  sendJson(response, 200, { paid: true, emailSent, bookingId: booking.id });
}

async function handleBookingRequest(request, response, requestPath, destinationsLoader) {
  if (requestPath === "/api/adventures" && request.method === "GET") {
    sendJson(response, 200, {
      packages: getAdventurePackages(destinationsLoader()),
      paymentConfigured: Boolean(paymentConfigured()),
      emailConfigured: emailConfigured(),
      testMode: true,
      maxParticipants: 12
    });
    return true;
  }
  if (requestPath === "/api/bookings/order" && request.method === "POST") {
    try {
      await createOrder(request, response, getAdventurePackages(destinationsLoader()));
    } catch (error) {
      console.error("Adventure booking order failed:", error.message);
      sendJson(response, error.status || 502, {
        error: error.status === 400 ? error.message : "Test checkout is temporarily unavailable. Please try again."
      });
    }
    return true;
  }
  if (requestPath === "/api/bookings/request" && request.method === "POST") {
    try {
      await createUnpaidBookingRequest(request, response, getAdventurePackages(destinationsLoader()));
    } catch (error) {
      console.error("Adventure booking request failed:", error.message);
      sendJson(response, error.status || 502, {
        error: error.status === 400 ? error.message : "Booking request could not be saved. Please try again."
      });
    }
    return true;
  }
  if (requestPath === "/api/bookings/verify" && request.method === "POST") {
    try {
      await verifyPayment(request, response);
    } catch (error) {
      console.error("Adventure booking verification failed:", error.message);
      sendJson(response, 500, { error: "Test payment verification could not be completed. Please contact support." });
    }
    return true;
  }
  return false;
}

module.exports = { getAdventurePackages, handleBookingRequest };
