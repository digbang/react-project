import { observable, action, observe } from 'mobx'
import { compile } from 'path-to-regexp'
import { matchPath } from 'react-router'

export default class RouteStore {
  @observable location = null

  history = null

  @action
  _updateLocation(newState) {
    this.location = newState
  }

  @action
  clearAll() {
    this.location = null
  }

  build = (route, params, search = null) => {
    return {
      ...params,
      pathname: compile(route)(params),
      search,
    }
  }

  locationIs = (route, params) => {
    return this.location.pathname === compile(route)(params)
  }

  @action
  setHistory(history) {
    this.history = history
  }

  /*
   * History methods
   */
  push = (route, params) => {
    this.history.push(this.build(route, params))
  }

  replace = (route, params) => {
    this.history.replace(this.build(route, params))
  }

  go = (n) => {
    this.history.go(n)
  }

  goBack = () => {
    this.history.goBack()
  }

  goForward = () => {
    this.history.goForward()
  }

  locationMatchesUrls = (matchingUrls) => {
    return (
      matchingUrls.filter(
        (matchingUrl) =>
          matchPath(this.location.pathname, { path: matchingUrl, exact: true }) !== null
      ).length > 0
    )
  }
}

export const syncHistoryWithStore = (history, store) => {
  // Initialise store
  store.setHistory(history)

  // Handle update from history object
  const handleLocationChange = (location) => {
    store._updateLocation(location)
  }

  const unsubscribeFromHistory = history.listen(handleLocationChange)
  handleLocationChange(history.location)

  const subscribe = (listener) => {
    const onStoreChange = () => {
      const rawLocation = { ...store.location }
      listener(rawLocation, history.action)
    }

    // Listen for changes to location state in store
    const unsubscribeFromStore = observe(store, 'location', onStoreChange)

    listener(store.location, history.action)

    return () => {
      unsubscribeFromStore()
    }
  }
  const unsubscribe = () => unsubscribeFromHistory()

  history.subscribe = subscribe
  history.unsubscribe = unsubscribe

  return history
}
