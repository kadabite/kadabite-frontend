import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { User } from '@/models/user';

async function saveGoogleUser(user: any, account: any, profile: any) {
  const userLogin = await User.findOne({ email: profile.email });
  if (userLogin) {
    return;
  }
  const newUser = new User({
    email: profile.email,
    firstName: profile.given_name,
    username: profile.email,
    lastName: profile.family_name,
    photo: profile.picture,
    isEmailVerified: profile.email_verified,
    provider: account.provider,
    role: 'user',
  });

  await newUser.save();
}

async function saveFacebookUser(user: any, account: any, profile: any) {
  const userLogin = await User.findOne({ email: profile.email });
  if (userLogin) {
    return;
  }
  const newUser = new User({
    email: profile.email,
    firstName: profile.name.split(' ')[0],
    lastName: profile.name.split(' ')[1],
    username: profile.email,
    photo: profile.picture,
    provider: account.provider,
    role: 'user',
  });
  await newUser.save();
}

async function verifyUserCredentials(email: string, password: string) {
  const user = await User.findOne({ email });

  if (user && await bcrypt.compare(password, user.passwordHash)) {
    // Update user information to be loggedIn
    await User.findByIdAndUpdate(user._id as string, { isLoggedIn: true });
    console.log(user.role);
    console.log(user._id, '111111111111111111111111111111111');
    return {
      id: user._id as string,
      role: user.role,
    };
  }
  return null;
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          scope: 'email profile',
        },
      },
    }),
    // Facebook,
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success && parsedCredentials.data) {
          const user = await verifyUserCredentials(credentials.email as string, credentials.password as string);
          if (user) {
            return user;
          } else {
            return null;
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const userInfo = await User.findOne({ email: user.email });
        if (userInfo) {
          token.id = userInfo._id as string;
          token.role = userInfo.role as string;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      return session;
    },
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider && (account.provider === 'google')) {
          await saveGoogleUser(user, account, profile);
        } else if (account?.provider && (account.provider === 'facebook')) {
          await saveFacebookUser(user, account, profile);
        }
      } catch(error) {
        return false;
      }
      return true;
    },
  },
  events: {
    async signOut(message) {
      if ('session' in message && message.session?.userId) {
        await User.findByIdAndUpdate(message.session.userId, { isLoggedIn: false });
      } else if ('token' in message && message.token?.id) {
        await User.findByIdAndUpdate(message.token.id, { isLoggedIn: false });
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
});
