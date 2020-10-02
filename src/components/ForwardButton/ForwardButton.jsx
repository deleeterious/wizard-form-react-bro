import React from 'react'
// css
import classes from './ForwardButton.module.css'

const ForwardButton = () => {
  return (
    <div className={classes.btnCont}>
      <input type="submit" value="Forward" className={classes.forwardBtn} />
    </div>
  )
}

export default ForwardButton
