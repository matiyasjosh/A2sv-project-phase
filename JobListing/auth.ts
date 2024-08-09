import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextApiHandler } from "next";

const authHandler: NextApiHandler = (req, res) =>
  NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
      }),
    ],
    pages: {
      signIn: "/login",
    }
  })(req, res);

export const GET = authHandler;
export const POST = authHandler;

export default authHandler;