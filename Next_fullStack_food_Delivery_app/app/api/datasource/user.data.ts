import { myLogger } from '@/app/api/upload/logger';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '@/models/user';
import { Message } from '@/lib/graphql-types';

// Login function
export async function loginMe(email: string, password: string): Promise<Message> {
  try {

    // Verify if the email and password are authentic
    if (email === '' || password === '') {
      return Promise.resolve({ message: 'Provide more information', statusCode: 401, ok: false });
    }

    // Find the user based on the email and return error if the user does not exist
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      return Promise.resolve({ message: 'Invalid credentials', statusCode: 401, ok: false });
    }

    // Update user information to be loggedIn
    await User.findByIdAndUpdate(user.id, { isLoggedIn: true });

    // Generate JWT with user ID and expiration time
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY as string, {
      expiresIn: '24h',
    });

    return Promise.resolve({ token, ok: true, statusCode: 200 });
  } catch (error) {
    myLogger.error('Error logging in user: ' + (error as Error).message);
    return Promise.resolve({ message: 'An error occurred!', statusCode: 400, ok: false });
  }
}
