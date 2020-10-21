import React, { memo } from 'react'
import { Link } from 'react-router-dom'
// css
import classes from './NoUsersPlaceholder.module.css'

const NoUsersPlaceholder = () => (
  <div className={classes.indicatorCont}>
    <h2 className={classes.indicatorTitle}>No users here :(</h2>
    <div className={classes.newUserBtn}>
      <Link className={classes.link} to="/new-user">
        Create new user
      </Link>
    </div>
  </div>
)

export default memo(NoUsersPlaceholder)
