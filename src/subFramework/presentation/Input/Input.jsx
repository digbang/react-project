import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { FormLabel, LiteralValue } from 'subFramework'
import styles from './input.scss'

const handleInputChange = (e, onChange, onlyNumeric) => {
  if (onlyNumeric && !/^-?\d*[.]?\d{0,2}$/.test(e.target.value)) {
    return false
  }

  if (onlyNumeric && e.target.value * 1 > Number.MAX_SAFE_INTEGER - 1) {
    return false
  }

  onChange(e)

  return null
}

const Input = ({
  label,
  inputRef,
  disabled,
  onChange,
  onlyNumeric,
  error,
  literal,
  value,
  className,
  ...props
}) =>
  literal ? (
    <LiteralValue label={label} value={value} />
  ) : (
    <label className={styles.label}>
      {label && <FormLabel label={label} disabled={disabled} />}
      <input
        className={c(styles.input, error && styles.error, className !== '' && className)}
        onChange={(e) => handleInputChange(e, onChange, onlyNumeric)}
        disabled={disabled}
        ref={inputRef}
        value={value}
        {...props}
      />
    </label>
  )

Input.propTypes = {
  inputRef: PropTypes.instanceOf(PropTypes.any),
  onlyNumeric: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  literal: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.bool,
}

Input.defaultProps = {
  onlyNumeric: false,
  disabled: false,
  inputRef: null,
  onChange: null,
  literal: false,
  className: '',
  error: false,
  label: '',
  value: '',
}

export default React.memo(Input)
