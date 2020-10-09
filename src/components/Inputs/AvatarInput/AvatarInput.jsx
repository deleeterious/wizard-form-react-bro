import React from 'react'
// prop-types
import T from 'prop-types'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { loadAvatar } from 'redux/actions'
// components
import AvatarImage from 'components/AvatarImage'
// assets
import { ReactComponent as AddIcon } from 'assets/icons/add.svg'
// css
import classes from './AvatarInput.module.css'

const AvatarInput = ({ refRegister }) => {
  const dispatch = useDispatch()
  const avatar = useSelector((state) => state.avatar)

  const handleLoadLocalFile = (event) => {
    const reader = new FileReader()
    const file = event.target.files[0]
    reader.onloadend = () => dispatch(loadAvatar(reader.result))
    reader.readAsDataURL(file)
  }

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
          onChange={handleLoadLocalFile}
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
