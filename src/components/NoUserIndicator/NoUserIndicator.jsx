import React from 'react'
import { Link } from 'react-router-dom'
// css
import classes from './NoUserIndicator.module.css'

const NoUserIndicator = () => {
  return (
    <div className={classes.indicatorCont}>
      <h2 className={classes.indicatorTitle}>No users here :(</h2>
      <div className={classes.newUserBtn}>
        <Link className={classes.link} to="/new-user">
          Create new user
        </Link>
      </div>
    </div>
  )
}

export default NoUserIndicator
