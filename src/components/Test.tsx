import { observer } from "mobx-react";
import { useEffect, useState, useRef } from "react";
import { Card, Skeleton, Input, Select} from "antd";

import { repositoryStore } from "./repositoryStore";

import { RepositoryCard } from "./RepositoryCard";

const { Search } = Input;

type DebounceCallback = () => void;

export const Test = observer(() => {
  const [searchValue, setSearchValue] = useState(repositoryStore.search); 
  const [sortValue, setSortValue] = useState("Фильтр"); 
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null); 

 
  const debounce = (callback: DebounceCallback, delay: number) => {

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }


    debounceTimeout.current = setTimeout(callback, delay);
  };

  
  const handleInputChange = (value: string) => {
    setSearchValue(value);
    console.log("Search Value:", value); 
    debounce(() => {
      repositoryStore.setSearch(value);
      repositoryStore.resetData(); 
    }, 2000); 
  };

  
  const handleSortChange = (value: string) => {
    setSortValue(value);
    console.log("Sort Value:", value); 
    debounce(() => {
      repositoryStore.setSort(value); 
      repositoryStore.resetData(); 
    }, 2000); 
  };


  const scrollHandler = () => {
    if (
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
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
          value={searchValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onSearch={handleInputChange}
          style={{ width: 250, marginRight: "10px" }}
        />
        <Select
          value={sortValue}
          style={{ width: 150 }}
          onChange={handleSortChange}
          placeholder="Сортировка"
          options={[
            { value: "stars", label: "Звезды" },
            { value: "forks", label: "Форки" },
          ]}
        />
      </div>

      {repositoryStore.error && (
        <div style={{ color: "red" }}>Ошибка: {repositoryStore.error}</div>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
        }}
      >
        {repositoryStore.isLoading && repositoryStore.currentPage === 1
          ? Array.from({ length: 6 }, (_, idx) => (
              <Card key={idx} style={{ width: 340, height: 240 }}>
                <Skeleton active avatar paragraph={{ rows: 3 }} />
              </Card>
            ))
          : repositoryStore.data.map((repo, index) => (
              <RepositoryCard
                key={index}
                repo={{
                  name: repo.name,
                  avatar: repo.avatar,
                  html_url: repo.html_url,
                  stars: repo.stars,
                  forks: repo.forks,
                  watchers: repo.watchers,
                }}
                index={index}
              />
            ))}

        {repositoryStore.loadingNewItems &&
          Array.from({ length: 6 }, (_, idx) => (
            <Card
              key={idx}
              style={{
                width: 340,
                height: 240,
                position: "relative",
                marginTop: 35,
              }}
            >
              <Skeleton active paragraph={{ rows: 3 }} />
            </Card>
          ))}
      </div>
    </div>
  );
});
