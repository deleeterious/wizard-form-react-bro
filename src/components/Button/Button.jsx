import React from 'react'
// prop-types
import T from 'prop-types'
// utils
import { concatStyles } from 'utils'
// css
import classes from './Button.module.css'

const Button = ({ children, className, handleClick, disabled }) => (
  <div className={classes.btnCont}>
    <button
      // disabled={disabled}
      onClick={handleClick}
      className={concatStyles(classes.button, className)}
    >
      {children}
    </button>
  </div>
)

Button.propTypes = {
  children: T.string,
  className: T.string,
  onClick: T.func,
  disabled: T.bool
}

export default Button
