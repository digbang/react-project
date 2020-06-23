import React from 'react'
import PropTypes from 'prop-types'
import styles from './noResultsMessage.scss'

const NoResultsMessage = ({ message }) => {
  return <div className={styles.noResultsMessage}>{message}</div>
}

NoResultsMessage.propTypes = {
  message: PropTypes.string.isRequired,
}

export default React.memo(NoResultsMessage)
