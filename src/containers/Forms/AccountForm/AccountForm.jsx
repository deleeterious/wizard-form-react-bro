import React, { useEffect, useState } from 'react'
// lodash/isEqual
import isEqual from 'lodash/isEqual'
// prop-types
import T from 'prop-types'
// react-router
import { Redirect } from 'react-router-dom'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { changeActiveFormStage, setNewUser, updateUser } from 'redux/actions'
// useForm
import { useForm } from 'react-hook-form'
// utils
import { concatStyles } from 'utils'
// constants
import { ACCOUNT_FORM_STAGE, PROFILE_FORM_STAGE } from 'constants.js'
// helpers
import {
  getFromLocalStorage,
  setToLocalStorage
} from 'helpers/localStorageHelper'
import {
  avatarValidation,
  userNameValidation,
  requiredValidation,
  passwordRepeatValidation
} from 'helpers/validations'
// components
import TextInput from 'components/Inputs/TextInput'
import AvatarInput from 'components/Inputs/AvatarInput/AvatarInput'
import Button from 'components/Button'
// css
import commonStyles from 'containers/Forms/common/style.module.css'
import classes from './AccountForm.module.css'

const AccountForm = ({ register, errors, trigger }) => {
  const dispatch = useDispatch()

  // const [isDisabled, setIsDisabled] = useState(true)

  // const { userName, password, passwordRepeat } = useSelector(
  //   (state) => state.user
  // )
  // const users = useSelector((state) => state.users)
  // const avatar = useSelector((state) => state.avatar)
  // const newUser = useSelector((state) => state.newUser)

  // const { register, handleSubmit, watch, errors, getValues, reset } = useForm({
  //   defaultValues: isEdit
  //     ? { userName, password, passwordRepeat }
  //     : { ...newUser.account }
  // })

  // useEffect(() => {
  //   if (isContinue) {
  //     reset(getFromLocalStorage('account'))
  //   } else if (isEdit) {
  //     reset({ userName, password, passwordRepeat })
  //   }
  // }, [isContinue, isEdit, userName, password, passwordRepeat])

  // const onSubmit = (data) => {
  //   if (isEdit) {
  //     dispatch(updateUser(+id, { ...data, avatar: '' }))
  //     setIsSaved(true)
  //   }
  //   dispatch(changeActiveFormStage(PROFILE_FORM_STAGE))
  // }

  // const handleChange = () => {
  //   console.log(getValues())
  //   setIsDisabled(isEqual({ userName, password, passwordRepeat }, getValues()))
  //   if (!isEdit) {
  //     setToLocalStorage('account', { ...getValues(), avatar })
  //     dispatch(setNewUser({ account: getValues() }))
  //   }
  // }

  const handleClickForward = async (e) => {
    e.preventDefault()
    const result = await trigger(['userName', 'password', 'passwordRepeat'])
    if (result) {
      dispatch(changeActiveFormStage(PROFILE_FORM_STAGE))
    }
  }

  return (
    <div className={classes.form}>
      <div className={concatStyles(classes.flexCont, classes.leftCont)}>
        <AvatarInput
          // refRegister={register(avatarValidation())}
          errorMessage={errors?.avatar?.message}
        />
      </div>

      <div className={classes.flexCont}>
        <TextInput
          type="text"
          name="userName"
          title="User Name"
          refRegister={register(requiredValidation())}
          errorMessage={errors?.userName?.message}
        />

        <TextInput
          type="password"
          name="password"
          title="Password"
          refRegister={register(requiredValidation())}
          errorMessage={errors?.password?.message}
        />

        <TextInput
          type="password"
          name="passwordRepeat"
          title="Repeat password"
          refRegister={register(
            passwordRepeatValidation(
              getFromLocalStorage(ACCOUNT_FORM_STAGE)?.password
            )
          )}
          errorMessage={errors?.passwordRepeat?.message}
        />
        <div className={commonStyles.buttons}>
          <Button handleClick={handleClickForward} className={commonStyles.r0}>
            Forward
          </Button>
        </div>
      </div>
    </div>
  )
}

AccountForm.propTypes = {
  isEdit: T.bool,
  isContinue: T.bool,
  id: T.string
}

export default AccountForm
