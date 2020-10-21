import React, { memo, useEffect } from 'react'
// prop-types
import T from 'prop-types'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from 'redux/actions'
// components
import Title from 'components/Title'
import UserInfo from 'components/UserInfo'
import Spinner from 'components/Spinner'

const ProfilePage = ({ match }) => {
  const dispatch = useDispatch()

  const { user, isFetching } = useSelector((state) => state)

  useEffect(() => {
    dispatch(getUser(match.params.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="container">
      <Title linkBackPath="/" linkBackTitle="Users List">
        {user.userName}
      </Title>
      {isFetching ? <Spinner /> : <UserInfo user={user} />}
    </main>
  )
}

ProfilePage.propTypes = {
  match: T.object
}

export default memo(ProfilePage)
