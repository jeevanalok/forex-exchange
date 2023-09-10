// Applies a ratelimit protocol

const { rateLimit } = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minures
  max: 100, // Limit each IP to 100 requests per `window` (here, per 60 minutes)
  standardHeaders: "draft-7", // draft-6: RateLimit-* headers; draft-7: combined RateLimit header
  legacyHeaders: false, // X-RateLimit-* headers
  statusCode: 429,
  message: "Too many requests from this IP. Please try again later. ",
});

module.exports = { apiLimiter };
