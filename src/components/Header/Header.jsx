import React, { memo } from 'react'
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

const Header = () => (
  <header className={concatStyles('container', classes.header)}>
    <div className={classes.logo}>
      <Link to="/">
        <HeaderLogo />
      </Link>
    </div>
    <div className={classes.links}>
      <LinkIcon
        text="Add new user"
        icon={<NewUserIcon />}
        to="/new-user/account"
      />

      <LinkIcon text="List of users" icon={<ListUsersIcon />} to="/" />
    </div>
  </header>
)

export default memo(Header)
