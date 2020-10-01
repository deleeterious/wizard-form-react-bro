import React from 'react'
// css
import classes from './NewUserProfile.module.css'
import generalClasses from '../styles/NewUserForms.module.css'
// utils
import { concatStyles } from '../../../utils/utils'

const NewUserProfile = () => {
  return (
    <form className={generalClasses.form}>
      <div className={classes.flexCont}>
        <div className={generalClasses.inputCont}>
          <label htmlFor="firstName">
            <div className={generalClasses.inputLabel}>First name</div>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className={classes.input}
            />
          </label>
        </div>

        <div className={generalClasses.inputCont}>
          <label htmlFor="lastName">
            <div className={generalClasses.inputLabel}>Last name</div>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className={classes.input}
            />
          </label>
        </div>
      </div>

      <div className={concatStyles(classes.flexCont, classes.rightCont)}>
        <div className={classes.inputCont}>
          <label htmlFor="email">
            <div className={generalClasses.inputLabel}>Email</div>
            <input
              type="email"
              name="email"
              id="email"
              className={classes.input}
            />
          </label>
        </div>

        <div className={classes.inputCont}>
          <label htmlFor="address">
            <div className={generalClasses.inputLabel}>Address</div>
            <input
              type="text"
              name="address"
              id="address"
              className={classes.input}
            />
          </label>
        </div>

        <div className={classes.inputCont}>
          <div className={generalClasses.inputLabel}>Gender</div>
          <label htmlFor="male">
            Male
            <input type="radio" name="gender" id="male" value="Male" />
          </label>
          <label htmlFor="female">
            Female
            <input type="radio" name="gender" id="female" value="Female" />
          </label>
        </div>

        <div className={classes.btnCont}>
          <input
            type="button"
            value="Forward"
            className={generalClasses.forwardBtn}
          />
        </div>
      </div>
    </form>
  )
}

export default NewUserProfile
