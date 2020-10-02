import React from 'react'
// useForm
import { useForm } from 'react-hook-form'
// css
import classes from './NewUserAccount.module.css'
// utils
import { concatStyles } from '../../../utils/utils'
// components
import WrappedInput from '../../../components/WrappedInput/WrappedInput'
import AvatarInput from '../../../components/AvatarInput/AvatarInput'
import ForwardButton from '../../../components/ForwardButton/ForwardButton'

const NewUserAccount = () => {
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={concatStyles(classes.flexCont, classes.leftCont)}>
        <AvatarInput />
      </div>

      <div className={classes.flexCont}>
        <WrappedInput
          type="text"
          name="userName"
          title="User Name"
          refRegister={register({ required: true })}
          errors={errors}
        />

        <WrappedInput
          type="password"
          name="password"
          title="Password"
          refRegister={register({ required: true })}
          errors={errors}
        />

        <WrappedInput
          type="password"
          name="passwordRepeat"
          title="Repeat password"
          refRegister={register({ required: true })}
          errors={errors}
        />

        <ForwardButton />
      </div>
    </form>
  )
}

export default NewUserAccount
