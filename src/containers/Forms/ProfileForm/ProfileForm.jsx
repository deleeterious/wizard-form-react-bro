import React from 'react'
// prop-types
import T from 'prop-types'
// react-redux
import { useDispatch, useSelector } from 'react-redux'
import { changeActiveFormStage, updateUser } from 'redux/actions'
// useForm
import { useForm } from 'react-hook-form'
// helpers
import { setToLocalStorage } from 'helpers/localStorageHelper'
// components
import TextInput from 'components/Inputs/TextInput'
import Button from 'components/Button'
import DateInput from 'components/Inputs/DateInput'
import RadioInput from 'components/Inputs/RadioInput'
// css
import classes from './ProfileForm.module.css'

const ProfileForm = ({ isEdit, id }) => {
  const NEXT_STAGE = 3

  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  const { register, handleSubmit, errors, control } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    if (isEdit) {
      dispatch(updateUser(+id, data))
    } else {
      setToLocalStorage('profile', data)
    }
    dispatch(changeActiveFormStage(NEXT_STAGE))
  }

  const birthDateValidate = (value) =>
    new Date().getFullYear() - new Date(value).getFullYear() > 18 ||
    'You are under 18 years old'

  const emailValidation = (value) =>
    !users.find((user) => user.email === value) || 'This email is already used'

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.flexCont}>
        <TextInput
          type="text"
          name="firstName"
          title="First name"
          refRegister={register({ required: 'This field is required' })}
          errors={errors}
        />

        <TextInput
          type="text"
          name="lastName"
          title="Last name"
          refRegister={register({ required: 'This field is required' })}
          errors={errors}
        />

        <DateInput
          name="birthDate"
          errors={errors}
          control={control}
          validate={birthDateValidate}
        />
      </div>

      <div className={classes.flexCont}>
        <TextInput
          type="text"
          name="email"
          title="Email"
          refRegister={register({
            required: 'This field is required',
            validate: emailValidation
          })}
          errors={errors}
        />

        <TextInput
          type="text"
          name="address"
          title="Address"
          refRegister={register()}
          errors={errors}
        />

        <RadioInput
          refRegister={register({ required: true })}
          errors={errors}
        />

        <Button>{isEdit ? 'Save' : 'Forward'}</Button>
      </div>
    </form>
  )
}

ProfileForm.propTypes = {
  isEdit: T.bool,
  id: T.string
}

export default ProfileForm
