// Aside — sticky sidebar showing all forum categories.
"use client";
import React from "react";
import Image from "next/image";
import styles from "@/Css/aside.module.css";
import { useCategory } from "@/app/context/CategoryContext";
import { CATEGORIES, CATEGORY_KEYS, CategoryKey } from "@/app/config/categories";

export default function Aside() {
  const { selectedCategory, setSelection } = useCategory();

  const handleMainClick = (key: CategoryKey) => {
    setSelection(key, CATEGORIES[key].subcategories[0].value);
  };

  return (
    <aside className={styles.aSideContainer}>
      <h2>Categories</h2>
      <ul>
        {CATEGORY_KEYS.map((key) => {
          const cat = CATEGORIES[key];
          const isActive = selectedCategory === key;

          return (
            <li key={key} className={styles.categoryGroup}>
              <div
                className={`${styles.mainCategory} ${isActive ? styles.active : ""}`}
                onClick={() => handleMainClick(key)}
              >
                <Image src="/svg/AForumIcon1.svg" alt="icon" width={36} height={36} />
                <span>{cat.label}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
