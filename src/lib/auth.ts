// NextAuth configuration — shared between the API route and getServerSession calls.
// Uses CredentialsProvider so users log in with email + password stored in Sanity.
import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "next-sanity";
import bcrypt from "bcryptjs";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  apiVersion: "2024-06-27",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Look up the author by email — include passwordHash for verification
        const author = await sanityClient.fetch<{
          _id: string;
          username: string;
          email: string;
          passwordHash: string;
          role: string;
        } | null>(
          `*[_type == "author" && email == $email][0]{ _id, username, email, passwordHash, role }`,
          { email: credentials.email },
        );

        if (!author) return null;

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          author.passwordHash,
        );
        if (!passwordMatch) return null;

        return {
          id: author._id,
          name: author.username,
          email: author.email,
          role: author.role,
        };
      },
    }),
  ],
  callbacks: {
    // Store authorId and role in the JWT so they are available in the session
    async jwt({ token, user }) {
      if (user) {
        token.authorId = user.id;
        token.username = user.name ?? "";
        token.role = (user as { role?: string }).role ?? "member";
      }
      return token;
    },
    async session({ session, token }) {
      session.user.authorId = token.authorId as string;
      session.user.username = token.username as string;
      session.user.role = token.role as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
