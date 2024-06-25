import React from "react";
import Image from "next/image";
import styles from "@/Css/navbar.module.css";

export default function navbar() {
  return (
    <div className={styles.navContainer}>
      <div className={styles.logoContainer}>
        <Image
          className={styles.logo}
          src="/images/AForumLogo.png"
          alt="logo-img"
          width={120}
          height={35}
          priority
        />
      </div>
      <div className={styles.hamburgerMenuContainer}>
        <button className={styles.hamburgerMenuButton}>
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
        </button>
        <nav className={styles.navMenu}></nav>
      </div>
    </div>
  );
}
