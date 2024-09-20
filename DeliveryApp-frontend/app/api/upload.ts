import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nextConnect from 'next-connect';
import { connectToDatabase } from '@/lib/mongoose';
import { User } from '@/models/user';
import { myLogger,  useMulter } from '@/app/lib/utils';
import fs from 'fs';
import path from 'path';

// Create a handler with next-connect
const handler = nextConnect();

handler.use( useMulter);

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.body.id;
  if (!id || typeof id !== 'string') {
    // delete file when this error occurs
    if (req.file && req.file.filename) {
      const filePath = path.join(process.cwd(), 'uploads', req.file.filename);
      fs.unlink(filePath, (err) => {
        if (err) {
          myLogger.error('Error deleting file: ' + err.message);
        }
      });
    }
    return res.status(401).json({ message: 'Id is required!' });
  }

  try {
    await connectToDatabase();

    const user = await User.findByIdAndUpdate(id, { photo: req.file.filename });
    if (!user) {
      // delete file when this error occurs
      if (req.file && req.file.filename) {
        const filePath = path.join(process.cwd(), 'uploads', req.file.filename);
        fs.unlink(filePath, (err) => {
          if (err) {
            myLogger.error('Error deleting file: ' + err.message);
          }
        });
      }
      return res.status(404).json({ message: 'not found' });
    }
  } catch (error) {
    myLogger.error('Error updating user: ' + (error as Error).message);
    return res.status(500).json({ message: 'Internal server error' });
  }

  return res.json({ id }); // Return the saved user object
});

export default handler;
