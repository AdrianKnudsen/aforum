// Shared TypeScript type definitions used across the forum application.

// Represents a topic that a post can belong to
export interface Topic {
  title: string;
}

// Represents a single forum post stored in Sanity
export interface Post {
  title: string;
  content: string;
  topic?: Topic;
  createdAt: string;
}
