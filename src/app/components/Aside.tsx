import React from "react";
import styles from "@/Css/aside.module.css";

export default function Aside() {
  return (
    <div className={styles.aSideContainer}>
      <ul>
        <li>
          <p>General</p>
          <p>Technology</p>
          <p>Lifestyle and Hobbies</p>
          <p>Science and Nature</p>
        </li>
      </ul>
    </div>
  );
}
