// ForumSection — reusable component that displays a single forum category.
// Fetches posts from Sanity, supports creating new posts via the API, and toggles post visibility.
"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { client } from "../../../sanity/lib/client";

import styles from "@/Css/forumSection.module.css";
import editorStyles from "@/Css/richTextEditor.module.css";
import RichTextEditor from "./RichTextEditor";
import { Post } from "@/types/types";

interface ForumSectionProps {
  category:
    | "generalPost"
    | "technologyPost"
    | "lifestyleHobbiesPost"
    | "scienceNaturePost";
  title: string;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function getInitials(name?: string): string {
  if (!name) return "?";
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function ForumSection({ category, title }: ForumSectionProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedPostIndex, setSelectedPostIndex] = useState<number | null>(null);
  const [showAddPost, setShowAddPost] = useState(false);
  const [postsToShow, setPostsToShow] = useState(2);
  const [postError, setPostError] = useState("");

  const fetchPosts = useCallback(async () => {
    try {
      const result: Post[] = await client.fetch(
        `*[_type == $category] | order(createdAt desc){title, content, createdAt, author->{ "name": username, role }}`,
        { category },
      );
      setPosts(result);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [category]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleAddButtonClick = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    setShowAddPost(!showAddPost);
  };

  const handleAddPost = async () => {
    setPostError("");
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      setPostError("Title and content are required.");
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setPostError("Not logged in.");
      return;
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        _type: category,
        title: newPostTitle,
        content: newPostContent,
      }),
    });

    if (res.ok) {
      const created = await res.json();
      setPosts((prev) => [created, ...prev]);
      setNewPostTitle("");
      setNewPostContent("");
      setShowAddPost(false);
    } else {
      const data = await res.json().catch(() => ({}));
      setPostError(data.error || `Server error (${res.status})`);
    }
  };

  const handlePostClick = (index: number) => {
    setSelectedPostIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleTogglePosts = () => {
    setPostsToShow((prev) => (prev === 2 ? posts.length : 2));
  };

  const visiblePosts = posts.slice(0, postsToShow);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.icon}>
          <Image src="/svg/AForumIcon1.svg" alt="Aforum icon" width={42} height={42} />
        </div>
        <div className={styles.titleGroup}>
          <span className={styles.title}>{title}</span>
          <span className={styles.postCount}>
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </span>
        </div>
        <div
          className={styles.addButton}
          onClick={handleAddButtonClick}
          aria-label={showAddPost ? "Close form" : "Add post"}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#addBtnClip)">
              <path
                d="M10.2809 1.11432H1.94759C1.48735 1.11432 1.11426 1.48741 1.11426 1.94765V10.281C1.11426 10.7412 1.48735 11.1143 1.94759 11.1143H10.2809C10.7412 11.1143 11.1143 10.7412 11.1143 10.281V1.94765C11.1143 1.48741 10.7412 1.11432 10.2809 1.11432Z"
                stroke="#c5e1a5"
                strokeLinejoin="round"
              />
              <path
                d="M3.89197 6.11431H8.33641"
                stroke="#8CB150"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className={`${styles.verticalBar} ${showAddPost ? styles.verticalBarHidden : ""}`}
                d="M6.11419 3.89209V8.33653"
                stroke="#8CB150"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="addBtnClip">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      {/* Post List */}
      <div className={styles.itemList}>
        {posts.length === 0 ? (
          <div className={styles.emptyState}>No posts yet — be the first!</div>
        ) : (
          visiblePosts.map((post, index) => (
            <div
              className={`${styles.item} ${selectedPostIndex === index ? styles.selectedItem : ""}`}
              key={index}
              onClick={() => handlePostClick(index)}
            >
              <div className={styles.itemHeader}>
                <div className={styles.avatar}>
                  <span style={{ transform: "translateY(0.12em)", display: "block" }}>{getInitials(post.author?.name)}</span>
                </div>
                <div className={styles.text}>
                  <span className={styles.postTitle}>{post.title}</span>
                  <div className={styles.postMeta}>
                    {post.author && (
                      <span className={styles.authorName}>{post.author.name}</span>
                    )}
                    {post.createdAt && (
                      <span className={styles.postDate}>
                        {formatDate(post.createdAt)}
                      </span>
                    )}
                  </div>
                </div>
                <span className={styles.expandIcon}>▼</span>
              </div>
              {selectedPostIndex === index && (
                <div
                  className={`${styles.content} ${editorStyles.richContent}`}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              )}
            </div>
          ))
        )}
      </div>

      {/* Show more / less */}
      {posts.length > 2 && (
        <div className={styles.pagination}>
          <button className={styles.showMoreBtn} onClick={handleTogglePosts}>
            {postsToShow === 2 ? "Show all" : "Show less"}
          </button>
        </div>
      )}

      {/* Add Post Form */}
      {showAddPost && user && (
        <div className={styles.addPostForm}>
          <span className={styles.formLabel}>Title</span>
          <input
            type="text"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            placeholder="Post title"
          />
          <span className={styles.formLabel}>Content</span>
          <RichTextEditor
            content={newPostContent}
            onChange={setNewPostContent}
          />
          {postError && <p className={styles.formError}>{postError}</p>}
          <button onClick={handleAddPost}>Publish Post</button>
        </div>
      )}
    </div>
  );
}
