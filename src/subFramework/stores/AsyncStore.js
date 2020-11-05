import { observable, computed, action, makeObservable } from 'mobx'

class AsyncStore {
  isLoading = true
  errors = []
  serverError = false

  constructor() {
    makeObservable(this, {
      // observables
      isLoading: observable,
      errors: observable,
      serverError: observable,
      // actions
      preRequest: action,
      onSuccessRequest: action,
      clearError: action,
      setServerError: action,
      finishRequest: action,
      onErrorRequest: action,
      // computeds
      hasErrors: computed,
    })
  }

  requestProcess(request = null) {
    this.clearError()
    this.tryAgainRequest = request
  }

  tryAgain() {
    if (this.tryAgainRequest) {
      this.tryAgainRequest()
    }

    return null
  }

  preRequest(request) {
    this.isLoading = true
    this.errors = []
    this.requestProcess(request)
  }

  onSuccessRequest() {
    this.isLoading = false
  }

  clearError() {
    this.serverError = false
  }

  setServerError() {
    this.serverError = true
  }

  finishRequest() {
    this.isLoading = false
  }

  onErrorRequest(error) {
    this.finishRequest()
    this.errors.push(error)

    if (AsyncStore.isServerError(error)) {
      this.setServerError(error)
    }
  }

  get hasErrors() {
    return !!this.errors.length
  }

  static isServerError(error) {
    if (error && error.response && error.response.status) {
      return error.response.status === 500
    }

    return false
  }
}

export default AsyncStore
