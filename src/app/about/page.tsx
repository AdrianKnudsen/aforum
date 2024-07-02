import React from "react";
import styles from "@/Css/about.module.css";

export default function page() {
  return (
    <div className={styles.container}>
      <h1>About Us</h1>
      <p>
        Welcome to AForum, a modern forum application built to facilitate
        seamless communication and interaction within various communities. Our
        platform allows users to create, share, and discuss topics across
        multiple categories.
      </p>
      <p>
        AForum is designed with the latest technologies to ensure a fast,
        responsive, and user-friendly experience. Whether you&apos;re here to
        ask questions, share knowledge, or simply engage in discussions, AForum
        provides the tools you need to connect with others effectively.
      </p>
    </div>
  );
}
