import React from 'react'
// react-redux
import { useSelector } from 'react-redux'

import Title from 'components/Title/Title'

import UserList from 'containers/UserList/UserList'

const UserListPage = () => {
  const users = useSelector((state) => state.users)
  return (
    <main className="container">
      <Title content="List of users" />
      <UserList users={users} />
    </main>
  )
}

export default UserListPage
