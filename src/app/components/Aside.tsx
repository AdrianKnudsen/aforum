// Aside — sticky sidebar showing all forum category links. Only rendered on wide screens (768px+).
"use client";
import React from "react";
import Image from "next/image";
import styles from "@/Css/aside.module.css";
import { useCategory, Category } from "@/app/context/CategoryContext";

const categories: { label: string; value: Category }[] = [
  { label: "General", value: "general" },
  { label: "Technology", value: "technology" },
  { label: "Lifestyle & Hobbies", value: "lifestyle" },
  { label: "Science & Nature", value: "science" },
];

export default function Aside() {
  const { selected, setSelected } = useCategory();

  return (
    <aside className={styles.aSideContainer}>
      <h2>Categories</h2>
      <ul>
        {categories.map((cat) => (
          <li
            key={cat.value}
            onClick={() => setSelected(cat.value)}
            className={selected === cat.value ? styles.active : undefined}
          >
            <Image src="/svg/AForumIcon1.svg" alt="icon" width={30} height={30} />
            &nbsp;{cat.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}
