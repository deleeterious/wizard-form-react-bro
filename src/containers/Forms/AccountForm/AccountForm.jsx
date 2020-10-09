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
    console.log(data)
    if (isEdit) {
      dispatch(updateUser(+id, data))
    } else {
      setToLocalStorage('account', { ...data, avatar })
    }
    dispatch(changeActiveFormStage(NEXT_STAGE))
  }

  const avatarValidation = (value) =>
    value.length === 0 || +value[0].size < 1e6 || 'File size is more than 1MB'

  const userNameValidation = (value) =>
    !users.find((user) => user.userName === value) ||
    'This username is already used'

  const passwordRepeatValidation = (value) =>
    value === watch('password') || "Password don't match"

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={concatStyles(classes.flexCont, classes.leftCont)}>
        <AvatarInput
          refRegister={register({
            validate: avatarValidation
          })}
          errors={errors}
        />
      </div>

      <div className={classes.flexCont}>
        <TextInput
          type="text"
          name="userName"
          title="User Name"
          refRegister={register({
            required: 'This field is required',
            validate: userNameValidation
          })}
          errors={errors}
        />

        <TextInput
          type="password"
          name="password"
          title="Password"
          refRegister={register({ required: 'This field is required' })}
          errors={errors}
        />

        <TextInput
          type="password"
          name="passwordRepeat"
          title="Repeat password"
          refRegister={register({
            required: 'This field is required',
            validate: passwordRepeatValidation
          })}
          errors={errors}
        />

        <Button title={isEdit ? 'Save' : 'Forward'} />
      </div>
    </form>
  )
}

AccountForm.propTypes = {
  isEdit: T.bool,
  id: T.string
}

export default AccountForm
