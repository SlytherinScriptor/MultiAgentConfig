const dotenv = require('dotenv');
const { SecretsManagerClient } = require('@aws-sdk/client-secretsmanager');
const fs = require('fs');

// Load environment variables from .env file
if (fs.existsSync('.env')) {
  dotenv.config();
}

const secretsManagerClient = new SecretsManagerClient({ region: process.env.AWS_REGION });

const getSecret = async (secretName) => {
  try {
    const response = await secretsManagerClient.getSecretValue({ SecretId: secretName });
    return response.SecretString;
  } catch (error) {
    console.error(`Failed to retrieve secret ${secretName}: ${error.message}`);
    throw error;
  }
};

module.exports = {
  // Configuration options for the Next.js application
  env: {
    // Environment variables
    SENTRY_DSN: process.env.SENTRY_DSN || (async () => {
      try {
        return await getSecret('SENTRY_DSN');
      } catch (error) {
        console.error(error);
        return null;
      }
    })(),
    ANALYTICS_ID: process.env.ANALYTICS_ID || (async () => {
      try {
        return await getSecret('ANALYTICS_ID');
      } catch (error) {
        console.error(error);
        return null;
      }
    })(),
  },
  // Reference the favicon.ico file
  experimental: {
    images: {
      unoptimized: true
    }
  }
};