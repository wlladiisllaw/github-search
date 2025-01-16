import { useState } from "react";
import { Card, Avatar, Input, Button } from "antd";
import {
  StarOutlined,
  EyeOutlined,
  ForkOutlined,
  UpCircleOutlined,
} from "@ant-design/icons";
import { repositoryStore } from "./repositoryStore";


interface RepositoryCardProps {
  repo: {
    name: string;
    html_url: string;
    avatar: string;
    watchers: number;
    stars: number;
    forks: number;
  };
  index: number;
}

export const RepositoryCard: React.FC<RepositoryCardProps> = ({ repo, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editWatchers, setEditWatchers] = useState(repo.watchers);
  const [editStars, setEditStars] = useState(repo.stars);
  const [editForks, setEditForks] = useState(repo.forks);

  return (
    <Card
      style={{
        width: 340,
        height: 260,
        position: "relative",
        marginTop: 35,
      }}
    >
      <Card.Meta
        avatar={
          <Avatar
            src={repo.avatar}
            size={70}
            style={{
              position: "absolute",
              border: "7px solid #0077FF",
              transform: "translateX(-50%)",
              top: -45,
              left: "50%",
            }}
          />
        }
        title={
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#0077FF",
              padding: "7px",
              color: "white",
              fontSize: "20px",
              display: "block",
            }}
          >
            {repo.name.toUpperCase()}
          </a>
        }
        description={
          <div>
            {!isEditing ? (
              <>
                <p>
                  <UpCircleOutlined style={{ color: "green" }} /> Место:{" "}
                  {index + 1}
                </p>

                <p>
                  <EyeOutlined style={{ color: "purple" }} /> Просмотры:{" "}
                  {repo.watchers}
                </p>
                <p>
                  <StarOutlined style={{ color: "gold" }} /> Звёзды:{" "}
                  {repo.stars}
                </p>
                <p>
                  <ForkOutlined style={{ color: "red" }} /> Форки: {repo.forks}
                </p>
              </>
            ) : (
              <>
                <p>
                  <EyeOutlined style={{ color: "purple" }} /> Просмотры:{" "}
                  <Input
                    value={editWatchers}
                    onChange={(e) => setEditWatchers(Number(e.target.value))}
                    style={{ width: "60px" }}
                  />
                </p>
                <p>
                  <StarOutlined style={{ color: "gold" }} /> Звёзды:{" "}
                  <Input
                    value={editStars}
                    onChange={(e) => setEditStars(Number(e.target.value))}
                    style={{ width: "60px" }}
                  />
                </p>
                <p>
                  <ForkOutlined style={{ color: "red" }} /> Форки:
                  <Input
                    value={editForks}
                    onChange={(e) => setEditForks(Number(e.target.value))}
                    style={{ width: "60px" }}
                  />
                </p>
              </>
            )}
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <Button
                type="primary"
                onClick={() => {
                  if (isEditing) {
                    repositoryStore.updateRepository(index, {
                      watchers: Number(editWatchers),
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
                type="default"
                danger
                onClick={() => repositoryStore.removeRepository(index)}
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
