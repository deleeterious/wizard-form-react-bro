import React, { memo, useEffect } from 'react'
// react-redux
import { useDispatch, useSelector } from 'react-redux'
import { loadUsers } from 'redux/actions/users'
// components
import Title from 'components/Title'
import NoUsersPlaceholder from 'components/NoUsersPlaceholder'
import Spinner from 'components/Spinner'
// containers
import UserList from 'containers/UserList'

const UserListPage = () => {
  const dispatch = useDispatch()

  const { data, isFetching } = useSelector((state) => state.users)

  useEffect(() => dispatch(loadUsers()), [dispatch])

  if (isFetching) {
    return <Spinner />
  }

  return (
    <main className="container">
      <Title>List of users</Title>

      {data.length ? <UserList users={data} /> : <NoUsersPlaceholder />}
    </main>
  )
}

export default memo(UserListPage)
