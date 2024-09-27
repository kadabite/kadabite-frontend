// db.ts - This file will run the connection code only once when imported
import mongoose from 'mongoose';

const uri = process.env.NEXT_PUBLIC_MONGODB_URI || '';

if (!uri) {
  throw new Error('Please define the NEXT_PUBLIC_MONGODB_URI environment variable inside .env.local');
}

let isConnected = false;

// Function to initialize the connection only once
async function initializeDbConnection() {
  if (isConnected) {
    return; // If already connected, skip the connection process
  }

  try {
    await mongoose.connect(uri);
    isConnected = true; // Set the connection status to true
    console.log('MongoDB successfully connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error; // Throw error to ensure any issues are caught during initialization
  }
}

// Immediately invoke the function to connect once when this module is loaded
initializeDbConnection();
