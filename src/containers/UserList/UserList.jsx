import React from 'react'
// prop-types
import PropTypes from 'prop-types'
// css
import classes from './UserList.module.css'

const UserList = ({ users }) => {
  return (
    <section>
      <div className={classes.listHeader}>header</div>
      {users.map((user) => (
        <h1>{user.userName}</h1>
      ))}
    </section>
  )
}

UserList.propTypes = {
  users: PropTypes.array
}

export default UserList
