import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { LiteralValue, FormLabel } from 'subFramework'
import styles from './formSelect.scss'

const customStyles = (mergeStyles, error) => ({
  control: (provided, state) => {
    let borderColor = 'var(--input-border)'

    if (state.menuIsOpen) {
      borderColor = 'var(--text-color)'
    }

    if (error) {
      borderColor = 'var(--error-color)'
    }

    return {
      ...provided,
      opacity: state.isDisabled ? '0.3' : '1',
      borderColor,
      borderRadius: '3px',
      boxShadow: 'none',
      fontFamily: 'var(--main-font)',
      fontWeight: '500',
      minHeight: '40px',
      paddingBottom: '0',
      paddingTop: '0',
      paddingLeft: '15px',
      paddingRight: '5px',
      width: '100%',
      ':hover': {
        borderColor,
      },
      ...mergeStyles.control,
    }
  },
  valueContainer: (provided) => ({
    ...provided,
    minHeight: '38px',
    fontWeight: '500',
    padding: 0,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'var(--lighter-text-color)',
    fontWeight: '400',
    fontStyle: 'italic',
    fontSize: '14px',
  }),
  menu: (provided) => ({
    ...provided,
    boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.17)',
    borderRadius: '6px',
    overflow: 'hidden',
    width: '100%',
    zIndex: 13,
  }),
  option: (provided, state) => {
    return {
      ...provided,
      ':active': {
        backgroundColor: 'var(--form-select-hover-option-background)',
        color: 'var(--form-select-hover-option-color)',
      },
      color: state.isSelected
        ? 'var(--form-select-selected-option-color)'
        : 'var(--form-select-text-color)',
      // eslint-disable-next-line no-nested-ternary
      backgroundColor: state.isSelected
        ? 'var(--form-select-selected-option-background)'
        : state.isFocused
        ? 'var(--form-select-default-option-hover-background)'
        : 'var(--form-select-default-option-background)',
      fontSize: '14px',
    }
  },
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--form-select-text-color)',
    fontWeight: '500',
    fontSize: '14px',
  }),
  multiValue: (provided) => ({
    ...provided,
    background: 'var(--form-select-multivalue-option-background)',
    borderRadius: '100px',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'var(--form-select-multivalue-option-color)',
    fontSize: '14px',
    height: '24px',
    padding: '0',
    paddingLeft: '10px',
    lineHeight: '24px',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'var(--form-select-multivalue-option-color)',
  }),
  input: (provided) => ({
    ...provided,
    color: 'var(--primary-color)',
    fontSize: '14px',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  loadingIndicator: (provided) => ({
    ...provided,
    span: {
      backgroundColor: 'black',
    },
  }),
})

const FormSelect = ({
  formSelectAs: Component,
  inputRef,
  label,
  mergeStyles,
  disabled,
  error,
  literal,
  value,
  isMulti,
  options,
  ...props
}) =>
  literal ? (
    <LiteralValue
      label={label}
      value={isMulti ? value.map((e) => e.value).join(', ') : (value && value.value) || '-'}
    />
  ) : (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={styles.label}>
      {label && <FormLabel label={label} disabled={disabled} />}
      <Component
        options={options}
        styles={customStyles(mergeStyles, error)}
        ref={inputRef}
        isDisabled={disabled}
        getOptionLabel={(option) => {
          if (option.__isNew__) {
            return option.label
          }

          return option.value
        }}
        getOptionValue={(option) => {
          return option.id
        }}
        value={value}
        isMulti={isMulti}
        {...props}
      />
    </label>
  )

FormSelect.propTypes = {
  formSelectAs: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  label: PropTypes.string,
  inputRef: PropTypes.func,
  mergeStyles: PropTypes.oneOfType([PropTypes.any]),
  error: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.any),
  disabled: PropTypes.bool,
  literal: PropTypes.bool,
  isMulti: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.any),
    PropTypes.string,
  ]),
}

FormSelect.defaultProps = {
  label: '',
  formSelectAs: Select,
  inputRef: null,
  options: [],
  mergeStyles: { control: {} },
  disabled: false,
  error: false,
  literal: false,
  isMulti: false,
  value: null,
}

export default FormSelect
