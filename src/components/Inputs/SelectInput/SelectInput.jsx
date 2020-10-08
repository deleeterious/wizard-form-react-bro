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
    control: (provided) => ({
      ...provided,
      width: '100%',
      height: '40px',
      border: '1px solid #e7f0ff',
      outline: 'none',
      paddingLeft: '10px'
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: 'none'
    }),
    indicatorSeparator: () => ({
      display: 'none'
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
