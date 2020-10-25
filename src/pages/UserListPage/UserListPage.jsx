import React, { memo, useEffect, useState } from 'react'
// react-redux
import { useDispatch, useSelector } from 'react-redux'
import { loadUsers } from 'redux/actions'
// components
import Title from 'components/Title'
import NoUsersPlaceholder from 'components/NoUsersPlaceholder'
import Spinner from 'components/Spinner'

import Pagination from 'components/Pagination'
// containers
import UserList from 'containers/UserList'
import GenerateUsersButton from 'components/GenerateUsersButton/GenerateUsersButton'

const UserListPage = () => {
  const dispatch = useDispatch()

  const { users, isFetching } = useSelector((state) => state)

  const [currentPage, setCurrentPage] = useState(1)

  const usersPerPage = 5
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = users?.slice(indexOfFirstUser, indexOfLastUser)

  useEffect(() => dispatch(loadUsers()), [dispatch])

  const onChangePage = (e, pageNumber) => {
    e.preventDefault()
    setCurrentPage(pageNumber)
  }

  if (isFetching) {
    return <Spinner />
  }

  return (
    <main className="container">
      <Title>List of users</Title>
      {users.length ? (
        <UserList users={currentUsers} />
      ) : (
        <NoUsersPlaceholder />
      )}

      <GenerateUsersButton />

      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={users.length}
        handleChangePage={onChangePage}
      />
    </main>
  )
}

export default memo(UserListPage)
