// Main page — desktop shows the selected subcategory, mobile shows all categories stacked.
"use client";
import React from "react";
import styles from "@/Css/page.module.css";
import ForumSection from "./components/ForumSection";
import { useCategory } from "@/app/context/CategoryContext";
import { CATEGORIES, CATEGORY_KEYS } from "@/app/config/categories";

export default function MainPage() {
  const { selectedCategory, selectedSubcategory } = useCategory();

  const cat = CATEGORIES[selectedCategory];
  const sub = cat.subcategories.find((s) => s.value === selectedSubcategory);

  return (
    <main className={styles.main}>
      {/* Desktop: show all subcategories of the selected category */}
      <div className={styles.desktopView}>
        {cat.subcategories.map((subDef) => (
          <ForumSection
            key={subDef.value}
            category={cat.sanityType}
            subcategory={subDef.value}
            title={subDef.label}
          />
        ))}
      </div>

      {/* Mobile: show all categories and subcategories stacked */}
      <div className={styles.mobileView}>
        {CATEGORY_KEYS.map((catKey) => {
          const catDef = CATEGORIES[catKey];
          return (
            <div key={catKey} className={styles.mobileCategoryBlock}>
              <div className={styles.mobileCategoryHeader}>
                {catDef.label}
              </div>
              {catDef.subcategories.map((subDef) => (
                <ForumSection
                  key={subDef.value}
                  category={catDef.sanityType}
                  subcategory={subDef.value}
                  title={subDef.label}
                />
              ))}
            </div>
          );
        })}
      </div>
    </main>
  );
}
