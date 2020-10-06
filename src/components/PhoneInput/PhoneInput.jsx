import React from 'react'
// prop-types
import PropTypes from 'prop-types'
// react-hook-form
import { Controller } from 'react-hook-form'
// react-datepicker
import ReactInputMask from 'react-input-mask'
// css
import classes from '../TextInput/TextInput.module.css'

const PhoneInput = ({ control }) => {
  return (
    <div className={classes.inputCont}>
      <label htmlFor="phone">
        <div className={classes.inputLabel}>Phone#1</div>
        <Controller
          as={ReactInputMask}
          name="phone"
          defaultValue=""
          placeholder="+38 099 999 99"
          className={classes.input}
          mask="+38 (999) 999 99 99"
          control={control}
        />
      </label>
    </div>
  )
}

PhoneInput.propTypes = {
  control: PropTypes.object
}

export default PhoneInput
