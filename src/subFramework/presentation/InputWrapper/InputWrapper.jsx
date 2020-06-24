import React from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import c from 'classnames'
import Input from 'subFramework/presentation/Input'
import InputStore from 'subFramework/stores/InputStore'
import PropTypes from 'prop-types'
import styles from './inputWrapper.scss'

const InputWrapper = ({
  wrapperClassName,
  translationFile,
  as: Component,
  placeholder,
  description,
  inputStore,
  alignError,
  inputRef,
  required,
  literal,
  label,
  name,
  ...props
}) => {
  const { t } = useTranslation(translationFile)
  let useLabel = label
  let usePlaceholder = placeholder

  if (name !== null) {
    if (label === null) {
      useLabel = t(`${name}Label`)
    }

    if (placeholder === null) {
      usePlaceholder = t(`${name}Placeholder`)
    }
  }

  if (required && !literal) {
    useLabel = `${useLabel} *`
  }

  return (
    <div className={c(styles.wrapper, wrapperClassName && wrapperClassName)}>
      <Component
        value={inputStore && inputStore.value}
        error={inputStore && inputStore.error}
        placeholder={usePlaceholder}
        inputRef={inputRef}
        literal={literal}
        label={useLabel}
        {...props}
      />
      {inputStore && inputStore.error && inputStore.errorMessage !== '' && (
        <small
          className={c(styles.error, literal && styles.errorLiteral, styles[`align-${alignError}`])}
        >
          {t(inputStore.errorMessage)}
        </small>
      )}
      {description && <span className={styles.description}>{description}</span>}
    </div>
  )
}

InputWrapper.propTypes = {
  as: PropTypes.oneOfType([PropTypes.any]),
  alignError: PropTypes.oneOf(['start', 'center', 'end']),
  inputStore: PropTypes.instanceOf(InputStore),
  wrapperClassName: PropTypes.string,
  translationFile: PropTypes.string,
  placeholder: PropTypes.string,
  description: PropTypes.string,
  inputRef: PropTypes.func,
  required: PropTypes.bool,
  label: PropTypes.string,
  literal: PropTypes.bool,
  name: PropTypes.string,
}

InputWrapper.defaultProps = {
  wrapperClassName: null,
  translationFile: '',
  alignError: 'start',
  placeholder: null,
  description: null,
  inputStore: null,
  required: false,
  literal: false,
  inputRef: null,
  label: null,
  name: null,
  as: Input,
}

export default React.memo(observer(InputWrapper))
