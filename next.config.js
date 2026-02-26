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

const initEnv = async () => {
  const SENTRY_DSN = await getSecret('SENTRY_DSN');
  const ANALYTICS_ID = await getSecret('ANALYTICS_ID');
  return {
    SENTRY_DSN,
    ANALYTICS_ID
  };
};

initEnv().then((env) => {
  module.exports = {
    // Configuration options for the Next.js application
    env: {
      // Environment variables
      SENTRY_DSN: env.SENTRY_DSN || process.env.SENTRY_DSN,
      ANALYTICS_ID: env.ANALYTICS_ID || process.env.ANALYTICS_ID
    },
    // Reference the favicon.ico file
    experimental: {
      images: {
        unoptimized: true
      }
    }
  };
}).catch((error) => {
  console.error('Failed to initialize environment variables:', error);
  process.exit(1);
}).finally(() => {
  secretsManagerClient.destroy();
});