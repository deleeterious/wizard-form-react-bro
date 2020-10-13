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
import { PROFILE_FORM_STAGE } from 'constants.js'
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
import TextInput from 'components/Inputs/TextInput/TextInput'
import AvatarInput from 'components/Inputs/AvatarInput/AvatarInput'
import Button from 'components/Button/Button'
// css
import commonStyles from 'containers/Forms/common/style.module.css'
import classes from './AccountForm.module.css'

const AccountForm = ({ isEdit, isContinue, id }) => {
  const dispatch = useDispatch()

  const [isDisabled, setIsDisabled] = useState(true)
  const [isSaved, setIsSaved] = useState(false)

  const { userName, password, passwordRepeat } = useSelector(
    (state) => state.user
  )
  const users = useSelector((state) => state.users)
  const avatar = useSelector((state) => state.avatar)
  const newUser = useSelector((state) => state.newUser)

  const { register, handleSubmit, watch, errors, getValues, reset } = useForm({
    defaultValues: { ...newUser.account }
  })

  useEffect(() => {
    if (isContinue) {
      reset(getFromLocalStorage('account'))
    } else if (isEdit) {
      reset({ userName, password, passwordRepeat })
    }
  }, [isContinue])

  const onSubmit = (data) => {
    if (isEdit) {
      dispatch(updateUser(+id, data))
      setIsSaved(true)
    }
    dispatch(changeActiveFormStage(PROFILE_FORM_STAGE))
  }

  const handleChange = () => {
    setIsDisabled(
      isEqual(
        { avatar: {}, userName, password, passwordRepeat },
        { ...getValues(), avatar: {} }
      )
    )
    if (!isEdit) {
      setToLocalStorage('account', { ...getValues(), avatar })
      dispatch(setNewUser({ account: getValues() }))
    }
  }

  if (isSaved) return <Redirect to={`/profile/${id}`} />

  return (
    <form
      className={classes.form}
      onChange={handleChange}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={concatStyles(classes.flexCont, classes.leftCont)}>
        <AvatarInput
          refRegister={register(avatarValidation())}
          errorMessage={errors?.avatar?.message}
        />
      </div>

      <div className={classes.flexCont}>
        <TextInput
          type="text"
          name="userName"
          title="User Name"
          refRegister={register(
            isEdit ? requiredValidation() : userNameValidation(users)
          )}
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
          refRegister={register(passwordRepeatValidation(watch('password')))}
          errorMessage={errors?.passwordRepeat?.message}
        />
        <div className={commonStyles.buttons}>
          <Button className={commonStyles.r0} disabled={isEdit && isDisabled}>
            {isEdit ? 'Save' : 'Forward'}
          </Button>
        </div>
      </div>
    </form>
  )
}

AccountForm.propTypes = {
  isEdit: T.bool,
  isContinue: T.bool,
  id: T.string
}

export default AccountForm
