import React from 'react'
// css
import classes from './Header.module.css'
// assets
import { ReactComponent as HeaderLogo } from './assets/logo/header-logo.svg'
import { ReactComponent as NewUserIcon } from './assets/icons/new-user.svg'
import { ReactComponent as ListUsersIcon } from './assets/icons/list-users.svg'

// components
import HeaderButton from '../../components/HeaderButton'
// utils
import { concatStyles } from '../../utils/utils'

const Header = () => {
  return (
    <header className={concatStyles('container', classes.header)}>
      <div className={classes.logo}>
        <HeaderLogo />
      </div>
      <div className={classes.buttons}>
        <HeaderButton icon={<NewUserIcon />} text="Add new user" />
        <HeaderButton icon={<ListUsersIcon />} text="List of users" />
      </div>
    </header>
  )
}

export default Header
