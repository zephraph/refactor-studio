import { observable, action, set } from 'mobx'

interface IStore {
  repositories: string[]
  addRepositories: (repositories: string[]) => void
}

export const store = observable<IStore>(
  {
    repositories: [],
    addRepositories(repositories: string[]) {
      set(
        store,
        'repositories',
        Array.from(new Set([...this.repositories, ...repositories]))
      )
    }
  },
  {
    addRepositories: action
  }
)
