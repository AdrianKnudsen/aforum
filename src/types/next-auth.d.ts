import "next-auth";
import "next-auth/jwt";

// Extend the Session and JWT types to include our custom fields
declare module "next-auth" {
  interface Session {
    user: {
      authorId: string;
      username: string;
      email: string;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    authorId: string;
    username: string;
    role: string;
  }
}
