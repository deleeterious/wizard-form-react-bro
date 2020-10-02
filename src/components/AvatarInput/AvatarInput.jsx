import React from 'react'
// css
import classes from './AvatarInput.module.css'
// assets
import { ReactComponent as AvatarIcon } from '../../assets/icons/avatar.svg'
import { ReactComponent as AddIcon } from '../../assets/icons/add.svg'

const AvatarInput = () => {
  return (
    <div className={classes.avatarCont}>
      <div className={classes.avatarIconCont}>
        <AvatarIcon className={classes.avatarIcon} />
      </div>

      <label htmlFor="avatar" className={classes.fileLabel}>
        <input
          type="file"
          name="avatar"
          id="avatar"
          className={classes.fileInput}
        />
        <AddIcon className={classes.addIcon} />
        <div>add avatar</div>
      </label>
    </div>
  )
}

export default AvatarInput
