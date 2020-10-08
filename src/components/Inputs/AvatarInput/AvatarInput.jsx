import React from 'react'
// prop-types
import T from 'prop-types'
// redux
import { useSelector } from 'react-redux'
// components
import AvatarImage from 'components/AvatarImage'
// assets
import { ReactComponent as AddIcon } from 'assets/icons/add.svg'
// css
import classes from './AvatarInput.module.css'

const AvatarInput = ({ refRegister }) => {
  const avatar = useSelector((state) => state.avatar)

  return (
    <div className={classes.avatarCont}>
      <AvatarImage avatar={avatar} />

      <label htmlFor="avatar" className={classes.fileLabel}>
        <input
          type="file"
          name="avatar"
          id="avatar"
          ref={refRegister}
          className={classes.fileInput}
        />
        <AddIcon className={classes.addIcon} />
        <div>add avatar</div>
      </label>
    </div>
  )
}

AvatarInput.propTypes = {
  refRegister: T.func
}

export default AvatarInput
