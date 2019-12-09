import { observable, action } from 'mobx'

class SampleStore {
  @observable sampleVariable = 1

  @action
  changeSampleVariable(value) {
    this.sampleVariable = value
  }
}

export default SampleStore
