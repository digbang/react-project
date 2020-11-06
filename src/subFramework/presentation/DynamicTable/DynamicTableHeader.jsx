import { memo } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import c from 'classnames'
import DynamicTableColumn from 'subFramework/models/DynamicTableColumn'
import Sorter from 'subFramework/stores/Sorter'
import styles from './dynamicTableStyles.scss'

const DynamicTableHeader = ({
  columns,
  gridStyle,
  t,
  handleSortChange,
  sortAscendingIcon,
  sortDescendingIcon,
  sorter,
}) => {
  const handleClickRowCell = ({ sortable, key }) => {
    if (sortable) {
      handleSortChange(key)
    }
  }

  return (
    <div className={c(styles.rowItem, styles.headerRow)} style={gridStyle}>
      {columns.map((column, i) => {
        const { title, titleConfig, sortable, key } = column
        let value

        if (titleConfig) {
          value = titleConfig(t(title))
        } else {
          value = t(title)
        }

        return (
          <div
            className={c(styles.headerRowCell, sortable && styles.hasSort)}
            onClick={() => handleClickRowCell(column)}
            role="button"
            tabIndex={0}
            // eslint-disable-next-line react/no-array-index-key
            key={i}
          >
            {value}
            {sortable && (
              <span
                className={c(styles.sortIcon, sorter.sortField === key && styles.sortIconActive)}
              >
                {!sorter.isASC && sorter.sortField === key ? sortDescendingIcon : sortAscendingIcon}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

DynamicTableHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.instanceOf(DynamicTableColumn)),
  gridStyle: PropTypes.oneOfType([PropTypes.any]),
  t: PropTypes.oneOfType([PropTypes.any]),
  sortDescendingIcon: PropTypes.node,
  sortAscendingIcon: PropTypes.node,
  handleSortChange: PropTypes.func,
  sorter: PropTypes.instanceOf(Sorter),
}

DynamicTableHeader.defaultProps = {
  handleSortChange: () => {},
  sortDescendingIcon: null,
  sortAscendingIcon: null,
  sorter: Sorter.empty(),
  gridStyle: {},
  columns: [],
  t: {},
}

export default memo(observer(DynamicTableHeader))
