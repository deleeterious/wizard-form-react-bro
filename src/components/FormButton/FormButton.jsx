import React from 'react'
// css
import classes from './FormButton.module.css'

const FormButton = () => {
  return (
    <div className={classes.btnCont}>
      <input type="submit" value="Forward" className={classes.forwardBtn} />
    </div>
  )
}

export default FormButton
