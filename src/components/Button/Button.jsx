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
      onClick={handleClick}
      className={concatStyles(
        classes.button,
        className,
        disabled ? classes.disabled : null
      )}
    >
      {children}
    </button>
  </div>
)

Button.propTypes = {
  children: T.string,
  className: T.string,
  handleClick: T.func,
  disabled: T.oneOfType([T.bool, T.number])
}

export default Button
