import { observable, action, computed, makeObservable } from 'mobx'

class Sorter {
  sortField = ''
  sortSense = 'ASC'

  constructor(sortField, sortSense) {
    makeObservable(this, {
      // observables
      sortField: observable,
      sortSense: observable,
      // actions
      setSort: action,
      changeSort: action,
      // computeds
      isASC: computed,
    })

    this.sortField = sortField
    this.sortSense = sortSense
  }

  setSort(sortField, sortSense) {
    this.sortField = sortField
    this.sortSense = sortSense
  }

  changeSort(sortField) {
    let sortSense = 'ASC'

    if (sortField === this.sortField && this.sortSense === 'ASC') {
      sortSense = 'DESC'
    }

    this.sortField = sortField
    this.sortSense = sortSense
  }

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
