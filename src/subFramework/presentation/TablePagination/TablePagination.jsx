import React from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import c from 'classnames'
import Paginator from 'subFramework/stores/Paginator'
import styles from './tablePagination.scss'

const TablePagination = ({
  handlePageChange,
  paginator,
  maxPagesAtOnce,
  prevIcon,
  nextIcon,
  displayResultsMessage,
}) => {
  const { currentPage, totalPages } = paginator

  let fromPage = 1
  let toPage = totalPages

  if (totalPages > maxPagesAtOnce) {
    const halfPages = maxPagesAtOnce / 2

    if (currentPage > halfPages) {
      fromPage = currentPage - halfPages - 1
      toPage = currentPage + halfPages

      if (toPage > totalPages) {
        fromPage = totalPages - maxPagesAtOnce - 1
        toPage = totalPages
      }
    } else {
      toPage = maxPagesAtOnce
    }
  }

  const pages = []

  // eslint-disable-next-line no-plusplus
  for (let i = fromPage; i <= toPage; i++) {
    pages.push(i)
  }

  return (
    <div className={styles.paginatorContainer}>
      {paginator.totalPages > 1 && (
        <ol className={styles.tablePagination}>
          {currentPage > 1 && (
            <li
              className={styles.page}
              onClick={() => handlePageChange(currentPage - 1)}
              role="menuitem"
            >
              {prevIcon}
            </li>
          )}
          {pages.map((page) => (
            <li
              key={`pager_${page}`}
              className={c(styles.page, page === currentPage && styles.active)}
              onClick={() => handlePageChange(page)}
              role="menuitem"
            >
              {page}
            </li>
          ))}
          {currentPage < totalPages && (
            <li
              className={styles.page}
              onClick={() => handlePageChange(currentPage + 1)}
              role="menuitem"
            >
              {nextIcon}
            </li>
          )}
        </ol>
      )}
      {displayResultsMessage && <div className={styles.resultsData}>{displayResultsMessage}</div>}
    </div>
  )
}

TablePagination.propTypes = {
  handlePageChange: PropTypes.func.isRequired,
  paginator: PropTypes.instanceOf(Paginator).isRequired,
  prevIcon: PropTypes.node,
  nextIcon: PropTypes.node,
  maxPagesAtOnce: PropTypes.number,
  displayResultsMessage: PropTypes.string,
}

TablePagination.defaultProps = {
  maxPagesAtOnce: 10,
  prevIcon: '<',
  nextIcon: '>',
  displayResultsMessage: null,
}

export default observer(TablePagination)
