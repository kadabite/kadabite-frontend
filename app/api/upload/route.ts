import { myLogger } from '@/app/api/upload/logger';
import fs from 'fs/promises'; // Use promises API for async/await
import path from 'path';

// Define allowed extensions, MIME types, and maximum file size (in bytes)
const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// Helper functions
const isValidExtension = (filename: string) => {
  const extension = filename.split('.').pop()?.toLowerCase();
  return allowedExtensions.includes(extension || '');
};

const isValidMimeType = (mimetype: string) => {
  return allowedMimeTypes.includes(mimetype.toLowerCase());
};

const removeFile = async (filename: string) => {
  const filePath = path.join(process.cwd(), 'static/uploads', filename);
  try {
    await fs.unlink(filePath);
  } catch (err) {
    myLogger.error('Error deleting file: ' + (err as Error).message);
  }
};
