import React from 'react'
// react-redux
import { useDispatch } from 'react-redux'
import { changeActiveFormStage } from 'redux/actions'
// useForm
import { useForm } from 'react-hook-form'
// components
import TextInput from 'components/TextInput'
import FormButton from 'components/FormButton'
import DateInput from 'components/DateInput/DateInput'
import RadioInput from 'components/RadioInput/RadioInput'
// css
import 'react-datepicker/dist/react-datepicker.css'
import classes from './ProfileForm.module.css'

const ProfileForm = () => {
  const NEXT_STAGE = 3

  const dispatch = useDispatch()
  const { register, handleSubmit, errors, control } = useForm()
  const onSubmit = (data) => {
    console.log(data)
    localStorage.setItem('profile', JSON.stringify(data))
    dispatch(changeActiveFormStage(NEXT_STAGE))
  }
  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.flexCont}>
        <TextInput
          type="text"
          name="firstName"
          title="First name"
          refRegister={register({ required: true })}
          errors={errors}
        />

        <TextInput
          type="text"
          name="lastName"
          title="Last name"
          refRegister={register({ required: true })}
          errors={errors}
        />

        <DateInput control={control} />
      </div>

      <div className={classes.flexCont}>
        <TextInput
          type="email"
          name="email"
          title="Email"
          refRegister={register({ required: true })}
          errors={errors}
        />

        <TextInput
          type="text"
          name="Address"
          title="Address"
          refRegister={register({ required: true })}
          errors={errors}
        />

        <RadioInput
          refRegister={register({ required: true })}
          errors={errors}
        />

        <FormButton />
      </div>
    </form>
  )
}

export default ProfileForm
