import React from 'react'
// router
import { Link } from 'react-router-dom'
// prop-types
import T from 'prop-types'
// utils
import { concatStyles } from 'utils'
// css
import classes from './LinkIcon.module.css'

const LinkIcon = ({ icon, text, to, onClick, isActive }) => (
  <Link
    onClick={onClick}
    className={concatStyles(classes.links, isActive && classes.active)}
    to={to}
  >
    <div className={classes.icon}>{icon}</div>
    <div className={classes.text}>{text}</div>
  </Link>
)

LinkIcon.propTypes = {
  icon: T.element,
  text: T.string,
  to: T.string,
  onClick: T.func,
  isActive: T.bool
}

export default LinkIcon
