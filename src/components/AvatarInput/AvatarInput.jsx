import React from 'react'
// css
import classes from './AvatarInput.module.css'
// assets
import { ReactComponent as AvatarIcon } from '../../assets/icons/avatar.svg'
import { ReactComponent as AddIcon } from '../../assets/icons/add.svg'
import { useDispatch, useSelector } from 'react-redux'
import { loadAvatar } from 'redux/actions'

const AvatarInput = ({ refRegister }) => {
  const dispatch = useDispatch()
  const avatar = useSelector((state) => state.avatar)
  console.log(avatar)

  return (
    <div className={classes.avatarCont}>
      <div className={classes.avatarIconCont}>
        {avatar ? (
          <img alt="avatar" src={avatar} className={classes.avatarIcon} />
        ) : (
          <AvatarIcon className={classes.avatarIcon} />
        )}
      </div>

      <label htmlFor="avatar" className={classes.fileLabel}>
        <input
          type="file"
          name="avatar"
          id="avatar"
          ref={refRegister}
          onChange={(e) => {
            e.preventDefault()
            const file = e.target.files[0]
            const localImageUrl = window.URL.createObjectURL(file)
            dispatch(loadAvatar(localImageUrl))
          }}
          className={classes.fileInput}
        />
        <AddIcon className={classes.addIcon} />
        <div>add avatar</div>
      </label>
    </div>
  )
}

export default AvatarInput
