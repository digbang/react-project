import { observable, action } from 'mobx'

class Paginator {
  @observable count = 0
  @observable total = 0
  @observable perPage = 10
  @observable currentPage = 1
  @observable totalPages = 1

  constructor(count, total, perPage, currentPage, totalPages) {
    this.count = count
    this.total = total
    this.perPage = perPage
    this.currentPage = currentPage
    this.totalPages = totalPages
  }

  @action
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
