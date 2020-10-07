import React from 'react'
// components
import UserListItem from 'components/UserListItem/UserListItem'
// css
import classes from './UserList.module.css'

const UserList = ({ users }) => (
  <section>
    <div className={classes.listHeader}>
      <div className={classes.avatar} />
      <div className={classes.name}>name</div>
      <div className={classes.company}>company</div>
      <div className={classes.contacts}>contacts</div>
      <div className={classes.updates}>last updates</div>
      <div className={classes.buttons} />
    </div>
    {users.map((user) => (
      <UserListItem key={user.id} user={user} />
    ))}
  </section>
)

export default UserList
