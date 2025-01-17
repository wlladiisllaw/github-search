import React from "react";
import { Select } from "antd";
import styles from "./SortSelector.module.css";

interface SortSelectorProps {
  sortValue: string;
  onSortChange: (value: string) => void;
}

export const SortSelector: React.FC<SortSelectorProps> = ({
  sortValue,
  onSortChange,
}) => {
  return (
    <div className={styles.sortWrapper}>
      <Select
        value={sortValue}
        style={{ width: 150 }}
        onChange={onSortChange}
        placeholder="Сортировка"
        options={[
          { value: "stars", label: "Звезды" },
          { value: "forks", label: "Форки" },
        ]}
      />
    </div>
  );
};
