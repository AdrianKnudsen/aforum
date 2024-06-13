import React from "react";
import styles from "@/Css/aside.module.css";

export default function Aside() {
  return (
    <div className={styles.aSideContainer}>
      <ul>
        <li>
          <p>Welcome</p>
          <p>Login</p>
        </li>
      </ul>
    </div>
  );
}
