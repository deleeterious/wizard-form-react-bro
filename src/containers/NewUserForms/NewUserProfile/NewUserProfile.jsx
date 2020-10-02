import React from 'react'
// useForm
import { useForm } from 'react-hook-form'
// css
import 'react-datepicker/dist/react-datepicker.css'
import classes from './NewUserProfile.module.css'
// components
import WrappedInput from '../../../components/WrappedInput'
import ForwardButton from '../../../components/ForwardButton'
import BirthDateInput from '../../../components/BirthDateInput/BirthDateInput'
import RadioInput from '../../../components/RadioInput/RadioInput'

const NewUserProfile = () => {
  const { register, handleSubmit, errors, control } = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.flexCont}>
        <WrappedInput
          type="text"
          name="firstName"
          title="First name"
          refRegister={register({ required: true })}
          errors={errors}
        />

        <WrappedInput
          type="text"
          name="lastName"
          title="Last name"
          refRegister={register({ required: true })}
          errors={errors}
        />

        <BirthDateInput control={control} />
      </div>

      <div className={classes.flexCont}>
        <WrappedInput
          type="email"
          name="email"
          title="Email"
          refRegister={register({ required: true })}
          errors={errors}
        />

        <WrappedInput
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

        <ForwardButton />
      </div>
    </form>
  )
}

export default NewUserProfile
