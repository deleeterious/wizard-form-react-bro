import React from 'react'
// prop-types
import T from 'prop-types'
// css
import classes from './Button.module.css'

const Button = ({ title, style }) => (
  <div className={classes.btnCont}>
    <button className={classes.forwardBtn} style={style}>
      {title}
    </button>
  </div>
)

Button.propTypes = {
  title: T.string,
  style: T.object
}

export default Button
