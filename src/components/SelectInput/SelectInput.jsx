import React from 'react'
// prop-types
import PropTypes from 'prop-types'
// react-hook-form
import { Controller } from 'react-hook-form'
// react-datepicker
import ReactSelect from 'react-select'
// css
import classes from '../WrappedInput/WrappedInput.module.css'

const options = [
  { value: 'en', label: 'English' },
  { value: 'en', label: 'French' },
  { value: 'es', label: 'Spanish' },
  { value: 'ar', label: 'Arabic' },
  { value: 'cmn', label: 'Mandarin' },
  { value: 'ru', label: 'Russian' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'de', label: 'German' },
  { value: 'ja', label: 'Japanese' },
  { value: 'hi', label: 'Hindi' },
  { value: 'ms', label: 'Malay' },
  { value: 'fa', label: 'Persian' },
  { value: 'sw', label: 'Swahili' },
  { value: 'ta', label: 'Tamil' },
  { value: 'it', label: 'Italian' },
  { value: 'nl', label: 'Dutch' },
  { value: 'bn', label: 'Bengali' },
  { value: 'tr', label: 'Turkish' },
  { value: 'vi', label: 'Vietnamese' },
  { value: 'pl', label: 'Polish' },
  { value: 'jv', label: 'Javanese' },
  { value: 'pa', label: 'Punjabi' },
  { value: 'th', label: 'Thai' },
  { value: 'ko', label: 'Korean' }
]

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
          options={options}
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
