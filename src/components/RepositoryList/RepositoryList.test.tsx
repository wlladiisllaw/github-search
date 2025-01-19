import React from "react";
import { render, screen } from "@testing-library/react";
import { RepositoryList } from "./RepositoryList";
import { repositoryStore } from "../../store/repositoryStore";
import { Repository } from "../../store/repositoryStore";

jest.mock("../../store/repositoryStore", () => ({
  repositoryStore: {
    error: null,
  },
}));
jest.mock("../ErrorNotification/ErrorNotification", () => ({
  ErrorNotification: jest.fn(() => <div>Error!</div>),
}));

describe("RepositoryList", () => {
  const repositories: Repository[] = [
    {
      name: "Test Repo",
      avatar: "https://example.com/avatar.jpg",
      html_url: "https://github.com/test-repo",
      stars: 10,
      stargazers_count: 10,
      forks: 5,
      created_at: "2023-01-01",
      owner: { avatar_url: "https://example.com/owner-avatar.jpg" },
    },
  ];

  test("отображение скелетонов при загрузке", () => {
    render(
      <RepositoryList
        isLoading={true}
        repositories={repositories}
        loadingNewItems={false}
      />,
    );

    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons).toHaveLength(6);
  });

  test("отображение репозиториев при завершении загрузки", () => {
    render(
      <RepositoryList
        isLoading={false}
        repositories={repositories}
        loadingNewItems={false}
      />,
    );

    const repoCards = screen.getAllByText("TEST REPO");
    expect(repoCards).toHaveLength(1);
  });

  test("отображение скелетонов при загрузке новых элементов", () => {
    render(
      <RepositoryList
        isLoading={false}
        repositories={repositories}
        loadingNewItems={true}
      />,
    );

    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons).toHaveLength(6);
  });

  test("отображение ErrorNotification при наличии ошибки", () => {
    repositoryStore.error = "Something went wrong";

    render(
      <RepositoryList
        isLoading={false}
        repositories={repositories}
        loadingNewItems={false}
      />,
    );

    const errorNotification = screen.getByText("Error!");
    expect(errorNotification).toBeInTheDocument();
  });
});
