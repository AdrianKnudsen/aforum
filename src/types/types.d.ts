export interface Topic {
  title: string;
}

export interface Post {
  title: string;
  content: string;
  topic: Topic;
  createdAt: string;
}
