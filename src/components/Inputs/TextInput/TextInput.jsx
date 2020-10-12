import React from 'react'
// prop-types
import T from 'prop-types'
// component
import ValidationError from 'components/ValidationError'
// css
import commonStyles from 'components/Inputs/common/styles.module.css'

const TextInput = ({ name, type, title, refRegister, errorMessage }) => {
  return (
    <div className={commonStyles.inputCont}>
      <label htmlFor={name}>
        <div className={commonStyles.inputLabel}>{title}</div>
        <input
          type={type}
          name={name}
          id={name}
          className={commonStyles.input}
          ref={refRegister}
        />
        {errorMessage && <ValidationError errorMessage={errorMessage} />}
      </label>
    </div>
  )
}

TextInput.propTypes = {
  name: T.string,
  type: T.string,
  title: T.string,
  refRegister: T.func,
  errorMessage: T.string
}

export default TextInput
