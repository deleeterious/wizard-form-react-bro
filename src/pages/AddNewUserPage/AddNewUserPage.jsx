import React from 'react'
// css
import classes from './AddNewUserPage.module.css'
// containers
import NewUserAccount from '../../containers/NewUserAccount'
import NewUserNav from '../../containers/NewUserNav/NewUserNav'
// utils
import { concatStyles } from '../../utils/utils'

const AddNewUserPage = () => {
  return (
    <main className={concatStyles('container')}>
      <div className={classes.title}>
        <h2>Adding new user</h2>
      </div>
      <NewUserNav />
      <NewUserAccount />
    </main>
  )
}

export default AddNewUserPage
