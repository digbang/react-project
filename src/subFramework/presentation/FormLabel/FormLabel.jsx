import { memo } from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import styles from './formLabel.module.scss'

const FormLabel = ({ label, disabled, viewMode }) => (
  <div className={c(styles.label, disabled && styles.disabled, viewMode && styles.literalLabel)}>
    {label}
  </div>
)

FormLabel.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  viewMode: PropTypes.bool,
}

FormLabel.defaultProps = {
  disabled: false,
  viewMode: false,
}

export default memo(FormLabel)
