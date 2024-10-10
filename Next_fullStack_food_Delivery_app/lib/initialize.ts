import mongoose from 'mongoose';
import { createClient } from 'redis';

let isConnected = false;

// Function to initialize the database connection
export async function initializeDbConnection() {
  const uri = process.env.MONGODB_URI || '';

  if (!uri) {
    throw new Error('Please define the NEXT_PUBLIC_MONGODB_URI environment variable inside .env.local');
  }

  if (isConnected) {
    return; // If already connected, skip the connection process
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // Increase timeout to 10 seconds
    });
    isConnected = true; // Set the connection status to true
    console.log('MongoDB successfully connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error; // Throw error to ensure any issues are caught during initialization
  }
}

// Function to initialize all necessary components
export async function initialize() {
  await initializeDbConnection();
}

// Function to gracefully shut down the application
async function shutdown() {
  console.log('Shutting down gracefully...');
  await mongoose.disconnect();
  console.log('MongoDB disconnected');
  process.exit(0);
}

// Handle process signals for graceful shutdown
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Create Redis client
let redisClient;
redisClient = createClient({
  url: 'redis://redis:6379'
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
  await redisClient.connect();
})();
export { redisClient };