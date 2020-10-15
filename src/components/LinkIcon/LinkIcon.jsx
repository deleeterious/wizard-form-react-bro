import React from 'react'
// router
import { NavLink } from 'react-router-dom'
// prop-types
import T from 'prop-types'
// css
import classes from './LinkIcon.module.css'

const LinkIcon = ({ icon, text, to }) => (
  <NavLink
    exact
    className={classes.links}
    to={to}
    activeClassName={classes.active}
  >
    <div className={classes.icon}>{icon}</div>
    <div className={classes.text}>{text}</div>
  </NavLink>
)

LinkIcon.propTypes = {
  icon: T.element,
  text: T.string,
  to: T.string
}

export default LinkIcon
