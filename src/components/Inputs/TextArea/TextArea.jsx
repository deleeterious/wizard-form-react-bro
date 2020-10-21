import React, { memo } from 'react'
// prop-types
import T from 'prop-types'
// components
import ValidationError from 'components/ValidationError'
// css
import commonClasses from 'components/Inputs/common/styles.module.css'
import classes from './TextArea.module.css'

const TextArea = ({ refRegister, name, title, errorMessage }) => {
  return (
    <div className={commonClasses.inputCont}>
      <label htmlFor={name}>
        <div className={commonClasses.inputLabel}>{title}</div>
        <textarea ref={refRegister} name={name} className={classes.textarea} />
        {errorMessage && <ValidationError errorMessage={errorMessage} />}
      </label>
    </div>
  )
}

TextArea.propTypes = {
  refRegister: T.func,
  name: T.string,
  title: T.string,
  errorMessage: T.string
}

export default memo(TextArea)
