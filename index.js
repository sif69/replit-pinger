import fetch from "node-fetch";
import express from "express";

const URL_TO_PING = "https://8590a753-74ba-45db-815c-5940de2d8cd0-00-1w37b7nbka6vr.spock.replit.dev/";  // ← replace with your Replit link
const INTERVAL_MS = 300 * 1000;  // every 5 minutes

async function ping() {
  try {
    const res = await fetch(URL_TO_PING);
    console.log(`[${new Date().toISOString()}] Pinged ${URL_TO_PING} — Status: ${res.status}`);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Ping failed:`, err && (err.stack || err.message) || err);
  }
}

// Ping once at startup, then on interval
ping();
setInterval(ping, INTERVAL_MS);

// Express server to keep this service alive
const app = express();
app.get("/", (req, res) => res.send("Pinger bot running 🚀"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Pinger bot listening on port ${PORT}`);
});

// Basic process-level error logging
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason && (reason.stack || reason));
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err && (err.stack || err.message) || err);
});
