import React, { useEffect } from 'react'
// prop-types
import PropTypes from 'prop-types'
// components
import Title from 'components/Title'
import UserInfo from 'components/UserInfo/UserInfo'
// import db from 'db'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from 'redux/actions'

const ProfilePage = ({ match }) => {
  // BD request
  // const [user, setUser] = useState({})

  // useEffect(() => {
  //   db.table('users')
  //     .get(+match.params.id)
  //     .then((data) => {
  //       setUser(data)
  //     })
  // }, [])

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getUser(match.params.id))
  }, [])

  return (
    <main className="container">
      <Title content={user.userName} />
      <UserInfo user={user} />
    </main>
  )
}

ProfilePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
}

export default ProfilePage
