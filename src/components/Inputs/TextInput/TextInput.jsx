import React, { memo } from 'react'
// prop-types
import T from 'prop-types'
// component
import ValidationError from 'components/ValidationError'
// css
import commonStyles from 'components/Inputs/common/styles.module.css'
import { concatStyles } from 'utils'

const TextInput = ({
  name,
  type,
  title,
  refRegister,
  errorMessage,
  className
}) => (
  <div className={commonStyles.inputCont}>
    <label htmlFor={name}>
      <div className={commonStyles.inputLabel}>{title}</div>
      <input
        autoComplete="false"
        type={type}
        name={name}
        id={name}
        className={concatStyles(commonStyles.input, className)}
        ref={refRegister}
      />
      {errorMessage && <ValidationError errorMessage={errorMessage} />}
    </label>
  </div>
)

TextInput.propTypes = {
  name: T.string,
  type: T.string,
  title: T.string,
  refRegister: T.func,
  className: T.string,
  errorMessage: T.string
}

export default memo(TextInput)
