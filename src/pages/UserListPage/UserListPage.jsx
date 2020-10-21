import React, { useEffect } from 'react'
// react-redux
import { useDispatch, useSelector } from 'react-redux'
import { loadUsers } from 'redux/actions'
// components
import Title from 'components/Title'
import NoUsersPlaceholder from 'components/NoUsersPlaceholder'
import Spinner from 'components/Spinner'
// containers
import UserList from 'containers/UserList'

const UserListPage = () => {
  const dispatch = useDispatch()

  const { users, isFetching } = useSelector((state) => state)

  useEffect(() => dispatch(loadUsers()), [])

  if (isFetching) {
    return (
      <main className="container">
        <Title>List of users</Title>
        <Spinner />
      </main>
    )
  }

  return (
    <main className="container">
      <Title>List of users</Title>
      {users.length ? <UserList users={users} /> : <NoUsersPlaceholder />}
    </main>
  )
}

export default UserListPage
