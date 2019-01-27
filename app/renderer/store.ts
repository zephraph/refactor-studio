import { observable, action, set } from "mobx";

interface Store {
  repositories: string[];
  addRepositories: (repositories: string[]) => void;
  removeRepositories: (repositories: string[]) => void;
}

export const store = observable<Store>(
  {
    repositories: [],
    addRepositories(repositories: string[]) {
      set(
        store,
        "repositories",
        Array.from(new Set([...this.repositories, ...repositories]))
      );
    },
    removeRepositories(reposToRemove: string[]) {
      const currentRepos = new Set(this.repositories);
      reposToRemove.forEach((repo) => currentRepos.delete(repo));
      set(store, "repositories", Array.from(currentRepos));
    }
  },
  {
    addRepositories: action,
    removeRepositories: action
  }
);
