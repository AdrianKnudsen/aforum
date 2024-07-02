"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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

  const closeMenu = () => {
    setIsOpen(false);
    setShowLinks(false);
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
        <div className={styles.logoWrapper}>
          <Link href="/" passHref>
            <Image
              className={styles.logo}
              src="/images/AForumLogo.png"
              alt="logo-img"
              fill
              priority
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onClick={closeMenu}
            />
          </Link>
        </div>
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
            <Link href="#" passHref onClick={closeMenu}>
              Search
              <span className={styles.outer} aria-hidden="true">
                <span className={styles.inner}>Search</span>
              </span>
            </Link>
          </li>
          <li data-animation="to-top">
            <Link href="#" passHref onClick={closeMenu}>
              Login
              <span className={styles.outer} aria-hidden="true">
                <span className={styles.inner}>Login</span>
              </span>
            </Link>
          </li>
          <li data-animation="to-top">
            <Link href="/about" passHref onClick={closeMenu}>
              About
              <span className={styles.outer} aria-hidden="true">
                <span className={styles.inner}>About</span>
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
