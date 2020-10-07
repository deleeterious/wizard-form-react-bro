import React from 'react'
// prop-types
import PropTypes from 'prop-types'
// react-hook-form
import { Controller } from 'react-hook-form'
// react-datepicker
import ReactSelect from 'react-select'
// constants
import { languages } from 'constants.js'
// css
import classes from 'components/TextInput/TextInput.module.css'

const SelectInput = ({ control }) => {
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
    <div className={classes.inputCont}>
      <label htmlFor="language">
        <div className={classes.inputLabel}>Main language</div>
        <Controller
          name="language"
          control={control}
          options={languages}
          styles={customStyles}
          as={ReactSelect}
        />
      </label>
    </div>
  )
}

SelectInput.propTypes = {
  control: PropTypes.object
}

export default SelectInput
