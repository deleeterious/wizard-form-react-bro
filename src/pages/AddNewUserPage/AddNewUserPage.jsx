import React from 'react'
// css
import classes from './AddNewUserPage.module.css'
// containers
import NewUserNav from '../../containers/NewUserNav'
import NewUserAccount from '../../containers/NewUserForms/NewUserAccount'
// import NewUserProfile from '../../containers/NewUserForms/NewUserProfile'
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
      {/* <NewUserProfile /> */}
    </main>
  )
}

export default AddNewUserPage
