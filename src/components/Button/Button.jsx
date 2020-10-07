import React from 'react'
// css
import classes from './Button.module.css'

const Button = () => (
  <div className={classes.btnCont}>
    <input type="submit" value="Forward" className={classes.forwardBtn} />
  </div>
)

export default Button
