import React from 'react'
import classes from './Spinner.module.css'

const Spinner = () => (
  <div className={classes.spinnerCont}>
    <div className={classes['lds-spinner']}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
)

export default Spinner
