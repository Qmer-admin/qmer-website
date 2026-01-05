// src/auth.ts 

import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db" // Singleton olduğundan emin ol!
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = (credentials.email as string).toLowerCase();

        try {
          const user = await prisma.user.findUnique({
             where: { email },
          });

          if (!user || !user.password) return null;

          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (isPasswordValid) return user;
        } catch (error) {
          console.error("Auth Error:", error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    // Önce config callbacklerini al
    ...authConfig.callbacks,
    
    // JWT oluşurken role bilgisini içine göm
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.sub = user.id; // ID'yi garantiye al
      }
      return token;
    },
    // Session okunurken token'dan role bilgisini al
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string; 
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
})