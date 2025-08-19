import { PrismaAdapter } from "@auth/prisma-adapter";
import EmailProvider from "next-auth/providers/nodemailer";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import prisma from "~/prisma/db";
import NextAuth from "next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      maxAge: 5 * 60,
      async sendVerificationRequest({ identifier: email, provider, token }) {
        const host = process.env.NEXTAUTH_URL || "Vault-App";
        const transport = nodemailer.createTransport(provider.server);
        await transport.sendMail({
          to: email,
          from: provider.from,
          subject: `Sign in to ${host}`,
          text: `Your verification code is ${token}`,
          html: `<p>Your verification code is:</p><h2>${token}</h2>`,
        });
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          include: {
            accounts: true,
          },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const hasOAuthAccount = user.accounts.some(
          (account) =>
            account.provider !== "credentials" && account.provider !== "email"
        );

        if (!hasOAuthAccount && !user.password) {
          throw new Error("Please complete your account setup");
        }

        if (hasOAuthAccount && !user.password) {
          throw new Error("Please use your social login instead");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password!
        );

        if (!isPasswordValid) return null;

        return { id: user.id, email: user.email, name: user.name };
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },

    async signIn({ user, account }) {
      if (!account?.provider || !user.email) return false;

      const existingUser = await prisma.user.findUnique({
        where: {
          email: user.email!,
        },
      });

      if (existingUser) {
        const linkedAccount = await prisma.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
        });

        if (!linkedAccount) {
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refresh_token: account.refresh_token,
              access_token: account.access_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: String(account.session_state),
            },
          });
        }
        return true;
      } else {
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
            image: user.image,
            password: null,
            emailVerified: new Date(),
            accounts: {
              create: {
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: account.refresh_token,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: String(account.session_state),
              },
            },
          },
        });
        return true;
      }
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/login",
    verifyRequest: "/verify-email",
    newUser: "/set-password",
  },
});
