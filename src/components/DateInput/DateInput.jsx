import React from 'react'
// prop-types
import PropTypes from 'prop-types'
// react-hook-form
import { Controller } from 'react-hook-form'
// react-datepicker
import DatePicker from 'react-datepicker'

import classes from '../TextInput/TextInput.module.css'

const DateInput = ({ control }) => {
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

DateInput.propTypes = {
  control: PropTypes.object
}

export default DateInput
