import { memo } from 'react'
import PropTypes from 'prop-types'
import styles from './pageTitle.module.scss'

const PageTitle = ({ title, rightSection }) => {
  return (
    <div className={styles.pageTitleContainer}>
      <div>
        <div className={styles.sectionTitle}>{title}</div>
      </div>
      {rightSection && <div className={styles.rightSection}>{rightSection}</div>}
    </div>
  )
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  rightSection: PropTypes.node,
}

PageTitle.defaultProps = {
  rightSection: null,
}

export default memo(PageTitle)
