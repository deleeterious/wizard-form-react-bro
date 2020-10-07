import React from 'react'
// router
import { Link } from 'react-router-dom'
// prop-types
import PropTypes from 'prop-types'
// css
import classes from './LinkIcon.module.css'

const LinkIcon = ({ icon, text, to }) => (
  <Link className={classes.button} to={to}>
    <div className={classes.icon}>{icon}</div>
    <div className={classes.text}>{text}</div>
  </Link>
)

LinkIcon.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string,
  to: PropTypes.string
}

export default LinkIcon
