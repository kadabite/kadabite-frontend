import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/user';
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

export async function POST(req: NextRequest) {
  try {
    // Parse formData from the request
    const formData = await req.formData();
    const id = formData.get('id');
    const file = formData.get('file') as File;

    // Ensure the uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'static/uploads');
    try {
      await fs.mkdir(uploadsDir, { recursive: true });
    } catch (err) {
      myLogger.error('Error creating uploads directory: ' + (err as Error).message);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }

    // Validate ID
    if (!id || typeof id !== 'string') {
      if (file) {
        await removeFile(file.name);
      }
      return NextResponse.json({ message: 'Id is required!' }, { status: 400 });
    }

    // Check if a file was uploaded
    if (!file) {
      return NextResponse.json({ message: 'A file is required!' }, { status: 400 });
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      await removeFile(file.name);
      return NextResponse.json({ message: 'File exceeds the size limit of 5 MB.' }, { status: 400 });
    }

    // Validate file extension and MIME type
    if (!isValidExtension(file.name) || !isValidMimeType(file.type)) {
      await removeFile(file.name);
      return NextResponse.json({ message: 'Invalid file type!' }, { status: 400 });
    }

    // Find the user and check for an existing photo
    const user = await User.findById(id);
    if (!user) {
      if (file) {
        await removeFile(file.name);
      }
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Remove the previous photo if it exists
    if (user.photo) {
      await removeFile(user.photo);
    }

    // Generate unique filename
    const uniqueFilename = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadsDir, uniqueFilename);

    // Write the file to the disk asynchronously
    const arrayBuffer = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(arrayBuffer));

    // Update the user's photo field in the database
    user.photo = uniqueFilename;
    await user.save();

    // Successfully updated the user
    return NextResponse.json({ message: 'User updated successfully', filename: uniqueFilename });
  } catch (error) {
    myLogger.error('Error updating user: ' + (error as Error).message);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false, // Disable the default bodyParser as we are handling file uploads
  },
};
