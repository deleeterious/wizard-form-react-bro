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
import Search from 'components/Inputs/Search/Search'

const UserListPage = () => {
  const dispatch = useDispatch()

  const { users, isFetching } = useSelector((state) => state)

  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')

  const usersPerPage = 5
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = users?.slice(indexOfFirstUser, indexOfLastUser)

  const foundUsers = users?.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .trim()
      .toLowerCase()
      .includes(searchValue.trim().toLowerCase())
  )

  const onChangePage = (e, pageNumber) => {
    e.preventDefault()
    setCurrentPage(pageNumber)
  }

  const onSearch = (e) => setSearchValue(e.target.value)

  useEffect(() => dispatch(loadUsers()), [dispatch])

  if (isFetching) {
    return <Spinner />
  }

  return (
    <main className="container">
      <Title>List of users</Title>
      {users.length ? (
        <>
          <Search handleSearch={onSearch} />
          <UserList users={searchValue ? foundUsers : currentUsers} />
        </>
      ) : (
        <NoUsersPlaceholder />
      )}

      <GenerateUsersButton />

      {!searchValue.length ? (
        <Pagination
          currentPage={currentPage}
          usersPerPage={usersPerPage}
          totalUsers={users.length}
          handleChangePage={onChangePage}
        />
      ) : null}
    </main>
  )
}

export default memo(UserListPage)
