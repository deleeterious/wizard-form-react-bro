import React from 'react'
// prop-types
import T from 'prop-types'
// react-hook-form
import { Controller } from 'react-hook-form'
// react-datepicker
import ReactInputMask from 'react-input-mask'
// css
import commonStyles from 'components/Inputs/common/styles.module.css'

const PhoneInput = ({ control }) => (
  <div className={commonStyles.inputCont}>
    <label htmlFor="phone">
      <div className={commonStyles.inputLabel}>Phone#1</div>
      <Controller
        as={ReactInputMask}
        name="phone"
        defaultValue=""
        placeholder="+38 099 999 99"
        className={commonStyles.input}
        mask="+38 (999) 999 99 99"
        control={control}
      />
    </label>
  </div>
)

PhoneInput.propTypes = {
  control: T.object
}

export default PhoneInput
