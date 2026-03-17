// Aside — sticky sidebar showing all forum categories with expandable subcategories.
"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "@/Css/aside.module.css";
import { useCategory } from "@/app/context/CategoryContext";
import { CATEGORIES, CATEGORY_KEYS, CategoryKey } from "@/app/config/categories";

export default function Aside() {
  const { selectedCategory, selectedSubcategory, setSelection } = useCategory();
  const [expandedCategory, setExpandedCategory] = useState<CategoryKey>(selectedCategory);

  const handleMainClick = (key: CategoryKey) => {
    if (expandedCategory === key) {
      setExpandedCategory("" as CategoryKey);
    } else {
      setExpandedCategory(key);
      setSelection(key, CATEGORIES[key].subcategories[0].value);
    }
  };

  const handleSubClick = (catKey: CategoryKey, subValue: string) => {
    setSelection(catKey, subValue);
  };

  return (
    <aside className={styles.aSideContainer}>
      <h2>Categories</h2>
      <ul>
        {CATEGORY_KEYS.map((key) => {
          const cat = CATEGORIES[key];
          const isExpanded = expandedCategory === key;
          const isMainActive = selectedCategory === key;

          return (
            <li key={key} className={styles.categoryGroup}>
              <div
                className={`${styles.mainCategory} ${isMainActive ? styles.active : ""}`}
                onClick={() => handleMainClick(key)}
              >
                <Image src="/svg/AForumIcon1.svg" alt="icon" width={30} height={30} />
                <span>{cat.label}</span>
                <span className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ""}`}>›</span>
              </div>

              {isExpanded && (
                <ul className={styles.subList}>
                  {cat.subcategories.map((sub) => (
                    <li
                      key={sub.value}
                      className={`${styles.subItem} ${
                        isMainActive && selectedSubcategory === sub.value ? styles.subActive : ""
                      }`}
                      onClick={() => handleSubClick(key, sub.value)}
                    >
                      {sub.label}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
