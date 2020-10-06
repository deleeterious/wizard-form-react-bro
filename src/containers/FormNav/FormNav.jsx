import React from 'react'
// utils
import { concatStyles } from 'utils'
// css
import classes from './FormNav.module.css'

const FormNav = () => {
  return (
    <nav className={classes.nav}>
      <div className={concatStyles(classes.navItem, classes.active)}>
        <div>1. Account</div>
      </div>
      <div className={classes.navItem}>
        <div>2. Profile</div>
      </div>
      <div className={classes.navItem}>
        <div>3. Contacts</div>
      </div>
      <div className={classes.navItem}>
        <div>4. Capabilities</div>
      </div>
    </nav>
  )
}

export default FormNav
