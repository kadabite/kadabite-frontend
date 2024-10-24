import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
// import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
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
  });
  await newUser.save();
}

async function verifyUserCredentials(email: string, password: string) {
  const user = await User.findOne({ email });

  if (user && await bcrypt.compare(password, user.passwordHash)) {
    return {
      id: user.id,
    };
  }
  return null;
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [
    Google,
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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider && (account.provider === 'google')) {
        await saveGoogleUser(user, account, profile);
      } else if (account?.provider && (account.provider === 'facebook')) {
        await saveFacebookUser(user, account, profile);
      }
      return true;
    }
  },
});
