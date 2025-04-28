import React from "react";
import styles from "@/Css/aside.module.css";

export default function Aside() {
  return (
    <aside className={styles.aSideContainer}>
      <h2>Categories</h2>
      <ul>
        <li>General</li>
        <li>Technology</li>
        <li>Lifestyle & Hobbies</li>
        <li>Science & Nature</li>
      </ul>
    </aside>
  );
}
