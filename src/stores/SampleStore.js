import { observable, action, makeObservable } from 'mobx'

class SampleStore {
  sampleVariable = 1

  constructor() {
    makeObservable(this, {
      sampleVariable: observable,
      changeSampleVariable: action,
    })
  }

  changeSampleVariable(value) {
    this.sampleVariable = value
  }
}

export default SampleStore
