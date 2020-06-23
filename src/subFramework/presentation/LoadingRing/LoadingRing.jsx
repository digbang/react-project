import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import styles from './loadingRing.scss'

const LoadingRing = ({ small, center, absolute }) => (
  <div className={c(center && styles.center, absolute && styles.absolute)}>
    <div className={c(styles.loadingRing, small && styles.small)}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
)

LoadingRing.propTypes = {
  small: PropTypes.bool,
  center: PropTypes.bool,
  absolute: PropTypes.bool,
}

LoadingRing.defaultProps = {
  small: false,
  center: false,
  absolute: false,
}

export default React.memo(LoadingRing)
