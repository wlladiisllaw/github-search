import styles from "./Header.module.css";
import React from "react";

export function Header() {
  return (
    <header className={styles.header}>
      <a
        href="https://github.com/wlladiisllaw/github-search"
        target="_blank"
        className={styles.link}
      >
        <img src="vk_logo.svg" alt="логотип VK" className={styles.logo} />
      </a>
      <h3 className={styles.title}>ГитГид</h3>
    </header>
  );
}
