import React, { useEffect } from 'react'
// prop-types
import T from 'prop-types'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { loadAvatar } from 'redux/actions'
// components
import AvatarImage from 'components/AvatarImage'
import ValidationError from 'components/ValidationError'
// assets
import { ReactComponent as AddIcon } from 'assets/icons/add.svg'
// css
import classes from './AvatarInput.module.css'

const AvatarInput = ({ refRegister, errors }) => {
  const dispatch = useDispatch()
  const avatar = useSelector((state) => state.avatar)

  const handleLoadLocalFile = (event) => {
    event.preventDefault()
    const reader = new FileReader()
    const file = event.target.files[0]
    reader.onloadend = () => dispatch(loadAvatar(reader.result))
    reader.readAsDataURL(file)
  }

  useEffect(() => () => dispatch(loadAvatar('')), [])

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
        <ValidationError errors={errors} name="avatar" />
      </label>
    </div>
  )
}

AvatarInput.propTypes = {
  refRegister: T.func,
  errors: T.object
}

export default AvatarInput
