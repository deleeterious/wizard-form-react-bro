import React from 'react'
// react-redux
import { useDispatch } from 'react-redux'
import { generateUsers } from 'redux/actions'
// utils
import { FakeUser } from 'utils'
// components
import Button from 'components/Button'
// css
import classes from './GenerateUsersButton.module.css'

const GenerateUsersButton = () => {
  const dispatch = useDispatch()

  const handleGenerateUsers = (e) => {
    e.preventDefault()
    const newUsers = Array.from({ length: 50 }, () => ({ ...new FakeUser() }))
    dispatch(generateUsers(newUsers))
  }

  return (
    <Button handleClick={handleGenerateUsers} className={classes.generateBtn}>
      Generate users
    </Button>
  )
}

export default GenerateUsersButton
