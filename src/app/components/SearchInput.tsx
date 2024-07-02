"use client";

import React from "react";
import Image from "next/image";
import styles from "@/Css/search.module.css";

const SearchInput = () => {
  return (
    <div className={styles.searchInputWrapper}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search..."
      />
      <button className={styles.searchButton}>
        <Image
          src="/svg/search-icon.svg"
          alt="search-icon"
          width={20}
          height={20}
          className={styles.searchIcon}
        />
      </button>
    </div>
  );
};

export default SearchInput;
