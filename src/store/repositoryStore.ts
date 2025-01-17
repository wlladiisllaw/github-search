import { makeAutoObservable } from "mobx";

interface Repository {
    name: string;
    avatar: string;
    html_url: string;
    stars: number;
    stargazers_count: number;
    forks: number;
    created_at: string; // Сохраняем как строку
    owner: {
      avatar_url: string;
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
        created_at: item.created_at.substring(0,4),
        owner: item.owner,
      }));
      console.log(repos);

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
