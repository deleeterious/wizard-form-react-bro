import React, { useState } from 'react'
// prop-types
import T from 'prop-types'
// redux
import { useDispatch, useSelector } from 'react-redux'
// useForm
import { useFormContext } from 'react-hook-form'
import { changeActiveFormStage } from 'redux/actions'
// assets
import { ReactComponent as DeletePhoneBtn } from 'assets/icons/minus.svg'
// helpers
import {
  getFromLocalStorage,
  setToLocalStorage
} from 'helpers/localStorageHelper'
import {
  faxValidation,
  requiredValidation,
  phoneValidation
} from 'helpers/validations'
// constants
import {
  CAPABILITIES_FORM_STAGE,
  languages,
  PHONE_MASK,
  PROFILE_FORM_STAGE
} from 'constants.js'
// components
import TextInput from 'components/Inputs/TextInput'
import Button from 'components/Button'
import SelectInput from 'components/Inputs/SelectInput'
import MaskInput from 'components/Inputs/MaskInput'
import AddButton from 'components/AddButton'
// css
import commonStyles from 'containers/Forms/common/style.module.css'
import classes from './ContactsForm.module.css'

const ContactsForm = ({ setSubmittedStages, handleSave, isEdit }) => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const {
    register,
    trigger,
    setValue,
    errors,
    control,
    formState
  } = useFormContext()

  const newUserPhones = isEdit
    ? user.phones?.filter((item) => item !== '')
    : getFromLocalStorage('newUser')?.phones?.filter((item) => item !== '')

  const initialPhones = newUserPhones?.length
    ? [...new Array(newUserPhones.length)].map((_, i) => ({ id: i }))
    : [{ id: 0 }]

  const [phones, setPhones] = useState(initialPhones)

  const handleAddPhone = (e) => {
    e.preventDefault()
    setPhones((prevState) => [...prevState, { id: prevState.length }])
  }

  const handleDeletePhone = (id) => {
    setPhones((prevState) => [...prevState.filter((item) => item.id !== id)])
    setValue(`phones[${id}]`, '', { shouldDirty: true })
  }

  const handleClickForward = async (e) => {
    e.preventDefault()
    const result = await trigger()
    if (result) {
      setToLocalStorage('newUserStage', CAPABILITIES_FORM_STAGE)

      setToLocalStorage('submittedStages', {
        ...getFromLocalStorage('submittedStages'),
        CONTACTS_FORM_STAGE: true
      })

      setSubmittedStages((prevState) => ({
        ...prevState,
        CONTACTS_FORM_STAGE: true
      }))

      dispatch(changeActiveFormStage(CAPABILITIES_FORM_STAGE))
    }
  }

  const handleClickBack = (e) => {
    e.preventDefault()
    setToLocalStorage('newUserStage', PROFILE_FORM_STAGE)
    dispatch(changeActiveFormStage(PROFILE_FORM_STAGE))
  }

  return (
    <div className={commonStyles.form}>
      <div className={commonStyles.flexCont}>
        <TextInput
          type="text"
          name="company"
          title="Company"
          refRegister={register(requiredValidation())}
          errorMessage={errors?.company?.message}
        />

        <TextInput
          type="text"
          name="githubLink"
          title="Github link"
          refRegister={register()}
        />

        <TextInput
          type="text"
          name="facebookLink"
          title="Facebook link"
          refRegister={register()}
        />

        <SelectInput
          control={control}
          options={languages}
          title="Main languages"
          name="language"
          rules={requiredValidation()}
          errorMessage={errors?.language?.message}
        />
      </div>

      <div className={commonStyles.flexCont}>
        <MaskInput
          title="Fax"
          control={control}
          name="fax"
          placeholder="+38 (XXX) XXX XX XX"
          mask={PHONE_MASK}
          rules={faxValidation()}
          errorMessage={errors?.fax?.message}
        />

        {phones.map((phone) => (
          <div className={classes.phoneCont} key={phone.id}>
            <MaskInput
              title={`Phone #${phone.id + 1}`}
              control={control}
              name={`phones[${phone.id}]`}
              placeholder="+38 (XXX) XXX XX XX"
              mask={PHONE_MASK}
              rules={phoneValidation()}
              errorMessage={
                errors.phones && errors.phones[phone.id]
                  ? errors.phones[phone.id].message
                  : ''
              }
            />
            {phones.length === 1 || (
              <DeletePhoneBtn
                onClick={() => handleDeletePhone(phone.id)}
                className={classes.deletePhoneBtn}
              />
            )}
          </div>
        ))}

        {phones.length !== 3 && (
          <AddButton onClick={handleAddPhone}>add phone number</AddButton>
        )}

        <div className={commonStyles.buttons}>
          {isEdit || <Button handleClick={handleClickBack}>Back</Button>}

          <Button
            disabled={!formState.isValid}
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

ContactsForm.propTypes = {
  setSubmittedStages: T.func,
  handleSave: T.func,
  isEdit: T.bool
}

export default ContactsForm
