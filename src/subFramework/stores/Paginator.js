import { observable, action, makeObservable } from 'mobx'

class Paginator {
  count = 0
  total = 0
  perPage = 10
  currentPage = 1
  totalPages = 1

  constructor(count, total, perPage, currentPage, totalPages) {
    makeObservable(this, {
      // observables
      count: observable,
      total: observable,
      perPage: observable,
      currentPage: observable,
      totalPages: observable,
      // actions
      setCurrentPage: action,
    })

    this.count = count
    this.total = total
    this.perPage = perPage
    this.currentPage = currentPage
    this.totalPages = totalPages
  }

  setCurrentPage(currentPage) {
    this.currentPage = currentPage
  }

  static fromJson({ count, total, perPage, currentPage, totalPages }) {
    return new Paginator(count, total, perPage, currentPage, totalPages)
  }

  static empty() {
    return new Paginator(0, 0, 10, 1, 1)
  }
}

export default Paginator
