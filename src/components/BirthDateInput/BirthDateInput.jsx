import React from 'react'
// prop-types
import PropTypes from 'prop-types'
// react-hook-form
import { Controller } from 'react-hook-form'
// react-datepicker
import DatePicker from 'react-datepicker'

import classes from '../WrappedInput/WrappedInput.module.css'

const BirthDateInput = ({ control }) => {
  return (
    <div className={classes.inputCont}>
      <label htmlFor="birthDate">
        <div className={classes.inputLabel}>Birth date</div>
        <Controller
          control={control}
          name="birthDate"
          render={({ onChange, value }) => (
            <DatePicker
              className={classes.input}
              onChange={onChange}
              selected={value}
            />
          )}
        />
      </label>
    </div>
  )
}

BirthDateInput.propTypes = {
  control: PropTypes.object
}

export default BirthDateInput
