import React from 'react'
// css
import classes from './NewUserNav.module.css'
// utils
import { concatStyles } from '../../utils/utils'

const NewUserNav = () => {
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

export default NewUserNav
