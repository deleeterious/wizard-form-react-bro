import React, { useState } from 'react'
// redux
import { useDispatch } from 'react-redux'
import { deleteUser } from 'redux/actions'
// router
import { Link } from 'react-router-dom'
// prop-types
import T from 'prop-types'
// icons
import { ReactComponent as EditIcon } from 'assets/icons/edit.svg'
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg'
// utils
import { concatStyles } from 'utils'
// css
import classes from './UserListItem.module.css'

const UserListItem = ({ user }) => {
  const dispatch = useDispatch()
  const { userName, firstName, lastName, company, email, id } = user
  const [isDeleting, setIsDeleting] = useState(false)

  function handleOutSideClick(e) {
    const domNode = document.getElementById('deleteBtn')

    if (!e.path.includes(domNode)) {
      setIsDeleting(false)
      document.removeEventListener('click', handleOutSideClick)
    }
  }

  const handleSetDeleting = () => {
    setIsDeleting(true)
    document.addEventListener('click', handleOutSideClick)
  }

  const handleDelete = () => dispatch(deleteUser(id))

  return (
    <div
      className={concatStyles(
        classes.listItem,
        isDeleting ? classes.confirmedListItem : null
      )}
    >
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
        {!isDeleting ? (
          <button onClick={handleSetDeleting} className={classes.deleteBtn}>
            <DeleteIcon />
          </button>
        ) : (
          <button
            className={concatStyles(
              classes.deleteBtn,
              classes.confirmedDeleteBtn
            )}
            id="deleteBtn"
            onClick={handleDelete}
          >
            <DeleteIcon className={classes.deleteIcon} />
            <div>delete</div>
          </button>
        )}
      </div>
    </div>
  )
}

UserListItem.propTypes = {
  user: T.shape({
    userName: T.string,
    firstName: T.string,
    lastName: T.string,
    company: T.string,
    email: T.string,
    id: T.number
  })
}

export default UserListItem
