import React from 'react'
// css
import classes from './NewUserAccount.module.css'
// assets
import { ReactComponent as AvatarIcon } from '../../../assets/icons/avatar.svg'
import { ReactComponent as AddIcon } from '../../../assets/icons/add.svg'
// utils
import { concatStyles } from '../../../utils/utils'

const NewUserAccount = () => {
  return (
    <form className={classes.form}>
      <div className={concatStyles(classes.flexCont, classes.leftCont)}>
        <div className={classes.avatarCont}>
          <div className={classes.avatarIconCont}>
            <AvatarIcon className={classes.avatarIcon} />
          </div>

          <label htmlFor="avatar" className={classes.fileLabel}>
            <input
              type="file"
              name="avatar"
              id="avatar"
              className={classes.fileInput}
            />
            <AddIcon className={classes.addIcon} />
            <div>add avatar</div>
          </label>
        </div>
      </div>

      <div className={classes.flexCont}>
        <div className={classes.inputCont}>
          <label htmlFor="userName">
            <div className={classes.inputLabel}>User name</div>
            <input
              type="text"
              name="userName"
              id="userName"
              className={classes.input}
            />
          </label>
        </div>

        <div className={classes.inputCont}>
          <label htmlFor="password">
            <div className={classes.inputLabel}>Password</div>
            <input
              type="password"
              name="password"
              id="password"
              className={classes.input}
            />
          </label>
        </div>

        <div className={classes.inputCont}>
          <label htmlFor="passwordRepeat">
            <div className={classes.inputLabel}>Repeat Password</div>
            <input
              type="password"
              name="passwordRepeat"
              id="passwordRepeat"
              className={classes.input}
            />
          </label>
        </div>
        <div className={classes.btnCont}>
          <input type="button" value="Forward" className={classes.forwardBtn} />
        </div>
      </div>
    </form>
  )
}

export default NewUserAccount
