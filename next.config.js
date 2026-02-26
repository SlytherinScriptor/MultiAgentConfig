const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = {
  // Configuration options for the Next.js application
  env: {
    // Environment variables
    SENTRY_DSN: process.env.SENTRY_DSN,
    ANALYTICS_ID: process.env.ANALYTICS_ID
  },
  // Reference the favicon.ico file
  experimental: {
    images: {
      unoptimized: true
    }
  }
};