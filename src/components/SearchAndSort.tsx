import { Input, Select } from "antd";
import { useRef } from "react";
import { repositoryStore } from "./repositoryStore";

const { Search } = Input;

export const SearchAndSort = () => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (value: string) => {
    repositoryStore.setSearch(value);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      repositoryStore.resetData();
    }, 500); // 500 мс задержка
  };

  const handleSortChange = (value: string) => {
    repositoryStore.setSort(value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: "80px", 
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
      }}
    >
      <Search
        placeholder="Search repositories"
        size="large"
        enterButton
        value={repositoryStore.search}
        onChange={(e) => handleInputChange(e.target.value)}
        onSearch={(value) => handleInputChange(value)}
        style={{ width: 250, marginRight: "10px" }} 
      />
      <Select
        defaultValue="Sort by"
        style={{ width: 150 }}
        onChange={handleSortChange}
        options={[
          { value: "stars", label: "Stars" },
          { value: "forks", label: "Forks" },
        ]}
      />
    </div>
  );
};
