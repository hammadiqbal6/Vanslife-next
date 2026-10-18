import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticate } from "@/lib/store";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const result = authenticate(credentials.email, credentials.password);
        if (!result) {
          throw new Error("Invalid credentials");
        }

        return {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          firstName: result.user.firstName,
          lastName: result.user.lastName,
          token: result.token,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.token = user.token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        firstName: token.firstName,
        lastName: token.lastName,
        token: token.token,
      };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
