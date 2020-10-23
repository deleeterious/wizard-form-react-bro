import React, { memo } from 'react'
// lodash
import isEmpty from 'lodash/isEmpty'
// prop-types
import T from 'prop-types'
// react-redux
import { useDispatch, useSelector } from 'react-redux'
import { changeActiveFormStage } from 'redux/actions'
// useForm
import { useFormContext } from 'react-hook-form'
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

const ProfileForm = ({ setSubmittedStages, isEdit, handleSave }) => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const {
    register,
    trigger,
    clearErrors,
    getValues,
    errors,
    control,
    formState
  } = useFormContext()

  const handleClickForward = async (e) => {
    e.preventDefault()
    const result = await trigger()
    if (result) {
      setToLocalStorage('newUserStage', CONTACTS_FORM_STAGE)

      setToLocalStorage('submittedStages', {
        ...getFromLocalStorage('submittedStages'),
        PROFILE_FORM_STAGE: true
      })

      setSubmittedStages((prevState) => ({
        ...prevState,
        PROFILE_FORM_STAGE: true
      }))

      dispatch(changeActiveFormStage(CONTACTS_FORM_STAGE))
    }
  }

  const handleClickBack = (e) => {
    e.preventDefault()
    clearErrors()
    setToLocalStorage('newUserStage', ACCOUNT_FORM_STAGE)
    dispatch(changeActiveFormStage(ACCOUNT_FORM_STAGE))
  }

  return (
    <div className={commonStyles.form}>
      <div className={commonStyles.formSection}>
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
          label="Birth date"
          control={control}
          rules={birthDateValidation()}
          errorMessage={errors?.birthDate?.message}
        />
      </div>

      <div className={commonStyles.formSection}>
        <TextInput
          type="text"
          name="email"
          title="Email"
          refRegister={register(emailValidation(isEdit ? user : {}))}
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
            <Button disabled={false} handleClick={handleClickBack}>
              Back
            </Button>
          )}

          <Button
            disabled={isEdit ? !formState.isDirty : !isEmpty(errors)}
            className={commonStyles.positionRight}
            handleClick={isEdit ? handleSave : handleClickForward}
          >
            {isEdit ? 'Save' : 'Forward'}
          </Button>
        </div>
      </div>
    </div>
  )
}

ProfileForm.propTypes = {
  setSubmittedStages: T.func,
  handleSave: T.func,
  isEdit: T.bool
}

export default memo(ProfileForm)
