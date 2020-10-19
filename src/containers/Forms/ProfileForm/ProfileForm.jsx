import React from 'react'
// prop-types
import T from 'prop-types'
// react-redux
import { useDispatch } from 'react-redux'
import { changeActiveFormStage } from 'redux/actions'
// useForm
import { useFormContext } from 'react-hook-form'
// constants
import { ACCOUNT_FORM_STAGE, CONTACTS_FORM_STAGE } from 'constants.js'
// helpers
import { setToLocalStorage } from 'helpers/localStorageHelper'
import { birthDateValidation, requiredValidation } from 'helpers/validations'
// components
import TextInput from 'components/Inputs/TextInput'
import Button from 'components/Button'
import DateInput from 'components/Inputs/DateInput'
import RadioInput from 'components/Inputs/RadioInput'
// css
import commonStyles from 'containers/Forms/common/style.module.css'
import classes from './ProfileForm.module.css'

const ProfileForm = ({ isEdit, handleSave }) => {
  const dispatch = useDispatch()

  const { register, trigger, errors, control } = useFormContext()

  const handleClickForward = async (e) => {
    e.preventDefault()
    const result = await trigger()
    if (result) {
      setToLocalStorage('newUserStage', CONTACTS_FORM_STAGE)
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
          {isEdit || <Button handleClick={handleClickBack}>Back</Button>}

          <Button
            handleClick={isEdit ? handleSave : handleClickForward}
            className={commonStyles.r0}
          >
            {isEdit ? 'Save' : 'Forward'}
          </Button>
        </div>
      </div>
    </div>
  )
}

ProfileForm.propTypes = {
  isEdit: T.bool,
  handleSave: T.func
}

export default ProfileForm
