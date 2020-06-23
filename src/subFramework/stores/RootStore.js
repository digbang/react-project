import { RouterStore } from 'subFramework'

class RootStore {
  constructor(authStore) {
    this.routerStore = new RouterStore()
    this.authStore = authStore
  }

  reset() {
    this.routerStore.clearAll()
  }
}

export default RootStore
