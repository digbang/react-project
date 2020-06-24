import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { FormLabel, LiteralValue } from 'subFramework'
import styles from './textArea.scss'

const TextArea = ({
  label,
  inputRef,
  error,
  value,
  literal,
  fullHeightLabel,
  minRows,
  autosize,
  ...props
}) =>
  literal ? (
    <LiteralValue label={label} value={value} />
  ) : (
    <label className={c(fullHeightLabel && styles.fullHeightLabel)}>
      {label && <FormLabel label={label} />}
      <textarea
        className={c(styles.input, fullHeightLabel && styles.fullHeightArea, error && styles.error)}
        ref={inputRef}
        value={value}
        rows={minRows}
        onKeyDown={(e) => {
          if (e.keyCode === 27) {
            e.target.blur()
          }
        }}
        {...props}
      />
    </label>
  )

TextArea.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  inputRef: PropTypes.func,
  error: PropTypes.bool,
  fullHeightLabel: PropTypes.bool,
  minRows: PropTypes.number,
  literal: PropTypes.bool,
  autosize: PropTypes.bool,
}

TextArea.defaultProps = {
  label: '',
  value: '',
  inputRef: () => {},
  error: false,
  fullHeightLabel: false,
  minRows: 4,
  literal: false,
  autosize: true,
}

export default React.memo(TextArea)
