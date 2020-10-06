import React from 'react'
// react-redux
import { useSelector } from 'react-redux'
// prop-types
import PropTypes from 'prop-types'
// components
import UserListItem from 'components/UserListItem/UserListItem'
// css
import classes from './UserList.module.css'

const UserList = () => {
  const users = useSelector((state) => state.users)
  console.log(users)
  return (
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
}

UserList.propTypes = {
  users: PropTypes.array
}

export default UserList
