export interface RepositoryProvider {
  searchForRepository: (searchTerm: string) => string[];
}

export class GithubRepositoryProvider implements RepositoryProvider {
  public searchForRepository(searchForRepository: string) {
    return [];
  }
}
