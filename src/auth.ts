import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import requests from "./config/http";
import { cookies } from "next/headers";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    // Registration provider (already done)
    CredentialsProvider({
      id: "register",
      name: "Register",
      credentials: {
        username: { label: "Username", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const response = await requests.post('/auth/local/register', {
            username: credentials.username,
            email: credentials.email,
            password: credentials.password
          });

          if (response.user && response.jwt) {
            cookies().set("token", response.jwt);
            cookies().set("user", JSON.stringify(response.user));
            return response;
          } else {
            throw new Error("Something went wrong");
          }
        } catch (error) {
          console.error("Registration error:", error);
          return null;
        }
      },
    }),
    // Login provider
    CredentialsProvider({
      id: "login",
      name: "Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const response = await requests.post('/auth/local', {
            identifier: credentials.email,
            password: credentials.password
          });


          if (response.user && response.jwt) {
            cookies().set("token", response.jwt);
            cookies().set("user", JSON.stringify(response.user));
            return response;
          } else {
            throw new Error("Invalid login credentials");
          }
        } catch (error: any) {
          if (error.response && error.response.data) {
            throw new Error(error.response.data || "An error occurred during login");
          } else if (error instanceof Error) {
            throw error;
          } else {
            throw new Error("An unexpected error occurred");
          }
        }
      },
    })
  ],
  trustHost: true,
});
