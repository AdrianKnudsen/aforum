"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { createClient } from "next-sanity";
import styles from "@/Css/forumSection.module.css";
import { Post } from "@/types/types";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  useCdn: true,
  token: process.env.SANITY_API_TOKEN || "",
  apiVersion: "2024-06-27",
});

interface ForumSectionProps {
  category: "generalPost" | "technologyPost";
  title: string;
}

export default function ForumSection({ category, title }: ForumSectionProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedPostIndex, setSelectedPostIndex] = useState<number | null>(
    null
  );
  const [showAddPost, setShowAddPost] = useState(false);
  const [postsToShow, setPostsToShow] = useState(2);

  const fetchPosts = useCallback(async () => {
    const result: Post[] = await client.fetch(
      `*[_type == $category] | order(createdAt desc){title, content, createdAt}`,
      { category }
    );
    setPosts(result);
  }, [category]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleAddPost = async () => {
    if (newPostTitle.trim() === "" || newPostContent.trim() === "") return;

    await client.create({
      _type: category,
      title: newPostTitle,
      content: newPostContent,
      createdAt: new Date().toISOString(),
    });
    setNewPostTitle("");
    setNewPostContent("");
    setShowAddPost(false);

    fetchPosts();
  };

  const handlePostClick = (index: number) => {
    setSelectedPostIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleTogglePosts = () => {
    setPostsToShow((prevPostsToShow) =>
      prevPostsToShow === 2 ? posts.length : 2
    );
  };

  return (
    <div className={styles.container}>
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
        >
          <Image
            src="/svg/AForumIcon3.svg"
            alt="Aforum add icon"
            width={30}
            height={30}
          />
        </div>
      </div>
      <div className={styles.divider}></div>
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
      <div className={styles.pagination} onClick={handleTogglePosts}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
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
