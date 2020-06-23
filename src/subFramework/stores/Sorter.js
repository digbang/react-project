import { observable, action, computed } from 'mobx'

class Sorter {
  @observable sortField = ''
  @observable sortSense = 'ASC'

  constructor(sortField, sortSense) {
    this.sortField = sortField
    this.sortSense = sortSense
  }

  @action
  setSort(sortField, sortSense) {
    this.sortField = sortField
    this.sortSense = sortSense
  }

  @action
  changeSort(sortField) {
    let sortSense = 'ASC'

    if (sortField === this.sortField && this.sortSense === 'ASC') {
      sortSense = 'DESC'
    }

    this.sortField = sortField
    this.sortSense = sortSense
  }

  @computed
  get isASC() {
    return this.sortSense === 'ASC'
  }

  static fromJson({ sortField, sortSense }) {
    return new Sorter(sortField, sortSense)
  }

  static empty() {
    return new Sorter('', '')
  }
}

export default Sorter
