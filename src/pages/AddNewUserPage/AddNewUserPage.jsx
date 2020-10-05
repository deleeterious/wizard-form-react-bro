import React from 'react'
// css
import classes from './AddNewUserPage.module.css'
// containers
import NewUserNav from '../../containers/NewUserNav'
import NewUserAccount from '../../containers/NewUserForms/NewUserAccount'
import NewUserProfile from '../../containers/NewUserForms/NewUserProfile'
import NewUserContacts from '../../containers/NewUserForms/NewUserContacts'
import CapabilitiesForm from '../../containers/NewUserForms/CapabilitiesForm/CapabilitiesForm'

const AddNewUserPage = () => {
  return (
    <main className="container">
      <div className={classes.title}>
        <h2>Adding new user</h2>
      </div>
      <NewUserNav />
      {/* <NewUserAccount /> */}
      {/* <NewUserProfile /> */}
      {/* <NewUserContacts /> */}
      <CapabilitiesForm />
    </main>
  )
}

export default AddNewUserPage
