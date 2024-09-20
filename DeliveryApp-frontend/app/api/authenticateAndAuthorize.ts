import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongoose';
import { User } from '@/models/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();

    // Check the authorization header of the user and return error if None or error
    const reqHeader = req.headers.authorization;
    if (!reqHeader || !reqHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'User is not authenticated' });
    }

    // Verify the token if it is authentic, return error if not authentic
    const token = reqHeader.split(' ')[1] || '';
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);

    if (!decoded) {
      // This format must be maintained!
      return res.status(401).json({ message: 'User is not authenticated' });
    }

    const user = await User.findById((decoded as any).userId);
    if (!user || !user.isLoggedIn || user.isDeleted) {
      // This format must be maintained!
      return res.status(401).json({ message: 'User is not authenticated' });
    }

    if (user.username === 'admin' || user.email === 'admin@deliver.com') {
      return res.status(200).json({ user, isAdmin: true });
    } else {
      return res.status(200).json({ user, isAdmin: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}