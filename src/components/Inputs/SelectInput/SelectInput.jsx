import React, { useEffect } from 'react'
// prop-types
import T from 'prop-types'
// react-hook-form
import { useFormContext } from 'react-hook-form'
// react-datepicker
import ReactSelect from 'react-select'
// css
import commonStyles from 'components/Inputs/common/styles.module.css'
import ValidationError from 'components/ValidationError'
import { skillsValidation } from 'helpers/validations'
import {
  getFromLocalStorage,
  setToLocalStorage
} from 'helpers/localStorageHelper'
import { useSelector } from 'react-redux'

const SelectInput = ({
  options,
  title,
  name,
  isMulti,
  errorMessage,
  isEdit
}) => {
  const user = useSelector((state) => state.user)

  const customStyles = {
    clearIndicator: () => ({
      display: 'none'
    }),
    dropdownIndicator: () => ({
      display: 'none'
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none'
    }),
    container: (provided) => ({
      ...provided,
      border: '1px solid #e7f0ff',
      minHeight: 40,
      fontSize: 14,
      fontWeight: 500,
      ':hover': {
        border: '1px solid #a1c4ff'
      }
    }),
    control: (provided) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none'
    }),
    placeholder: (provided) => ({
      ...provided,
      display: 'none'
    }),
    menu: (provided) => ({
      ...provided,
      border: '1px solid #e7f0ff',
      fontSize: 14,
      fontWeight: 400,
      color: '#657C9A'
    })
  }

  const { setValue, register } = useFormContext()

  useEffect(() => {
    register(
      {
        name
      },
      { required: true, validate: isMulti && skillsValidation() }
    )
  }, [])

  return (
    <div className={commonStyles.inputCont}>
      <label htmlFor={name}>
        <div className={commonStyles.inputLabel}>{title}</div>
        <ReactSelect
          defaultValue={
            isEdit ? user[name] : getFromLocalStorage('newUser')[name]
          }
          hideSelectedOptions
          options={options}
          styles={customStyles}
          isMulti={isMulti}
          onChange={(value) => {
            setValue(name, value)
            setToLocalStorage('newUser', {
              ...getFromLocalStorage('newUser'),
              [name]: value
            })
          }}
        />
      </label>
      <ValidationError errorMessage={errorMessage} />
    </div>
  )
}

SelectInput.propTypes = {
  options: T.array,
  title: T.string,
  name: T.string,
  isMulti: T.bool,
  errorMessage: T.string,
  isEdit: T.bool
}

export default SelectInput
