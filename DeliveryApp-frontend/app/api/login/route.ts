import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { connectToDatabase } from '@/lib/mongoose';
import { User } from '@/models/user';
import { myLogger } from '@/app/api/upload/logger';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body.email || '';
    const password = body.password || '';

    // Verify if the email and password are authentic
    if (email === '' || password === '') {
      return NextResponse.json({ message: 'Provide more information' }, { status: 401 });
    }

    await connectToDatabase();

    // Find the user based on the email and return error if the user does not exist
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Update user information to be loggedIn
    await User.findByIdAndUpdate(user.id, { isLoggedIn: true });

    // Generate JWT with user ID and expiration time
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY as string, {
      expiresIn: '24h',
    });

    return NextResponse.json({ token });
  } catch (error) {
    myLogger.error('Error logging in user: ' + (error as Error).message);
    return NextResponse.json({ message: 'An error occurred!' }, { status: 400 });
  }
}
