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
import {
  birthDateValidation,
  emailValidation,
  requiredValidation
} from 'helpers/validations'
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
    if (isEdit) {
      dispatch(updateUser(+id, data))
    } else {
      setToLocalStorage('profile', data)
    }
    dispatch(changeActiveFormStage(NEXT_STAGE))
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.flexCont}>
        <TextInput
          type="text"
          title="First name"
          name="firstName"
          refRegister={register(requiredValidation())}
          errorMessage={errors?.firstName?.message}
        />

        <TextInput
          type="text"
          title="Last name"
          name="lastName"
          refRegister={register(requiredValidation())}
          errorMessage={errors?.lastName?.message}
        />

        <DateInput
          name="birthDate"
          control={control}
          rules={birthDateValidation()}
          errorMessage={errors?.birthDate?.message}
        />
      </div>

      <div className={classes.flexCont}>
        <TextInput
          type="text"
          name="email"
          title="Email"
          refRegister={register(emailValidation(users))}
          errorMessage={errors?.email?.message}
        />

        <TextInput
          type="text"
          name="address"
          title="Address"
          refRegister={register()}
        />

        <RadioInput refRegister={register()} />

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
