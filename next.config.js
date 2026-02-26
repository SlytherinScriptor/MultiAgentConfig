const dotenv = require('dotenv');
const { SecretsManagerClient } = require('@aws-sdk/client-secretsmanager');

// Load environment variables from .env file
dotenv.config();

const secretsManagerClient = new SecretsManagerClient({ region: process.env.AWS_REGION });

const getSecret = async (secretName) => {
  try {
    const response = await secretsManagerClient.getSecretValue({ SecretId: secretName });
    return response.SecretString;
  } catch (error) {
    console.error(`Error getting secret ${secretName}: ${error.message}`);
    throw error;
  }
};

module.exports = {
  // Configuration options for the Next.js application
  env: {
    // Environment variables
    SENTRY_DSN: process.env.SENTRY_DSN || await getSecret('SENTRY_DSN'),
    ANALYTICS_ID: process.env.ANALYTICS_ID || await getSecret('ANALYTICS_ID')
  },
  // Reference the favicon.ico file
  experimental: {
    images: {
      unoptimized: true
    }
  }
};