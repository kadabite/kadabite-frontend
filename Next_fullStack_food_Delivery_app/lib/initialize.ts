import mongoose from 'mongoose';
import { emailClient } from '@/app/api/email/sender';
import Bull, { Job, Queue } from 'bull';
import { MailArgs as UserData } from '@/app/lib/definitions';

let queue: Queue<UserData>;
let isConnected = false;
let isInitialized = false;

export async function startConsumerProcess() {
  if (isInitialized) return;
  queue = new Bull<UserData>('user_data_queue');

  queue.on('error', (err: Error) => console.error('Bull queue error:', err));

  queue.process(async (job: Job<UserData>) => {
    const user_data = job.data;
    console.log('Received data');
    try {
      await emailClient.mailMe(user_data);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  });

  console.log('Consumer (worker) ready');
  isInitialized = true;
}

// Function to initialize the database connection
export async function initializeDbConnection() {
  const uri = process.env.NEXT_PUBLIC_MONGODB_URI || '';

  if (!uri) {
    throw new Error('Please define the NEXT_PUBLIC_MONGODB_URI environment variable inside .env.local');
  }

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

// Function to initialize all necessary components
export async function initialize() {
  await initializeDbConnection();
  await startConsumerProcess();
}

// Function to gracefully shut down the application
async function shutdown() {
  console.log('Shutting down gracefully...');
  if (queue) {
    await queue.close();
    console.log('Bull queue closed');
  }
  await mongoose.disconnect();
  console.log('MongoDB disconnected');
  process.exit(0);
}

// Handle process signals for graceful shutdown
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
