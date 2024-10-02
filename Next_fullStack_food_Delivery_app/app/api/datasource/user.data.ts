import { myLogger } from '@/app/api/upload/logger';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { IUser, User } from '@/models/user';
import { Message } from '@/lib/graphql-types';

type RespData<T> = T extends IUser
  ? {
      json: () => Promise<{
        user: T;
        isAdmin: boolean;
        statusCode: number;
        ok: boolean;
        message?: string;
        newAccessToken?: string; // Add new access token to the response
      }>;
      statusText: string;
      ok: boolean;
      status: number;
    }
  : {
      json: () => Promise<{
        user?: T;
        isAdmin?: boolean;
        statusCode: number;
        ok: boolean;
        message?: string;
        newAccessToken?: string; // Add new access token to the response
      }>;
      statusText: string;
      ok: boolean;
      status: number;
    };


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

    // Generate JWT refresh token that expires in two days
    const refreshToken = jwt.sign({ userId: user.id }, process.env.SECRET_KEY as string, {
      expiresIn: '2d',
    });
  
    // Update user information to be loggedIn
    await User.findByIdAndUpdate(user.id, { isLoggedIn: true, refreshToken });

    // Generate JWT with user ID and expiration time
    const accessToken = jwt.sign({ userId: user.id }, process.env.SECRET_KEY as string, {
      expiresIn: 600,
    });

    return Promise.resolve({ token: accessToken, ok: true, statusCode: 200 });
  } catch (error) {
    myLogger.error('Error logging in user: ' + (error as Error).message);
    return Promise.resolve({ message: 'An error occurred!', statusCode: 400, ok: false });
  }
}

export async function authRequest(reqHeader: string): Promise<RespData<IUser | null>> {
  try {
    // Check the authorization header of the user and return error if missing or invalid
    if (!reqHeader || !reqHeader.startsWith('Bearer ')) {
      return Promise.resolve({
        json: async () => ({ message: 'User is not authenticated', statusCode: 401, ok: false }),
        statusText: 'User is not authenticated',
        ok: false,
        status: 401
      });
    }

    // Verify the token if it is authentic, return error if not valid
    const token = reqHeader.split(' ')[1] || '';
    const verified = jwt.verify(token, process.env.SECRET_KEY as string);

    if (!verified) {
      return Promise.resolve({
        json: async () => ({ message: 'User is not authenticated', statusCode: 401, ok: false }),
        statusText: 'User is not authenticated',
        ok: false,
        status: 401
      });
    }

    // Find the user based on the verified token
    const user = await User.findById((verified as any).userId);
    if (!user || !user.isLoggedIn || user.isDeleted) {
      return Promise.resolve({
        json: async () => ({ message: 'User is not authenticated', statusCode: 401, ok: false }),
        statusText: 'User is not authenticated',
        ok: false,
        status: 401
      });
    }

    // Check if the user is admin and return the corresponding response
    const isAdmin = user.username === 'admin' || user.email === 'admin@deliver.com';
    return Promise.resolve({
      json: async () => ({
        user,
        isAdmin,
        statusCode: 200,
        ok: true,
        message: 'User is authenticated'
      }),
      statusText: 'User is authenticated',
      ok: true,
      status: 200
    });

  } catch (error) {
    console.error(error);
    return Promise.resolve({
      json: async () => ({ message: 'Internal server error', statusCode: 500, ok: false }),
      statusText: 'Internal server error',
      ok: false,
      status: 500
    });
  }
}

export async function refreshToken(refreshToken: string): Promise<Message> {
  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY as string);

    if (!decoded) {
      return Promise.resolve({ message: 'Invalid refresh token', statusCode: 401, ok: false });
    }

    // Find the user based on the decoded token
    const user = await User.findById((decoded as any).userId);
    if (!user || user.isDeleted) {
      return Promise.resolve({ message: 'User not found', statusCode: 401, ok: false });
    }

    // Generate a new access token
    const newAccessToken = jwt.sign({ userId: user.id }, process.env.SECRET_KEY as string, {
      expiresIn: 600, // 10 minutes
    });

    return Promise.resolve({ token: newAccessToken, ok: true, statusCode: 200 });
  } catch (error) {
    myLogger.error('Error refreshing token: ' + (error as Error).message);
    return Promise.resolve({ message: 'An error occurred!', statusCode: 400, ok: false });
  }
}

// export async function authRequest(reqHeader: string, refreshTokenHeader: string): Promise<RespData<IUser | null>> {
//   try {
//     // Check the authorization header of the user and return error if missing or invalid
//     if (!reqHeader || !reqHeader.startsWith('Bearer ')) {
//       return Promise.resolve({
//         json: async () => ({ message: 'User is not authenticated', statusCode: 401, ok: false }),
//         statusText: 'User is not authenticated',
//         ok: false,
//         status: 401
//       });
//     }

//     // Extract the token from the header
//     const token = reqHeader.split(' ')[1] || '';

//     let verified;
//     try {
//       // Verify the token if it is authentic
//       verified = jwt.verify(token, process.env.SECRET_KEY as string);
//     } catch (err) {
//       // If the token has expired, try to refresh it using the refresh token
//       if (err.name === 'TokenExpiredError' && refreshTokenHeader) {
//         const refreshResponse = await refreshToken(refreshTokenHeader);
//         if (refreshResponse.ok) {
//           // If the refresh token is valid, return the new access token
//           return Promise.resolve({
//             json: async () => ({
//               message: 'Access token refreshed',
//               statusCode: 200,
//               ok: true,
//               newAccessToken: refreshResponse.token,
//             }),
//             statusText: 'Access token refreshed',
//             ok: true,
//             status: 200
//           });
//         } else {
//           return Promise.resolve({
//             json: async () => ({ message: 'User is not authenticated', statusCode: 401, ok: false }),
//             statusText: 'User is not authenticated',
//             ok: false,
//             status: 401
//           });
//         }
//       } else {
//         return Promise.resolve({
//           json: async () => ({ message: 'User is not authenticated', statusCode: 401, ok: false }),
//           statusText: 'User is not authenticated',
//           ok: false,
//           status: 401
//         });
//       }
//     }

//     // Find the user based on the verified token
//     const user = await User.findById((verified as any).userId);
//     if (!user || !user.isLoggedIn || user.isDeleted) {
//       return Promise.resolve({
//         json: async () => ({ message: 'User is not authenticated', statusCode: 401, ok: false }),
//         statusText: 'User is not authenticated',
//         ok: false,
//         status: 401
//       });
//     }

//     // Check if the user is admin and return the corresponding response
//     const isAdmin = user.username === 'admin' || user.email === 'admin@deliver.com';
//     return Promise.resolve({
//       json: async () => ({
//         user,
//         isAdmin,
//         statusCode: 200,
//         ok: true,
//         message: 'User is authenticated'
//       }),
//       statusText: 'User is authenticated',
//       ok: true,
//       status: 200
//     });

//   } catch (error) {
//     console.error(error);
//     return Promise.resolve({
//       json: async () => ({ message: 'Internal server error', statusCode: 500, ok: false }),
//       statusText: 'Internal server error',
//       ok: false,
//       status: 500
//     });
//   }
// }