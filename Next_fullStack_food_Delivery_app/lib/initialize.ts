import mongoose from 'mongoose';
import { createClient, RedisClientType } from 'redis';

let isConnected = false;
let redisClient: RedisClientType | null = null;
let idleTimeout: NodeJS.Timeout | null = null;

// Function to initialize the database connection
export async function initializeDbConnection() {
  const uri = process.env.MONGODB_URI || '';

  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  if (isConnected) {
    return; // If already connected, skip the connection process
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // Increase timeout to 10 seconds
      maxPoolSize: 50,
    });
    isConnected = true; // Set the connection status to true
    console.log('MongoDB successfully connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

// Function to initialize the Redis client
export async function initializeRedisClient() {
  if (!redisClient) {
    redisClient = createClient({
      url: process.env.REDIS_URL,
    });

    redisClient.on('error', (err) => console.error('Redis Client Error', err));

    try {
      await redisClient.connect();
      console.log('Redis client successfully connected');
    } catch (error) {
      console.error('Redis connection error:', error);
      redisClient = null; // Reset if connection fails
    }
  }
}

// Function to initialize all necessary components
export async function initialize() {
  await initializeRedisClient();
  await initializeDbConnection();
}

// Function to gracefully shut down the database and Redis connections
export async function shutdown() {
  console.log('Shutting down gracefully...');
  if (idleTimeout) {
    clearTimeout(idleTimeout);
  }
  await mongoose.disconnect();
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
  }
  isConnected = false;
  console.log('MongoDB and Redis disconnected');
}

// Function to handle idle connections
export function handleIdleConnections() {
  if (idleTimeout) {
    clearTimeout(idleTimeout);
  }
  idleTimeout = setTimeout(async () => {
    console.log('Idle timeout reached. Closing connections...');
    await shutdown();
  }, 120000);
}

export { redisClient };
