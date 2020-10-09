import React from 'react'
// prop-types
import T from 'prop-types'
// react-hook-form
import { Controller } from 'react-hook-form'
// react-datepicker
import ReactInputMask from 'react-input-mask'
// css
import commonStyles from 'components/Inputs/common/styles.module.css'
import ValidationError from 'components/ValidationError'

const MaskInput = ({
  control,
  name,
  placeholder,
  mask,
  errors,
  rules,
  title
}) => {
  console.log(errors, name)
  return (
    <div className={commonStyles.inputCont}>
      <label htmlFor={name}>
        <div className={commonStyles.inputLabel}>{title}</div>
        <Controller
          as={ReactInputMask}
          name={name}
          defaultValue=""
          placeholder={placeholder}
          className={commonStyles.input}
          mask={mask}
          control={control}
          rules={rules}
        />
      </label>
      <ValidationError errors={errors} name={name} />
    </div>
  )
}

MaskInput.propTypes = {
  control: T.object
}

export default MaskInput
