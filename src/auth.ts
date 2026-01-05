// src/auth.ts (GÜNCEL HALİ)

import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config" // Yeni eklediğimiz config

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig, // Config'i buraya yayıyoruz
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
        console.log("🔐 Login Attempt for:", credentials?.email); // LOG: Giriş denemesi

        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing credentials");
          return null;
        }

        // Email'i küçük harfe çevir (Kullanıcı Admin@... yazarsa hata almasın)
        const email = (credentials.email as string).toLowerCase();

        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user || !user.password) {
          console.log("❌ User not found in DB or no password set");
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          console.log("❌ Password mismatch (Şifre uyuşmuyor)");
          return null;
        }

        console.log("✅ Login Successful!");
        return user;
      },
    }),
  ],
  callbacks: {
     // Config'deki callbackleri eziyoruz veya birleştiriyoruz
     ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
})