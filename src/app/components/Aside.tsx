import React from "react";
import Image from "next/image";
import styles from "@/Css/aside.module.css";

export default function Aside() {
  return (
    <aside className={styles.aSideContainer}>
      <h2>Categories</h2>
      <ul>
        <li>
          <Image src="/svg/AForumIcon1.svg" alt="icon" width={20} height={20} />
          &nbsp;General
        </li>
        <li>
          <Image src="/svg/AForumIcon1.svg" alt="icon" width={20} height={20} />
          &nbsp;Technology
        </li>
        <li>
          <Image src="/svg/AForumIcon1.svg" alt="icon" width={20} height={20} />
          &nbsp;Lifestyle &amp; Hobbies
        </li>
        <li>
          <Image src="/svg/AForumIcon1.svg" alt="icon" width={20} height={20} />
          &nbsp;Science &amp; Nature
        </li>
      </ul>
    </aside>
  );
}
