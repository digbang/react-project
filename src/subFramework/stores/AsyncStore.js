import { observable, computed, action } from 'mobx'

class AsyncStore {
  @observable isLoading = true
  @observable errors = []
  @observable serverError = false

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

  @action
  preRequest(request) {
    this.isLoading = true
    this.errors = []
    this.requestProcess(request)
  }

  onSuccessRequest() {
    this.isLoading = false
  }

  @action
  clearError() {
    this.serverError = false
  }

  @action
  setServerError() {
    this.serverError = true
  }

  @action
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

  @computed
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
