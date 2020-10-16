import React, { useEffect, useState } from 'react'

// prop-types
import T from 'prop-types'
// redux
import { useDispatch } from 'react-redux'
// useForm
import { useFormContext } from 'react-hook-form'
import { changeActiveFormStage, setNewUser } from 'redux/actions'
// helpers
import { setToLocalStorage } from 'helpers/localStorageHelper'
import {
  faxValidation,
  requiredValidation,
  phoneValidation
} from 'helpers/validations'
// constants
import {
  CAPABILITIES_FORM_STAGE,
  languages,
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

const ContactsForm = ({ isEdit, handleSave }) => {
  const dispatch = useDispatch()

  const { register, trigger, getValues, errors, control } = useFormContext()

  const [phones, setPhones] = useState([{ id: 0 }])

  const handleClick = (e) => {
    e.preventDefault()
    setPhones((prevState) => [
      ...prevState,
      { id: prevState[prevState.length - 1].id + 1 }
    ])
  }

  const handleClickForward = async (e) => {
    e.preventDefault()
    const result = await trigger(['company', 'language', 'fax'])
    if (result) {
      setToLocalStorage('newUserStage', CAPABILITIES_FORM_STAGE)
      dispatch(changeActiveFormStage(CAPABILITIES_FORM_STAGE))
    }
  }

  const handleClickBack = (e) => {
    e.preventDefault()
    dispatch(changeActiveFormStage(PROFILE_FORM_STAGE))
  }

  useEffect(() => {
    if (!isEdit) {
      return () => dispatch(setNewUser(getValues()))
    }
  }, [])

  return (
    <div className={classes.form}>
      <div className={classes.flexCont}>
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

      <div className={classes.flexCont}>
        <MaskInput
          title="Fax"
          control={control}
          name="fax"
          placeholder="+38 (XXX) XXX XX XX"
          mask="+38 (999) 999 99 99"
          rules={faxValidation()}
          errorMessage={errors?.fax?.message}
        />

        {phones.map((phone) => (
          <MaskInput
            key={phone.id}
            title={`Phone #${phone.id + 1}`}
            control={control}
            name={`phones[${phone.id}]`}
            placeholder="+38 (XXX) XXX XX XX"
            mask="+38 (999) 999 99 99"
            rules={phoneValidation()}
            errorMessage={
              errors.phones && errors.phones[phone.id]
                ? errors.phones[phone.id].message
                : ''
            }
          />
        ))}

        {phones.length !== 3 && (
          <AddButton onClick={handleClick}>add phone number</AddButton>
        )}

        <div className={commonStyles.buttons}>
          {isEdit || (
            <Button className={commonStyles.l0} handleClick={handleClickBack}>
              Back
            </Button>
          )}

          <Button
            className={commonStyles.r0}
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
  isEdit: T.bool,
  handleSave: T.func
}

export default ContactsForm
