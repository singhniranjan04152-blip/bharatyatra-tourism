const fs = require("fs");
const path = require("path");
const { Readable } = require("stream");
const { getAdventurePackages, handleBookingRequest } = require("../backend/adventures");

const siteJs = fs.readFileSync(path.join(__dirname, "..", "frontend", "js", "site.js"), "utf8");
const start = siteJs.indexOf("let destinations = [") + "let destinations = ".length;
const end = siteJs.indexOf("\n];", start) + 2;
if (start < "let destinations = ".length || end < 2) {
  throw new Error("Could not find the website destination list.");
}
const destinations = Function(`return (${siteJs.slice(start, end)})`)();
const packages = getAdventurePackages(destinations);
const expectedDestinations = new Set(destinations.map((destination) => destination.name));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(destinations.length === 30, "Adventure catalog should cover all 30 website destinations.");
assert(packages.length === destinations.length * 2, "Each destination should have two curated activity options.");
assert(packages.every((item) => expectedDestinations.has(item.destination)), "An adventure package refers to an unknown destination.");
assert(packages.every((item) => item.samplePrice && Number.isInteger(item.unitPrice) && item.unitPrice > 0), "All prices must be clearly marked as positive sample prices.");
assert(packages.every((item) => item.currency === "INR" && item.availabilityNotice), "Every package must disclose currency and availability limits.");
assert(new Set(packages.map((item) => item.id)).size === packages.length, "Adventure package identifiers must be unique.");

const schema = fs.readFileSync(path.join(__dirname, "..", "database", "schema.sql"), "utf8");
assert(schema.includes("bharatyatra_adventure_bookings"), "Missing persistent adventure booking table.");
assert(schema.includes("CHECK (participants BETWEEN 1 AND 12)"), "Database must enforce the 12-person booking limit.");
assert(schema.includes("'requested'"), "Database must support unpaid booking requests.");
assert(schema.includes("payment_method"), "Database must store the selected payment preference.");

async function testUnconfiguredBookingRequest() {
  const previousDatabaseUrl = process.env.DATABASE_URL;
  delete process.env.DATABASE_URL;
  const tomorrow = new Date();
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  const requestBody = {
    packageId: packages[0].id,
    name: "Test Traveller",
    email: "traveller@example.com",
    phone: "9876543210",
    activityDate: tomorrow.toISOString().slice(0, 10),
    participants: 2,
    paymentMethod: "upi"
  };

  async function send(payload) {
    const request = Readable.from([JSON.stringify(payload)]);
    request.method = "POST";
    let result;
    const response = {
      writeHead(status) { this.status = status; },
      end(body) { result = { status: this.status, body: JSON.parse(body) }; }
    };
    await handleBookingRequest(request, response, "/api/bookings/request", () => destinations);
    return result;
  }

  try {
    const unavailable = await send(requestBody);
    assert(unavailable.status === 503 && !unavailable.body.paid, "An unconfigured database must not report a saved or paid booking.");
    const rejected = await send({ ...requestBody, paymentMethod: "cash" });
    assert(rejected.status === 400, "Reject unsupported payment methods.");
  } finally {
    if (previousDatabaseUrl === undefined) delete process.env.DATABASE_URL;
    else process.env.DATABASE_URL = previousDatabaseUrl;
  }
}

testUnconfiguredBookingRequest()
  .then(() => console.log("Adventure package coverage and booking schema checks passed."))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
