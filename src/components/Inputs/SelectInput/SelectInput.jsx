import React from 'react'
// prop-types
import T from 'prop-types'
// react-hook-form
import { Controller } from 'react-hook-form'
// react-datepicker
import ReactSelect from 'react-select'
// css
import commonStyles from 'components/Inputs/common/styles.module.css'

const SelectInput = ({ control, options, title, name, isMulti }) => {
  const customStyles = {
    clearIndicator: () => ({
      display: 'none'
    }),
    dropdownIndicator: () => ({
      display: 'none'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    container: (provided) => ({
      ...provided,
      border: '1px solid #e7f0ff',
      minHeight: 40,
      fontSize: 14,
      fontWeight: 500
    }),
    control: (provided) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none'
    }),
    placeholder: () => ({
      display: 'none'
    }),
    menu: () => ({
      border: '1px solid #e7f0ff',
      fontSize: 14,
      fontWeight: 400,
      color: '#657C9A'
    })
  }

  return (
    <div className={commonStyles.inputCont}>
      <label htmlFor={name}>
        <div className={commonStyles.inputLabel}>{title}</div>
        <Controller
          name={name}
          isMulti={isMulti}
          control={control}
          options={options}
          styles={customStyles}
          as={ReactSelect}
        />
      </label>
    </div>
  )
}

SelectInput.propTypes = {
  control: T.object,
  options: T.array,
  title: T.string,
  name: T.string,
  isMulti: T.bool
}

export default SelectInput
