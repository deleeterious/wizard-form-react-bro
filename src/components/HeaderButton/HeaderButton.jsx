import React from 'react'
// prop-types
import PropTypes from 'prop-types'
// css
import classes from './HeaderButton.module.css'

const HeaderButton = ({ icon, text }) => {
  return (
    <div className={classes.button}>
      <div className={classes.icon}>{icon}</div>
      <div className={classes.text}>{text}</div>
    </div>
  )
}

HeaderButton.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string
}

export default HeaderButton
