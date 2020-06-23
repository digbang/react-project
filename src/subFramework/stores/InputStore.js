import { observable, action } from 'mobx'
import { AsyncStore } from 'subFramework'

export default class InputStore extends AsyncStore {
  @observable error = false
  @observable value = ''
  @observable errorMessage = ''

  @action
  setError(errorMessage) {
    this.error = true
    this.errorMessage = errorMessage
  }

  @action
  setValue(value) {
    this.value = value || ''
    this.clearError()
  }

  @action
  clearError() {
    this.error = false
    this.errorMessage = ''
  }

  @action
  clearAll() {
    this.error = false
    this.errorMessage = null
    this.value = null
  }
}
