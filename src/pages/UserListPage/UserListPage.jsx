import React, { memo, useEffect } from 'react'
// react-redux
import { useDispatch, useSelector } from 'react-redux'
import { generateUsers, loadUsers } from 'redux/actions'
// utils
import { FakeUser } from 'utils'
// components
import Title from 'components/Title'
import NoUsersPlaceholder from 'components/NoUsersPlaceholder'
import Spinner from 'components/Spinner'
// containers
import UserList from 'containers/UserList'
import Button from 'components/Button'
// css
import classes from './UserListPage.module.css'

const UserListPage = () => {
  const dispatch = useDispatch()

  const { users, isFetching } = useSelector((state) => state)

  const handleGenerateUsers = (e) => {
    e.preventDefault()
    const newUsers = Array.from({ length: 50 }, () => ({ ...new FakeUser() }))
    dispatch(generateUsers(newUsers))
  }

  useEffect(() => dispatch(loadUsers()), [dispatch])

  if (isFetching) {
    return <Spinner />
  }

  return (
    <main className="container">
      <Title>List of users</Title>
      {users.length ? <UserList users={users} /> : <NoUsersPlaceholder />}
      <Button handleClick={handleGenerateUsers} className={classes.generateBtn}>
        Generate users
      </Button>
    </main>
  )
}

export default memo(UserListPage)
