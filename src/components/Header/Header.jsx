import React from 'react'
// prop-types
import T from 'prop-types'
// redux
import { useDispatch } from 'react-redux'
import { changeActiveFormStage, clearNewUser } from 'redux/actions'
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

const Header = ({ location: { pathname } }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(clearNewUser())
    dispatch(changeActiveFormStage(1))
  }

  return (
    <header className={concatStyles('container', classes.header)}>
      <div className={classes.logo}>
        <Link onClick={handleClick} to="/">
          <HeaderLogo />
        </Link>
      </div>
      <div className={classes.links}>
        <LinkIcon
          text="Add new user"
          icon={<NewUserIcon />}
          to="/new-user"
          onClick={handleClick}
          isActive={pathname === '/new-user'}
        />

        <LinkIcon
          text="List of users"
          icon={<ListUsersIcon />}
          to="/"
          onClick={handleClick}
          isActive={pathname === '/'}
        />
      </div>
    </header>
  )
}

Header.propTypes = {
  location: T.shape({
    pathname: T.string
  })
}

export default Header
