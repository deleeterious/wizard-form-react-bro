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

const ProfileForm = ({ isEdit, isContinue, id }) => {
  const dispatch = useDispatch()

  const [isDisabled, setIsDisabled] = useState(true)
  const [isSaved, setIsSaved] = useState(false)

  const {
    firstName,
    lastName,
    birthDate,
    email,
    address,
    gender
  } = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const newUser = useSelector((state) => state.newUser)

  const { register, handleSubmit, errors, control, getValues, reset } = useForm(
    {
      defaultValues: { ...newUser.profile }
    }
  )

  const onSubmit = (data) => {
    if (isEdit) {
      dispatch(updateUser(+id, data))
      setIsSaved(true)
    }
    dispatch(changeActiveFormStage(CONTACTS_FORM_STAGE))
  }

  useEffect(() => {
    if (isContinue) {
      reset(getFromLocalStorage('profile'))
    } else if (isEdit) {
      reset({
        firstName,
        lastName,
        birthDate,
        email,
        address,
        gender
      })
    }
  }, [isContinue])

  const handleChange = () => {
    setIsDisabled(
      isEqual(
        {
          firstName,
          lastName,
          birthDate,
          email,
          address,
          gender
        },
        getValues()
      )
    )

    if (!isEdit) {
      setToLocalStorage('profile', getValues())
      dispatch(setNewUser({ profile: getValues() }))
    }
  }

  const handleClickBack = (e) => {
    e.preventDefault()
    dispatch(changeActiveFormStage(ACCOUNT_FORM_STAGE))
  }

  if (isSaved) return <Redirect to={`/profile/${id}`} />

  return (
    <form
      className={classes.form}
      onChange={handleChange}
      onSubmit={handleSubmit(onSubmit)}
    >
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
          refRegister={register(
            isEdit ? requiredValidation() : emailValidation(users)
          )}
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
          {isEdit || (
            <Button className={commonStyles.l0} onClick={handleClickBack}>
              Back
            </Button>
          )}
          <Button className={commonStyles.r0} disabled={isEdit && isDisabled}>
            {isEdit ? 'Save' : 'Forward'}
          </Button>
        </div>
      </div>
    </form>
  )
}

ProfileForm.propTypes = {
  isEdit: T.bool,
  isContinue: T.bool,
  id: T.string
}

export default ProfileForm
