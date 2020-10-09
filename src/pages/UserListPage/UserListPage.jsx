import React from 'react'
// react-redux
import { useSelector } from 'react-redux'
// components
import Title from 'components/Title'
import NoUserIndicator from 'components/NoUserIndicator'
// containers
import UserList from 'containers/UserList'
import ContactsForm from 'containers/Forms/ContactsForm/ContactsForm'

const UserListPage = () => {
  const users = useSelector((state) => state.users)

  return (
    <main className="container">
      <Title content="List of users" />
      {users.length ? <UserList users={users} /> : <ContactsForm />}
    </main>
  )
}

export default UserListPage
