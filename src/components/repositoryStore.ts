import { makeAutoObservable } from "mobx";

interface Repository {
  name: string; // Название репозитория
  avatar: string; // URL аватара владельца
  html_url: string; // Ссылка на репозиторий
  stars: number; // Количество звезд
  stargazers_count: number; // Количество звезд
  forks: number; // Количество форков
  watchers: number; // Количество наблюдателей
  owner: {
    avatar_url: string; // URL аватара владельца
  };
}

class RepositoryStore {
  data: Repository[] = [];
  error: string | null = null;
  isLoading: boolean = false;
  currentPage: number = 1;
  fetching: boolean = true;
  loadingNewItems: boolean = false;
  search: string = "javascript";
  sort: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setSearch(value: string) {
    this.search = value;
    this.resetData();
  }

  setSort(value: string) {
    this.sort = value;
    this.resetData();
  }

  resetData() {
    this.data = [];
    this.currentPage = 1;
    this.isLoading = true;
    this.fetching = true;
  }
  ////
  updateRepository(index: number, updatedRepo: Partial<Repository>) {
    this.data[index] = { ...this.data[index], ...updatedRepo };
  }

  removeRepository(index: number) {
    this.data.splice(index, 1);
  }
  ///

  async fetchRepositories() {
    const url = `https://api.github.com/search/repositories?q=${
      this.search
    }&per_page=24&page=${this.currentPage}${
      this.sort ? `&sort=${this.sort}` : ""
    }`;

    try {
      const response = await fetch(url);
      const results = await response.json();
      const repos: Repository[] = results.items.map((item: Repository) => ({
        name: item.name,
        avatar: item.owner.avatar_url,
        html_url: item.html_url,
        stars: item.stargazers_count,
        forks: item.forks,
        watchers: item.watchers,
        owner: item.owner,
      }));

      this.data = this.currentPage === 1 ? repos : [...this.data, ...repos];
      this.currentPage += 1;
    } catch (err) {
      if (err instanceof Error) {
        this.error = err.message;
      }
    } finally {
      this.isLoading = false;
      this.fetching = false;
      this.loadingNewItems = false;
    }
  }

  setFetching(fetching: boolean) {
    this.fetching = fetching;
  }

  setLoadingNewItems(loadingNewItems: boolean) {
    this.loadingNewItems = loadingNewItems;
  }
}

export const repositoryStore = new RepositoryStore();
