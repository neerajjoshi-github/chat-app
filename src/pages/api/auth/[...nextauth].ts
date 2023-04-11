import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { authOptions } from "<@>/libs/auth";

export default NextAuth(authOptions);
