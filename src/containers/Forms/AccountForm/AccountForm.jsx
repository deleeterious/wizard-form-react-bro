import React from 'react'
// redux
import { useDispatch } from 'react-redux'
import { changeActiveFormStage, updateUser } from 'redux/actions'
// useForm
import { useForm } from 'react-hook-form'
// utils
import { concatStyles } from 'utils'
// helpers
import { setToLocalStorage } from 'helpers/localStorageHelper'
// components
import TextInput from 'components/TextInput/TextInput'
import AvatarInput from 'components/AvatarInput/AvatarInput'
import Button from 'components/Button/Button'
// css
import classes from './AccountForm.module.css'

const AccountForm = ({ isEdit, id }) => {
  const NEXT_STAGE = 2

  const { register, handleSubmit, errors } = useForm()

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    console.log(data)

    if (isEdit) {
      dispatch(updateUser(+id, data))
    } else {
      setToLocalStorage('account', ...data)
    }
    dispatch(changeActiveFormStage(NEXT_STAGE))
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={concatStyles(classes.flexCont, classes.leftCont)}>
        <AvatarInput refRegister={register()} />
      </div>

      <div className={classes.flexCont}>
        <TextInput
          type="text"
          name="userName"
          title="User Name"
          refRegister={register({ required: true })}
          errors={errors}
        />

        <TextInput
          type="password"
          name="password"
          title="Password"
          refRegister={register({ required: true })}
          errors={errors}
        />

        <TextInput
          type="password"
          name="passwordRepeat"
          title="Repeat password"
          refRegister={register({ required: true })}
          errors={errors}
        />

        <Button />
      </div>
    </form>
  )
}

export default AccountForm