import { memo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import c from 'classnames'
import { LoadingRing, TablePagination } from 'subFramework'
import Paginator from 'subFramework/stores/Paginator'
import Sorter from 'subFramework/stores/Sorter'
import DynamicTableColumn from 'subFramework/models/DynamicTableColumn'
import DynamicTableHeader from './DynamicTableHeader'
import styles from './dynamicTableStyles.module.scss'

const DynamicTable = ({
  displayResultsMessage,
  sortDescendingIcon,
  sortAscendingIcon,
  paginatorPrevIcon,
  paginatorNextIcon,
  handlePageChange,
  handleSortChange,
  noResultsMessage,
  translationFile,
  handleRowClick,
  paginator,
  isLoading,
  columns,
  sorter,
  data,
}) => {
  const { t } = useTranslation(translationFile)

  if (isLoading) {
    return <LoadingRing center />
  }

  const gridStyle = {
    gridTemplateColumns: columns.map(({ size = '1fr' }) => `${size}`).join(' '),
  }

  const tableHeader = (
    <DynamicTableHeader
      sortDescendingIcon={sortDescendingIcon}
      sortAscendingIcon={sortAscendingIcon}
      handleSortChange={handleSortChange}
      gridStyle={gridStyle}
      columns={columns}
      sorter={sorter}
      t={t}
    />
  )

  let tableContent = noResultsMessage

  if (data.length > 0) {
    tableContent = data.map((item) => (
      <div
        className={c(styles.rowItem, styles.contentRow)}
        onClick={(e) => handleRowClick(e, item)}
        key={`row_${item.id}`}
        style={gridStyle}
        role="button"
        tabIndex={0}
      >
        {columns.map(({ key, dataAccessor, customTitleAlt }) => {
          let value

          if (dataAccessor) {
            value = dataAccessor(item)
          } else {
            value = item[key]
          }

          let titleAlt = typeof value === 'string' ? value : ''

          if (customTitleAlt) {
            titleAlt = customTitleAlt(item)
          }

          return (
            <div className={styles.item} key={`id_${key}`} title={titleAlt}>
              {value !== '' && value !== null ? value : '-'}
            </div>
          )
        })}
      </div>
    ))
  }

  return (
    <>
      {tableHeader}
      {tableContent}
      {paginator.total > 0 && (
        <TablePagination
          displayResultsMessage={displayResultsMessage}
          handlePageChange={handlePageChange}
          prevIcon={paginatorPrevIcon}
          nextIcon={paginatorNextIcon}
          paginator={paginator}
        />
      )}
    </>
  )
}

DynamicTable.propTypes = {
  noResultsMessage: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  columns: PropTypes.arrayOf(PropTypes.instanceOf(DynamicTableColumn)),
  data: PropTypes.oneOfType([PropTypes.array]),
  paginator: PropTypes.instanceOf(Paginator).isRequired,
  displayResultsMessage: PropTypes.string,
  sorter: PropTypes.instanceOf(Sorter),
  sortAscendingIcon: PropTypes.node,
  sortDescendingIcon: PropTypes.node,
  paginatorPrevIcon: PropTypes.node,
  paginatorNextIcon: PropTypes.node,
  translationFile: PropTypes.string,
  handlePageChange: PropTypes.func,
  handleSortChange: PropTypes.func,
  handleRowClick: PropTypes.func,
  isLoading: PropTypes.bool,
}

DynamicTable.defaultProps = {
  displayResultsMessage: null,
  handlePageChange: () => {},
  handleSortChange: () => {},
  handleRowClick: () => {},
  sortDescendingIcon: null,
  sortAscendingIcon: null,
  paginatorPrevIcon: null,
  paginatorNextIcon: null,
  sorter: Sorter.empty(),
  translationFile: '',
  isLoading: false,
  columns: [],
  data: [],
}

export default memo(DynamicTable)
