import React, { memo } from 'react'
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
  value,
  control,
  name,
  placeholder,
  mask,
  errorMessage,
  rules,
  title
}) => {
  return (
    <div className={commonStyles.inputCont}>
      <label htmlFor={name}>
        <div className={commonStyles.inputLabel}>{title}</div>
        <Controller
          as={ReactInputMask}
          name={name}
          defaultValue={value}
          placeholder={placeholder}
          className={commonStyles.input}
          mask={mask}
          control={control}
          rules={rules}
        />
      </label>
      <ValidationError errorMessage={errorMessage} />
    </div>
  )
}

MaskInput.propTypes = {
  value: T.string,
  control: T.object,
  name: T.string,
  placeholder: T.string,
  mask: T.string,
  errorMessage: T.string,
  rules: T.object,
  title: T.string
}

export default memo(MaskInput)
