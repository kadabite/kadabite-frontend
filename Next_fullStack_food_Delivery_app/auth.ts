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
    await User.findByIdAndUpdate(user.id, { isLoggedIn: true });
    return {
      id: user.id,
      role: user.role,
    };
  }
  return null;
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = await User.findById(user.id).then((user) => user?.role) || 'guest';
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider && (account.provider === 'google')) {
        await saveGoogleUser(user, account, profile);
      } else if (account?.provider && (account.provider === 'facebook')) {
        await saveFacebookUser(user, account, profile);
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
});
