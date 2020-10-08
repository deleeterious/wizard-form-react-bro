import React from 'react'
// prop-types
import T from 'prop-types'
// css
import commonClasses from 'components/Inputs/common/styles.module.css'
import classes from './TextareaInput.module.css'

const TextareaInput = ({ refRegister, name, title }) => {
  return (
    <div className={commonClasses.inputCont}>
      <label htmlFor={name}>
        <div className={commonClasses.inputLabel}>{title}</div>
        <textarea ref={refRegister} name={name} className={classes.textarea} />
      </label>
    </div>
  )
}

TextareaInput.propTypes = {
  refRegister: T.func,
  name: T.string,
  title: T.string
}

export default TextareaInput
