import React from 'react'
// utils
import { concatStyles } from 'utils'
// assets
import { ReactComponent as HeaderLogo } from 'assets/icons/header-logo.svg'
import { ReactComponent as NewUserIcon } from 'assets/icons/new-user.svg'
import { ReactComponent as ListUsersIcon } from 'assets/icons/list-users.svg'
// components
import LinkIcon from 'components/LinkIcon'
// router
import { Link } from 'react-router-dom'
// css
import classes from './Header.module.css'
import { useDispatch } from 'react-redux'
import { changeActiveFormStage } from 'redux/actions'

const Header = () => {
  const dispatch = useDispatch()
  const handleClick = () => dispatch(changeActiveFormStage(1))

  return (
    <header className={concatStyles('container', classes.header)}>
      <div className={classes.logo}>
        <Link to="/">
          <HeaderLogo />
        </Link>
      </div>
      <div className={classes.buttons}>
        <LinkIcon
          onClick={handleClick}
          to="/new-user"
          icon={<NewUserIcon />}
          text="Add new user"
        />

        <LinkIcon to="/" icon={<ListUsersIcon />} text="List of users" />
      </div>
    </header>
  )
}

export default Header
