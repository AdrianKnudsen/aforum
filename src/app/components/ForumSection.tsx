"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "next-sanity";
import styles from "@/Css/forumSection.module.css";
import { Topic } from "@/types/types";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  useCdn: true,
  token: process.env.SANITY_API_TOKEN || "",
  apiVersion: "2024-06-27",
});

export default function ForumSection() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicContent, setNewTopicContent] = useState("");
  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number | null>(
    null
  );
  const [showAddTopic, setShowAddTopic] = useState(false);
  const [topicsToShow, setTopicsToShow] = useState(2);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    const result: Topic[] = await client.fetch(
      `*[_type == "topic"] | order(createdAt desc){title, content, createdAt}`
    );
    setTopics(result);
  };

  const handleAddTopic = async () => {
    if (newTopicTitle.trim() === "" || newTopicContent.trim() === "") return;

    await client.create({
      _type: "topic",
      title: newTopicTitle,
      content: newTopicContent,
      createdAt: new Date().toISOString(),
    });
    fetchTopics();
    setNewTopicTitle("");
    setNewTopicContent("");
    setShowAddTopic(false);
  };

  const handleTopicClick = (index: number) => {
    setSelectedTopicIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleToggleTopics = () => {
    setTopicsToShow((prevTopicsToShow) =>
      prevTopicsToShow === 2 ? topics.length : 2
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
        <div className={styles.title}>General</div>
        <div
          className={styles.addButton}
          onClick={() => setShowAddTopic(!showAddTopic)}
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
        {topics.slice(0, topicsToShow).map((topic, index) => (
          <div
            className={`${styles.item} ${
              selectedTopicIndex === index ? styles.selectedItem : ""
            }`}
            key={index}
            onClick={() => handleTopicClick(index)}
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
              <div className={styles.text}>{topic.title}</div>
            </div>
            {selectedTopicIndex === index && (
              <div className={styles.content}>
                <p className={styles.topicText}>{topic.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.pagination} onClick={handleToggleTopics}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
      {showAddTopic && (
        <div className={styles.addTopicForm}>
          <input
            type="text"
            value={newTopicTitle}
            onChange={(e) => setNewTopicTitle(e.target.value)}
            placeholder="New topic title"
          />
          <textarea
            value={newTopicContent}
            onChange={(e) => setNewTopicContent(e.target.value)}
            placeholder="New topic content"
          />
          <button onClick={handleAddTopic}>Add Topic</button>
        </div>
      )}
    </div>
  );
}
