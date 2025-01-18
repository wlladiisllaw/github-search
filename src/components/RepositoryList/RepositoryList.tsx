  import React from "react";
  import { Card, Skeleton } from "antd";
  import { RepositoryCard } from "../RepositoryCard/RepositoryCard";
  import styles from "./RepositoryList.module.css";
  import { observer } from "mobx-react";

  import { repositoryStore } from "../../store/repositoryStore";

  import { ErrorNotification } from "../ErrorNotification/ErrorNotification";
  
  import { Repository } from "../../store/repositoryStore";

  interface RepositoryListProps {
    isLoading: boolean;
    repositories: Repository[]; 
    loadingNewItems: boolean;
  }
  
  export const RepositoryList: React.FC<RepositoryListProps> = observer(({ isLoading, repositories, loadingNewItems }) => {
    return (
      <div className={styles.repositoryWrapper}>
            {repositoryStore.error && <ErrorNotification />} 
        {isLoading
          ? Array.from({ length: 6 }, (_, index) => (
              <Card key={index} style={{ width: 340, height: 240, }}>
                <Skeleton active avatar paragraph={{ rows: 3 }} />
              </Card>
            ))
          : repositories.map((repo, index) => (
              <RepositoryCard
                key={index}
                repo={repo}
                index={index}
              />
            ))}
        {loadingNewItems &&
          Array.from({ length: 6 }, (_, index) => (
            <Card key={index} style={{ width: 340, height: 240}}>
              <Skeleton active paragraph={{ rows: 3 }} />
            </Card>
          ))}
      </div>
    );
  }
  )

