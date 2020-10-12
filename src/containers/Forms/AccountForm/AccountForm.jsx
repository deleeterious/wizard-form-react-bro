import React from 'react'
// prop-types
import T from 'prop-types'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { changeActiveFormStage, updateUser } from 'redux/actions'
// useForm
import { useForm } from 'react-hook-form'
// utils
import { concatStyles } from 'utils'
// helpers
import { setToLocalStorage } from 'helpers/localStorageHelper'
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
import classes from './AccountForm.module.css'

const AccountForm = ({ isEdit, id }) => {
  const NEXT_STAGE = 2

  const users = useSelector((state) => state.users)
  const avatar = useSelector((state) => state.avatar)

  const { register, handleSubmit, watch, errors } = useForm()

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    if (isEdit) {
      dispatch(updateUser(+id, data))
    } else {
      setToLocalStorage('account', { ...data, avatar })
    }
    dispatch(changeActiveFormStage(NEXT_STAGE))
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
          refRegister={register(userNameValidation(users))}
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

        <Button>{isEdit ? 'Save' : 'Forward'}</Button>
      </div>
    </form>
  )
}

AccountForm.propTypes = {
  isEdit: T.bool,
  id: T.string
}

export default AccountForm
