"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/Css/navbar.module.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  const toggleMenu = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setShowLinks(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowLinks(true);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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
        <button
          className={`${styles.hamburgerMenuButton} ${isOpen ? styles.open : ""}`}
          onClick={toggleMenu}
        >
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
        </button>
      </div>
      <nav className={`${styles.navMenu} ${isOpen ? styles.showMenu : ""}`}>
        <ul
          className={`${styles.navLinks} ${showLinks ? styles.showLinks : ""}`}
        >
          <li data-animation="to-top">
            <a href="#">
              Search
              <span className={styles.outer} aria-hidden="true">
                <span className={styles.inner}>Search</span>
              </span>
            </a>
          </li>
          <li data-animation="to-top">
            <a href="#">
              Login
              <span className={styles.outer} aria-hidden="true">
                <span className={styles.inner}>Login</span>
              </span>
            </a>
          </li>
          <li data-animation="to-top">
            <a href="#">
              About
              <span className={styles.outer} aria-hidden="true">
                <span className={styles.inner}>About</span>
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
