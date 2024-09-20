import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { connectToDatabase } from '@/lib/mongoose';
import { User } from '@/models/user';
import { myLogger } from '@/app/lib/utils';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const email = req.body.email || '';
  const password = req.body.password || '';

  // Verify if the email and password are authentic
  if (email === '' || password === '') {
    return res.status(401).json({ message: 'Provide more information' });
  }

  try {
    await connectToDatabase();

    // Find the user based on the email and return error if the user does not exist
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update user information to be loggedIn
    await User.findByIdAndUpdate(user.id, { isLoggedIn: true });

    // Generate JWT with user ID and expiration time
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY as string, {
      expiresIn: '24h',
    });

    return res.json({ token });
  } catch (error) {
    myLogger.error('Error logging in user: ' + (error as Error).message);
    return res.status(400).json({ message: 'An error occurred!' });
  }
}
