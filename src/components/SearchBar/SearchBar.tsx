import React from "react";
import { Input } from "antd";
import styles from "./SearchBar.module.css";

const { Search } = Input;

interface SearchBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchValue, onSearchChange, onSearch }) => {
  return (
    <div className={styles.searchWrapper}>
      <Search
        placeholder="Поиск по технолиям"
        size="large"
        enterButton
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        onSearch={onSearch}
        className={styles.searchInput}
      />
    </div>
  );
};


