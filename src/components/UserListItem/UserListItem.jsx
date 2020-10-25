import React, { useCallback, useEffect, useMemo, useState } from 'react'
// redux
import { useDispatch } from 'react-redux'
import { deleteUser } from 'redux/actions'
// router
import { Link } from 'react-router-dom'
// prop-types
import T from 'prop-types'
// components
import AvatarImage from 'components/AvatarImage'
// icons
import { ReactComponent as EditIcon } from 'assets/icons/edit.svg'
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg'
// utils
import { concatStyles, formatToRelativeTime } from 'utils'
// css
import classes from './UserListItem.module.css'

const UserListItem = ({ user }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const dispatch = useDispatch()

  const {
    userName,
    firstName,
    lastName,
    company,
    email,
    id,
    avatarData,
    lastUpdate
  } = user

  const handleOutSideClick = useCallback((e) => {
    const domNode = document.getElementById('deleteBtn')

    if (!e.path.includes(domNode)) {
      document.removeEventListener('click', handleOutSideClick)
      setIsDeleting(false)
    }
  }, [])

  const handleSetDeleting = () => {
    setIsDeleting(true)
    document.addEventListener('click', handleOutSideClick)
  }

  const handleDelete = () => {
    dispatch(deleteUser(id))
  }

  useEffect(
    () => () => document.removeEventListener('click', handleOutSideClick),
    [handleOutSideClick]
  )

  return (
    <div
      className={concatStyles(
        classes.listItem,
        isDeleting ? classes.confirmedListItem : null
      )}
    >
      <div className={classes.avatar}>
        <AvatarImage avatar={avatarData} size={{ width: 40, height: 40 }} />
      </div>
      <div className={classes.name}>
        <div className={classes.fullName}>{`${firstName} ${lastName}`}</div>
        <div className={classes.userName}>{userName}</div>
      </div>
      <div className={classes.company}>{company}</div>
      <div className={classes.contacts}>{email}</div>
      <div className={classes.updates}>
        {useMemo(() => formatToRelativeTime(lastUpdate), [lastUpdate])}
      </div>
      <div className={classes.buttons}>
        <Link to={`/profile/${id}`} className={classes.editIcon}>
          <EditIcon />
        </Link>
        {!isDeleting ? (
          <button onClick={handleSetDeleting} className={classes.deleteBtn}>
            <DeleteIcon />
          </button>
        ) : (
          <button
            className={classes.confirmedDeleteBtn}
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
    id: T.number,
    lastUpdate: T.object,
    avatarData: T.string
  })
}

export default UserListItem
