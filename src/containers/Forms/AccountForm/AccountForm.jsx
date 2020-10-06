import React from 'react'
// redux
import { useDispatch } from 'react-redux'
import { changeActiveFormStage } from 'redux/actions'
// useForm
import { useForm } from 'react-hook-form'
// utils
import { concatStyles } from 'utils'
// components
import TextInput from 'components/TextInput/TextInput'
import AvatarInput from 'components/AvatarInput/AvatarInput'
import FormButton from 'components/FormButton/FormButton'
// css
import classes from './AccountForm.module.css'

const AccountForm = () => {
  const NEXT_STAGE = 2

  const { register, handleSubmit, errors } = useForm()
  const dispatch = useDispatch()
  const onSubmit = (data) => {
    console.log(data)
    localStorage.setItem('account', JSON.stringify(data))
    dispatch(changeActiveFormStage(NEXT_STAGE))
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={concatStyles(classes.flexCont, classes.leftCont)}>
        <AvatarInput />
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

        <FormButton />
      </div>
    </form>
  )
}

export default AccountForm
