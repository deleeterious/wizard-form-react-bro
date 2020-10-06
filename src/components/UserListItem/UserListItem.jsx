import React from 'react'
// router
import { Link } from 'react-router-dom'
// prop-types
import PropTypes from 'prop-types'
// icons
import { ReactComponent as EditIcon } from 'assets/icons/edit.svg'
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg'
// css
import classes from './UserListItem.module.css'

const UserListItem = ({ user }) => {
  const { userName, firstName, lastName, company, email, id } = user
  return (
    <div className={classes.listItem}>
      <div className={classes.avatar} />
      <div className={classes.name}>
        <div className={classes.fullName}>
          {firstName}
          {lastName}
        </div>
        <div className={classes.userName}>{userName}</div>
      </div>
      <div className={classes.company}>{company}</div>
      <div className={classes.contacts}>{email}</div>
      <div className={classes.updates}>last updates</div>
      <div className={classes.buttons}>
        <Link to={`/profile/${id}`}>
          <EditIcon />
        </Link>
        <div className={classes.deleteBtn}>
          <DeleteIcon />
        </div>
      </div>
    </div>
  )
}

UserListItem.propTypes = {
  user: PropTypes.shape({
    userName: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    company: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number
  })
}

export default UserListItem
