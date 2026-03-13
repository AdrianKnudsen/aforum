// ForumSection — reusable component that displays a single forum category.
// Fetches posts from Sanity, supports creating new posts via the API, and toggles post visibility.
"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { client } from "../../../sanity/lib/client";

import styles from "@/Css/forumSection.module.css";
import { Post } from "@/types/types";

// Props: category is the Sanity document type; title is the display name shown in the header
interface ForumSectionProps {
  category:
    | "generalPost"
    | "technologyPost"
    | "lifestyleHobbiesPost"
    | "scienceNaturePost";
  title: string;
}

export default function ForumSection({ category, title }: ForumSectionProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedPostIndex, setSelectedPostIndex] = useState<number | null>(
    null,
  );
  const [showAddPost, setShowAddPost] = useState(false);
  const [postsToShow, setPostsToShow] = useState(2);

  // Fetch posts from Sanity
  const fetchPosts = useCallback(async () => {
    try {
      const result: Post[] = await client.fetch(
        `*[_type == $category] | order(createdAt desc){title, content, createdAt}`,
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

  // Submits a new post to the API route, then optimistically prepends it to the local list
  const handleAddPost = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    }
  };

  // Toggles the expanded/collapsed state of a post — clicking the same post again collapses it
  const handlePostClick = (index: number) => {
    setSelectedPostIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Toggles between showing 2 posts (default) and all posts
  const handleTogglePosts = () => {
    setPostsToShow((prev) => (prev === 2 ? posts.length : 2));
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.icon}>
          <Image
            src="/svg/AForumIcon1.svg"
            alt="Aforum icon"
            width={30}
            height={30}
          />
        </div>
        <div className={styles.title}>{title}</div>
        <div
          className={styles.addButton}
          onClick={() => setShowAddPost(!showAddPost)}
          aria-label={showAddPost ? "Close form" : "Add post"}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#addBtnClip)">
              <path
                d="M10.2809 1.11432H1.94759C1.48735 1.11432 1.11426 1.48741 1.11426 1.94765V10.281C1.11426 10.7412 1.48735 11.1143 1.94759 11.1143H10.2809C10.7412 11.1143 11.1143 10.7412 11.1143 10.281V1.94765C11.1143 1.48741 10.7412 1.11432 10.2809 1.11432Z"
                stroke="#3A3A3A"
                strokeLinejoin="round"
              />
              {/* Horizontal bar — always visible */}
              <path
                d="M3.89197 6.11431H8.33641"
                stroke="#8CB150"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Vertical bar — fades and slides down when form is open */}
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

      {/* Divider */}
      <div className={styles.divider}></div>

      {/* Post List */}
      <div className={styles.itemList}>
        {posts.slice(0, postsToShow).map((post, index) => (
          <div
            className={`${styles.item} ${
              selectedPostIndex === index ? styles.selectedItem : ""
            }`}
            key={index}
            onClick={() => handlePostClick(index)}
          >
            <div className={styles.itemHeader}>
              <div className={styles.circle}>
                <Image
                  src="/svg/AForumIcon2.svg"
                  alt="Aforum circle icon"
                  width={30}
                  height={30}
                />
              </div>
              <div className={styles.text}>{post.title}</div>
            </div>
            {selectedPostIndex === index && (
              <div className={styles.content}>
                <p className={styles.topicText}>{post.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination — only shown when there are more than 2 posts */}
      {posts.length > 2 && (
        <div className={styles.pagination} onClick={handleTogglePosts}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      )}

      {/* Add Post Form */}
      {showAddPost && (
        <div className={styles.addPostForm}>
          <input
            type="text"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            placeholder="New post title"
          />
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="New post content"
          />
          <button onClick={handleAddPost}>Add Post</button>
        </div>
      )}
    </div>
  );
}
