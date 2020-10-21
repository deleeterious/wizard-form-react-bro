import React, { memo } from 'react'
// prop-types
import T from 'prop-types'
import { ReactComponent as CloseIcon } from 'assets/icons/delete.svg'
// css
import classes from './ContinuePopup.module.css'

const ContinuePopup = ({ handleContinue, handleClose }) => {
  return (
    <div className={classes.popup}>
      <div className={classes.popupText}>
        You have an unsaved user data. Do you want to complete it?
      </div>
      <div className={classes.popupBtn} onClick={handleContinue}>
        Continue
      </div>
      <div className={classes.close} onClick={handleClose}>
        <CloseIcon />
      </div>
    </div>
  )
}

ContinuePopup.propTypes = {
  handleContinue: T.func,
  handleClose: T.func
}

export default memo(ContinuePopup)
