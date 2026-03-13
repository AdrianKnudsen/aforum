// Shared TypeScript type definitions used across the forum application.

// Represents an author stored in Sanity
export interface Author {
  name: string;
  bio?: string;
  role?: "member" | "moderator" | "admin";
}

// Represents a single forum post stored in Sanity
export interface Post {
  title: string;
  content: string;
  createdAt: string;
  author?: Author;
}
