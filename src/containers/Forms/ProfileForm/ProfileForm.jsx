import React, { useEffect, useState } from 'react'
// lodash/isEqual
import isEqual from 'lodash/isEqual'
// prop-types
import T from 'prop-types'
// react-router
import { Redirect } from 'react-router-dom'
// react-redux
import { useDispatch, useSelector } from 'react-redux'
import { changeActiveFormStage, setNewUser, updateUser } from 'redux/actions'
// useForm
import { useForm } from 'react-hook-form'
// constants
import { ACCOUNT_FORM_STAGE, CONTACTS_FORM_STAGE } from 'constants.js'
// helpers
import {
  getFromLocalStorage,
  setToLocalStorage
} from 'helpers/localStorageHelper'
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
import commonStyles from 'containers/Forms/common/style.module.css'
import classes from './ProfileForm.module.css'

const ProfileForm = ({ register, errors, control, trigger }) => {
  const dispatch = useDispatch()

  const handleClickForward = async (e) => {
    e.preventDefault()
    const result = await trigger([
      'firstName',
      'lastName',
      'birthDate',
      'email'
    ])
    if (result) {
      dispatch(changeActiveFormStage(CONTACTS_FORM_STAGE))
    }
  }

  const handleClickBack = (e) => {
    e.preventDefault()
    dispatch(changeActiveFormStage(ACCOUNT_FORM_STAGE))
  }

  return (
    <div className={classes.form}>
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
          refRegister={register(requiredValidation())}
          errorMessage={errors?.email?.message}
        />

        <TextInput
          type="text"
          name="address"
          title="Address"
          refRegister={register()}
        />

        <RadioInput refRegister={register()} />

        <div className={commonStyles.buttons}>
          <Button className={commonStyles.l0} handleClick={handleClickBack}>
            Back
          </Button>

          <Button handleClick={handleClickForward} className={commonStyles.r0}>
            Forward
          </Button>
        </div>
      </div>
    </div>
  )
}

ProfileForm.propTypes = {
  isEdit: T.bool,
  isContinue: T.bool,
  id: T.string
}

export default ProfileForm
