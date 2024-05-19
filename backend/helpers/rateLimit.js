const rateLimit = require("express-rate-limit");

// Create a rate limiter middleware
const signInLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    message: "Too many login attempts, please try again after 15 minutes",
    error: true,
    success: false,
  },
});

module.exports = signInLimiter;
