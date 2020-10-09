import React from 'react'
// prop-types
import T from 'prop-types'
// utils
import { concatStyles } from 'utils'
// css
import classes from './Button.module.css'

const Button = ({ children, className }) => (
  <div className={classes.btnCont}>
    <button className={concatStyles(classes.forwardBtn, className)}>
      {children}
    </button>
  </div>
)

Button.propTypes = {
  children: T.string,
  className: T.string
}

export default Button
