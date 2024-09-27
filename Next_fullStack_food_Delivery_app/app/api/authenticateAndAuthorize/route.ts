import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { User } from '@/models/user';
 
export async function GET(req: NextRequest) {
  try {

    // Check the authorization header of the user and return error if missing or invalid
    const reqHeader = req.headers.get('authorization');
    if (!reqHeader || !reqHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'User is not authenticated' }, { status: 401 });
    }

    // Verify the token if it is authentic, return error if not valid
    const token = reqHeader.split(' ')[1] || '';
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);

    if (!decoded) {
      return NextResponse.json({ message: 'User is not authenticated' }, { status: 401 });
    }

    // Find the user based on the decoded token
    const user = await User.findById((decoded as any).userId);
    if (!user || !user.isLoggedIn || user.isDeleted) {
      return NextResponse.json({ message: 'User is not authenticated' }, { status: 401 });
    }

    // Check if the user is admin and return the corresponding response
    const isAdmin = user.username === 'admin' || user.email === 'admin@deliver.com';
    return NextResponse.json({ user, isAdmin });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
