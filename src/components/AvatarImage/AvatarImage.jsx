import React from 'react'
// prop-types
import T from 'prop-types'
// assets
import { ReactComponent as AvatarIcon } from 'assets/icons/avatar.svg'
// css
import classes from './AvatarImage.module.css'

const AvatarImage = ({ avatar, size = { width: 170, height: 170 } }) => {
  return (
    <div
      className={classes.avatarIconCont}
      style={{ width: size.width, height: size.height }}
    >
      {avatar ? (
        <img
          alt="avatar"
          src={avatar}
          className={classes.avatarIcon}
          height={size.height}
        />
      ) : (
        <AvatarIcon className={classes.avatarIcon} />
      )}
    </div>
  )
}

AvatarImage.propTypes = {
  avatar: T.any,
  size: T.object
}

export default AvatarImage
