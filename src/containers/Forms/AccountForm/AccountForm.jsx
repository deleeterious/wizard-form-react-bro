import React, { useState } from 'react'
// prop-types
import T from 'prop-types'
// react-hook-form
import { useFormContext } from 'react-hook-form'
// react-redux
import { useDispatch, useSelector } from 'react-redux'
import { changeActiveFormStage } from 'redux/actions'
// assets
import { ReactComponent as PassVisibleIcon } from 'assets/icons/pass-visible.svg'
import { ReactComponent as PassNotVisibleIcon } from 'assets/icons/pass-notvisible.svg'
// utils
import { concatStyles } from 'utils'
// constants
import { ACCOUNT_FORM_STAGE, PROFILE_FORM_STAGE } from 'constants.js'
// helpers
import { setToLocalStorage } from 'helpers/localStorageHelper'
import {
  passwordRepeatValidation,
  passwordValidation,
  userNameValidation
} from 'helpers/validations'
// components
import TextInput from 'components/Inputs/TextInput'
import AvatarInput from 'components/Inputs/AvatarInput'
import Button from 'components/Button'
// css
import commonStyles from 'containers/Forms/common/style.module.css'
import classes from './AccountForm.module.css'

const AccountForm = ({ setSubmittedStages, handleSave, isEdit }) => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const [isShowPassword, setShowPassword] = useState({
    password: false,
    passwordRepeat: false
  })

  const { register, watch, trigger, errors } = useFormContext()

  const handleShowPass = (e, target) => {
    e.preventDefault()
    setShowPassword((prevState) => ({
      ...prevState,
      [target]: !prevState[target]
    }))
  }

  const handleClickForward = async (e) => {
    e.preventDefault()
    const result = await trigger()
    if (result) {
      setToLocalStorage('newUserStage', PROFILE_FORM_STAGE)
      setToLocalStorage('submittedStages', [ACCOUNT_FORM_STAGE])
      setSubmittedStages((prevState) => [...prevState, ACCOUNT_FORM_STAGE])
      dispatch(changeActiveFormStage(PROFILE_FORM_STAGE))
    }
  }

  return (
    <div className={classes.form}>
      <div
        className={concatStyles(classes.formSection, classes.avatarInputCont)}
      >
        <AvatarInput
          refRegister={register()}
          errorMessage={errors?.avatarData?.message}
        />
      </div>

      <div className={classes.formSection}>
        <TextInput
          type="text"
          name="userName"
          title="User Name"
          refRegister={register(userNameValidation(isEdit ? user : {}))}
          errorMessage={errors?.userName?.message}
        />

        <div className={classes.passwordInputCont}>
          <TextInput
            type="text"
            name="password"
            title="Password"
            className={!isShowPassword.password ? classes.showPass : null}
            refRegister={register(
              passwordValidation(/* watch('passwordRepeat') */)
            )}
            errorMessage={errors?.password?.message}
          />

          <button
            className={classes.showPassBtn}
            onClick={(e) => handleShowPass(e, 'password')}
          >
            {isShowPassword.password ? (
              <PassNotVisibleIcon />
            ) : (
              <PassVisibleIcon />
            )}
          </button>
        </div>

        <div className={classes.passwordInputCont}>
          <TextInput
            type="text"
            name="passwordRepeat"
            title="Repeat password"
            className={!isShowPassword.passwordRepeat ? classes.showPass : null}
            refRegister={register(passwordRepeatValidation(watch('password')))}
            errorMessage={errors?.passwordRepeat?.message}
          />

          <button
            className={classes.showPassBtn}
            onClick={(e) => handleShowPass(e, 'passwordRepeat')}
          >
            {isShowPassword.passwordRepeat ? (
              <PassNotVisibleIcon />
            ) : (
              <PassVisibleIcon />
            )}
          </button>
        </div>

        <div className={commonStyles.buttons}>
          <Button
            className={commonStyles.positionRight}
            disabled={Object.keys(errors).length}
            handleClick={isEdit ? handleSave : handleClickForward}
          >
            {isEdit ? 'Save' : 'Forward'}
          </Button>
        </div>
      </div>
    </div>
  )
}

AccountForm.propTypes = {
  setSubmittedStages: T.func,
  handleSave: T.func,
  isEdit: T.bool
}

export default AccountForm
