import React from "react";
import styles from "@/Css/forumSection.module.css";

export default function ForumSection() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}></div>
        <div className={styles.title}>General</div>
        <div className={styles.addButton}></div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.itemList}>
        <div className={styles.item}>
          <div className={styles.circle}></div>
          <div className={styles.text}>Lorem ipsum1</div>
        </div>
        <div className={styles.item}>
          <div className={styles.circle}></div>
          <div className={styles.text}>Lorem ipsum</div>
        </div>
        <div className={styles.item}>
          <div className={styles.circle}></div>
          <div className={styles.text}>Lorem ipsum</div>
        </div>
      </div>
      <div className={styles.pagination}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  );
}
