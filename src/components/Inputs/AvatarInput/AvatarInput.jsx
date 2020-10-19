import React from 'react'
// prop-types
import T from 'prop-types'
// react-hook-form
import { useFormContext } from 'react-hook-form'
// assets
import { ReactComponent as AddIcon } from 'assets/icons/add.svg'
// components
import AvatarImage from 'components/AvatarImage'
import ValidationError from 'components/ValidationError'

// css
import classes from './AvatarInput.module.css'

const AvatarInput = ({ refRegister, errorMessage }) => {
  const { setValue, watch } = useFormContext()

  const handleLoadLocalFile = (event) => {
    const reader = new FileReader()
    const file = event.target.files[0]
    reader.onloadend = () => {
      setValue('avatarData', reader.result, { shouldDirty: true })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className={classes.avatarCont}>
      <AvatarImage avatar={watch('avatarData')} />

      <label htmlFor="avatar" className={classes.fileLabel}>
        <input
          name="avatarData"
          ref={refRegister}
          className={classes.avatarData}
        />
        <input
          type="file"
          name="avatar"
          id="avatar"
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
