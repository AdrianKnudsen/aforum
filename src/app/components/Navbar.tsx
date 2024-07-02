"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchInput from "./SearchInput";
import styles from "@/Css/navbar.module.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const toggleMenu = () => {
    if (showSearch) {
      setShowSearch(false);
    } else if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setShowLinks(false);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setShowLinks(false);
    setShowSearch(false);
  };

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowSearch(true);
    setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen && !showSearch) {
      const timer = setTimeout(() => {
        setShowLinks(true);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen, showSearch]);

  return (
    <div
      className={`${styles.navContainer} ${showSearch ? styles.navSearch : ""}`}
    >
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
          {showSearch ? (
            <li className={styles.searchContainer}>
              <SearchInput />
              <button className={styles.closeButton} onClick={closeMenu}>
                X
              </button>
            </li>
          ) : (
            <>
              <li data-animation="to-top">
                <a href="#" onClick={handleSearchClick}>
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
                <Link href="/about" onClick={closeMenu}>
                  About
                  <span className={styles.outer} aria-hidden="true">
                    <span className={styles.inner}>About</span>
                  </span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
