import { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
import { repositoryStore } from "./store/repositoryStore";
import {SearchBar} from "./components/SearchBar/SearchBar";
import {SortSelector} from "./components/SortSelector/SortSelector";
import {RepositoryList} from "./components/RepositoryList/RepositoryList";

export const Test = observer(() => {
  const [searchValue, setSearchValue] = useState(repositoryStore.search);
  const [sortValue, setSortValue] = useState("Фильтр");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const debounce = (callback: () => void, delay: number) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(callback, delay);
  };

  const handleInputChange = (value: string) => {
    setSearchValue(value);
    debounce(() => {
      repositoryStore.setSearch(value);
      repositoryStore.resetData();
    }, 2000);
  };

  const handleSortChange = (value: string) => {
    setSortValue(value);
    debounce(() => {
      repositoryStore.setSort(value);
      repositoryStore.resetData();
    }, 2000);
  };

  const scrollHandler = () => {
    if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100) {
      repositoryStore.setFetching(true);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => document.removeEventListener("scroll", scrollHandler);
  }, []);

  useEffect(() => {
    if (repositoryStore.fetching) {
      repositoryStore.isLoading = repositoryStore.currentPage === 1;
      repositoryStore.loadingNewItems = repositoryStore.currentPage > 1;
      repositoryStore.fetchRepositories();
    }
  }, [repositoryStore.fetching]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <SearchBar searchValue={searchValue} onSearchChange={handleInputChange} onSearch={handleInputChange} />
        <SortSelector sortValue={sortValue} onSortChange={handleSortChange} />
      </div>
      {repositoryStore.error && <div style={{ color: "red" }}>Ошибка: {repositoryStore.error}</div>}
      <RepositoryList
        isLoading={repositoryStore.isLoading}
        repositories={repositoryStore.data}
        loadingNewItems={repositoryStore.loadingNewItems}
      />
    </div>
  );
});
