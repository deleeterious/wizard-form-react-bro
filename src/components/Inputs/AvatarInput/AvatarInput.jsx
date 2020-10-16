import React, { useEffect } from 'react'
// prop-types
import T from 'prop-types'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { setAvatar } from 'redux/actions'
// assets
import { ReactComponent as AddIcon } from 'assets/icons/add.svg'
// helpers
import { setToLocalStorage } from 'helpers/localStorageHelper'
// components
import AvatarImage from 'components/AvatarImage'
import ValidationError from 'components/ValidationError'

// css
import classes from './AvatarInput.module.css'

const AvatarInput = ({ refRegister, errorMessage }) => {
  const dispatch = useDispatch()
  const avatar = useSelector((state) => state.avatar)

  const handleLoadLocalFile = (event) => {
    event.preventDefault()
    const reader = new FileReader()
    const file = event.target.files[0]
    reader.onloadend = () => {
      setToLocalStorage('avatar', reader.result)
      dispatch(setAvatar(reader.result))
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className={classes.avatarCont}>
      <AvatarImage avatar={avatar} />

      <label htmlFor="avatar" className={classes.fileLabel}>
        <input
          value=""
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
      <ValidationError errorMessage={errorMessage} />
    </div>
  )
}

AvatarInput.propTypes = {
  refRegister: T.func,
  errorMessage: T.string
}

export default AvatarInput
