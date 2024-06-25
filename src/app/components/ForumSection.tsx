import React from "react";
import Image from "next/image";
import styles from "@/Css/forumSection.module.css";

export default function ForumSection() {
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
        <div className={styles.addButton}>
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
        <div className={styles.item}>
          <div className={styles.circle}>
            <Image
              src="/svg/AForumIcon2.svg"
              alt="Aforum circle icon"
              width={30}
              height={30}
            />
          </div>
          <div className={styles.text}>Lorem ipsum</div>
        </div>
        <div className={styles.item}>
          <div className={styles.circle}>
            <Image
              src="/svg/AForumIcon2.svg"
              alt="Aforum circle icon"
              width={30}
              height={30}
            />
          </div>
          <div className={styles.text}>Lorem ipsum</div>
        </div>
        <div className={styles.item}>
          <div className={styles.circle}>
            <Image
              src="/svg/AForumIcon2.svg"
              alt="Aforum circle icon"
              width={30}
              height={30}
            />
          </div>
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
