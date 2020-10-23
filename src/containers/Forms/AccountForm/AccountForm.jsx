import React, { memo, useEffect } from 'react'
// lodash
import isEmpty from 'lodash/isEmpty'
// prop-types
import T from 'prop-types'
// react-hook-form
import { useFormContext } from 'react-hook-form'
// react-redux
import { useDispatch, useSelector } from 'react-redux'
import { changeActiveFormStage } from 'redux/actions'
// utils
import { concatStyles } from 'utils'
// constants
import { PROFILE_FORM_STAGE } from 'constants.js'
// helpers
import {
  getFromLocalStorage,
  setToLocalStorage
} from 'helpers/localStorageHelper'
import {
  passwordRepeatValidation,
  passwordValidation,
  userNameValidation
} from 'helpers/validations'
// components
import TextInput from 'components/Inputs/TextInput'
import AvatarInput from 'components/Inputs/AvatarInput'
import Button from 'components/Button'
import PasswordInput from 'components/Inputs/PasswordInput'
// css
import commonStyles from 'containers/Forms/common/style.module.css'
import classes from './AccountForm.module.css'

const AccountForm = ({ setSubmittedStages, handleSave, isEdit }) => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const {
    register,
    trigger,
    watch,
    getValues,
    errors,
    formState
  } = useFormContext()

  useEffect(() => {}, [])

  const handleClickForward = async (e) => {
    e.preventDefault()
    const isValid = await trigger()
    if (isValid) {
      setToLocalStorage('newUserStage', PROFILE_FORM_STAGE)

      setToLocalStorage('submittedStages', {
        ...getFromLocalStorage('submittedStages'),
        ACCOUNT_FORM_STAGE: true
      })

      setSubmittedStages((prevState) => ({
        ...prevState,
        ACCOUNT_FORM_STAGE: true
      }))

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

        <PasswordInput
          refRegister={register(passwordValidation(watch('passwordRepeat')))}
          name="password"
          title="Password"
        />

        <PasswordInput
          refRegister={register(passwordRepeatValidation(watch('password')))}
          name="passwordRepeat"
          title="Repeat password"
        />

        <div className={commonStyles.buttons}>
          <Button
            className={commonStyles.positionRight}
            disabled={
              isEdit
                ? !formState.isDirty
                : isEmpty(getValues()) || !isEmpty(errors)
            }
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

export default memo(AccountForm)
