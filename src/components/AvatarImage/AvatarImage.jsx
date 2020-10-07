import React from 'react'
// assets
import { ReactComponent as AvatarIcon } from 'assets/icons/avatar.svg'
// css
import classes from './AvatarImage.module.css'

const AvatarImage = ({ avatar, width = 170, height = 170 }) => {
  return (
    <div className={classes.avatarIconCont} style={{ width, height }}>
      {avatar ? (
        <img alt="avatar" src={avatar} className={classes.avatarIcon} />
      ) : (
        <AvatarIcon className={classes.avatarIcon} />
      )}
    </div>
  )
}

export default AvatarImage
