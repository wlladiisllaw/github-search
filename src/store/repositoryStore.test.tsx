import { repositoryStore } from "./repositoryStore";
import { Repository } from "./repositoryStore";

describe("RepositoryStore", () => {
  beforeEach(() => {
    repositoryStore.data = [];
    repositoryStore.error = null;
    repositoryStore.isLoading = false;
    repositoryStore.currentPage = 1;
    repositoryStore.fetching = false;
    repositoryStore.search = "javascript";
    repositoryStore.sort = null;
  });

  test("setSearch обновляет значение поиска и сбрасывает данные", () => {
    const newSearch = "react";

    repositoryStore.setSearch(newSearch);

    expect(repositoryStore.search).toBe(newSearch);
    expect(repositoryStore.data).toEqual([]);
    expect(repositoryStore.currentPage).toBe(1);
  });

  test("setSort обновляет значение сортировки и сбрасывает данные", () => {
    const newSort = "stars";

    repositoryStore.setSort(newSort);

    expect(repositoryStore.sort).toBe(newSort);
    expect(repositoryStore.data).toEqual([]);
    expect(repositoryStore.currentPage).toBe(1);
  });

  test("clearError очищает сообщение об ошибке", () => {
    repositoryStore.error = "An error occurred";

    repositoryStore.clearError();

    expect(repositoryStore.error).toBeNull();
  });

  test("updateRepository обновляет данные репозитория по индексу", () => {
    const repo: Repository = {
      name: "Repo1",
      avatar: "avatar1",
      html_url: "url1",
      stars: 10,
      stargazers_count: 10,
      forks: 5,
      created_at: "2023",
      owner: { avatar_url: "avatar1" },
    };

    repositoryStore.data.push(repo);

    repositoryStore.updateRepository(0, { stars: 20 });

    expect(repositoryStore.data[0].stars).toBe(20);
  });

  test("removeRepository удаляет репозиторий по индексу", () => {
    const repo: Repository = {
      name: "Repo1",
      avatar: "avatar1",
      html_url: "url1",
      stars: 10,
      stargazers_count: 10,
      forks: 5,
      created_at: "2023",
      owner: { avatar_url: "avatar1" },
    };

    repositoryStore.data.push(repo);

    repositoryStore.removeRepository(0);

    expect(repositoryStore.data).toHaveLength(0);
  });
});
