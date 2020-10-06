import React from 'react'

import Title from 'components/Title'

import UserList from 'containers/UserList'

const UserListPage = () => {
  return (
    <main className="container">
      <Title content="List of users" />
      <UserList />
    </main>
  )
}

export default UserListPage
