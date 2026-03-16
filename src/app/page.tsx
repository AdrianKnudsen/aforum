// Main page — on mobile shows all categories stacked, on desktop shows only the selected category.
"use client";
import React from "react";
import styles from "@/Css/page.module.css";
import GeneralForum from "./components/GeneralForum";
import TechnologyForum from "./components/TechnologyForum";
import LifestyleHobbies from "./components/LifestyleHobbies";
import ScienceNature from "./components/ScienceNature";
import { useCategory } from "@/app/context/CategoryContext";

export default function MainPage() {
  const { selected } = useCategory();

  return (
    <main className={styles.main}>
      <div className={selected === "general" ? styles.visible : styles.hidden}>
        <GeneralForum />
      </div>
      <div className={selected === "technology" ? styles.visible : styles.hidden}>
        <TechnologyForum />
      </div>
      <div className={selected === "lifestyle" ? styles.visible : styles.hidden}>
        <LifestyleHobbies />
      </div>
      <div className={selected === "science" ? styles.visible : styles.hidden}>
        <ScienceNature />
      </div>
    </main>
  );
}
