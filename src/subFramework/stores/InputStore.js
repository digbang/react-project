import { observable, action, makeObservable } from 'mobx'
import { AsyncStore } from 'subFramework'

export default class InputStore extends AsyncStore {
  error = false
  value = ''
  errorMessage = ''

  constructor() {
    super()

    makeObservable(this, {
      // observables
      error: observable,
      value: observable,
      errorMessage: observable,
      // actions
      setError: action,
      setValue: action,
      clearError: action,
      clearAll: action,
    })
  }

  setError(errorMessage) {
    this.error = true
    this.errorMessage = errorMessage
  }

  setValue(value) {
    this.value = value || ''
    this.clearError()
  }

  clearError() {
    this.error = false
    this.errorMessage = ''
  }

  clearAll() {
    this.error = false
    this.errorMessage = null
    this.value = null
  }
}
