import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { FormLabel } from 'subFramework'
import styles from './literalValue.scss'

const LiteralValue = ({ label, value }) => (
  <label className={c(styles.literalLabel)}>
    {label && <FormLabel label={label} viewMode />}
    <div className={styles.literalValue}>{value !== null && value !== '' ? value : '-'}</div>
  </label>
)

LiteralValue.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

LiteralValue.defaultProps = {
  label: null,
  value: null,
}

export default React.memo(LiteralValue)
