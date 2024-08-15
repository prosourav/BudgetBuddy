import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "./data/index";
import { cookies } from "next/headers";



export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        try {
          const user = getUserByEmail(credentials?.email as string);
          if (user) {
            const isMatch = user?.password === credentials.password;
            if (isMatch) {
              cookies().set('user', JSON.stringify(user));
              return user;
            } else {
              throw new Error("Email or Password is not correct");
            }
          } else {
            throw new Error("User not found...");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    })
  ],
});
