import React from 'react'
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

const AccountForm = ({ handleSave, isEdit }) => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const { register, watch, trigger, errors } = useFormContext()

  const handleClickForward = async (e) => {
    e.preventDefault()
    const result = await trigger()
    if (result) {
      setToLocalStorage('newUserStage', PROFILE_FORM_STAGE)
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

        <TextInput
          type="password"
          name="password"
          title="Password"
          refRegister={register(
            passwordValidation(/* watch('passwordRepeat') */)
          )}
          errorMessage={errors?.password?.message}
        />

        <TextInput
          type="password"
          name="passwordRepeat"
          title="Repeat password"
          refRegister={register(passwordRepeatValidation(watch('password')))}
          errorMessage={errors?.passwordRepeat?.message}
        />
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
  isEdit: T.bool,
  handleSave: T.func
}

export default AccountForm
