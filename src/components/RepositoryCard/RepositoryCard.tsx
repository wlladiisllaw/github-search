import { useState } from "react";
import { Card, Avatar, Input, Button } from "antd";
import {
  StarOutlined,
  CalendarOutlined,  ForkOutlined,
  UpCircleOutlined,
} from "@ant-design/icons";
import { repositoryStore } from "../../store/repositoryStore";
import styles from "./RepositoryCard.module.css";  

export interface RepositoryCardProps {
  repo: {
    created_at: string,
    name: string;
    html_url: string;
    avatar: string;
    stars: number;
    forks: number;
  };
  index: number;
}

export const RepositoryCard: React.FC<RepositoryCardProps> = ({ repo, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editDate, setEditDate] = useState(repo.created_at);
  const [editStars, setEditStars] = useState(repo.stars);
  const [editForks, setEditForks] = useState(repo.forks);

  return (
    <Card className={styles.cardContainer}>
      <Card.Meta
         title={
          <div className={styles.headerContainer}>
            <Avatar
              src={repo.avatar}
              size={40}
              className={styles.cardAvatarInline}
            />
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardTitleInline}
            >
              {repo.name.toUpperCase()}
            </a>
          </div>
        }
        description={
          <div className={styles.cardDescription}>
            {!isEditing ? (
              <>
               <div className={styles.row}>
                <p>
                  <UpCircleOutlined style={{ color: "green" }} className={styles.icon} /> Место: <br />
                  {index + 1}
                </p>
                <p>
                  <CalendarOutlined  style={{ color: "purple" }} className={styles.icon} /> Дата: <br />
                  {repo.created_at}
                </p>
                </div>
                <div className={styles.row}>
                <p>
                  <StarOutlined style={{ color: "gold" }} className={styles.icon} /> Звёзды: <br />
                  {repo.stars}
                </p>
                <p>
                  <ForkOutlined style={{ color: "red" }} className={styles.icon} /> Форки: <br />
                  {repo.forks}
                </p>
                </div>
              </>
            ) : (
              <>
               <div className={styles.row}>
               <p>
                  <UpCircleOutlined style={{ color: "green" }} className={styles.icon} /> Место: <br />
                  {index + 1}
                </p>
                <p>
                  <CalendarOutlined style={{ color: "purple" }} className={styles.icon} /> Дата: <br />
                  <Input
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className={styles.editingInput}
                  />
                </p>
               
                </div>
                < div className={styles.row}>
                <p>
                  <StarOutlined style={{ color: "gold" }} className={styles.icon} /> Звёзды: <br />
                  <Input
                    value={editStars}
                    onChange={(e) => setEditStars(Number(e.target.value))}
                    className={styles.editingInput}
                  />
                </p>
                  <p>
                    <ForkOutlined style={{ color: "red" }} className={styles.icon} /> Форки: <br />
                    <Input
                      value={editForks}
                      onChange={(e) => setEditForks(Number(e.target.value))}
                      className={styles.editingInput}
                    />
                  </p>
                </div>
              </>
            )}
            <div className={styles.buttonContainer}>
              <Button
                type="default"
                className={styles.buttonEdit}
                onClick={() => {
                  if (isEditing) {
                    repositoryStore.updateRepository(index, {
                      created_at: editDate,
                      stars: Number(editStars),
                      forks: Number(editForks),
                    });
                  }
                  setIsEditing(!isEditing);
                }}
              >
                {isEditing ? "Сохранить" : "Редактировать"}
              </Button>
              <Button
              className={styles.buttonDelete}
                type="default"
                onClick={() => {
                    console.log(repositoryStore.data.length);
                    repositoryStore.removeRepository(index)
                    console.log(repositoryStore.data.length);
                }}
              >
                Удалить
              </Button>
            </div>
          </div>
        }
      />
    </Card>
  );
};
