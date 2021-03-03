import { memo } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import { FormLabel, LiteralValue } from 'subFramework'
import c from 'classnames'
import styles from './datePickerInput.module.scss'
import 'react-datepicker/dist/react-datepicker.css'

const DatePickerInput = ({
  placeholder,
  onChange,
  literal,
  value,
  label,
  error,
  icon,
  dateFormat,
  literalValueFormat,
  ...props
}) => {
  if (literal) {
    return (
      <LiteralValue label={label} value={value !== '' ? value.format(literalValueFormat) : null} />
    )
  }

  return (
    <label onClick={(e) => e.preventDefault()} className={styles.datePickerLabel}>
      {label && <FormLabel label={label} disabled={false} />}
      <div className={styles.pickerContainer}>
        <DatePicker
          className={c(styles.dateInput, error && styles.error)}
          selected={value !== '' ? Date.parse(value) : null}
          onChange={(date) => onChange(date)}
          placeholderText={placeholder}
          dateFormat={dateFormat}
          {...props}
        />
        {icon && <span className={styles.pickerIcon}>{icon}</span>}
      </div>
    </label>
  )
}

DatePickerInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string, PropTypes.any]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  literal: PropTypes.bool,
  error: PropTypes.bool,
  icon: PropTypes.node,
  dateFormat: PropTypes.string,
  literalValueFormat: PropTypes.string,
}

DatePickerInput.defaultProps = {
  literalValueFormat: 'MM/DD/YYYY',
  dateFormat: 'MM/dd/yyyy',
  onChange: () => {},
  placeholder: null,
  literal: false,
  error: false,
  value: null,
  label: null,
  icon: null,
}

export default memo(DatePickerInput)
