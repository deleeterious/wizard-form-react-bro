import React, { useState } from 'react'
// prop-types
import T from 'prop-types'
// redux
import { useDispatch } from 'react-redux'
// useForm
import { useForm } from 'react-hook-form'
import { changeActiveFormStage, updateUser } from 'redux/actions'
// helpers
import { setToLocalStorage } from 'helpers/localStorageHelper'
import {
  faxValidation,
  requiredValidation,
  phoneValidation
} from 'helpers/validations'
// constants
import { CAPABILITIES_FORM_STAGE, languages } from 'constants.js'
// components
import TextInput from 'components/Inputs/TextInput'
import Button from 'components/Button'
import SelectInput from 'components/Inputs/SelectInput'
import MaskInput from 'components/Inputs/MaskInput'
import AddButton from 'components/AddButton'
// css
import classes from './ContactsForm.module.css'

const ContactsForm = ({ isEdit, id }) => {
  const [phones, setPhones] = useState([{ id: 0 }])

  const { register, handleSubmit, errors, control } = useForm()

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    if (isEdit) {
      dispatch(updateUser(+id, data))
    } else {
      setToLocalStorage('contacts', data)
    }
    dispatch(changeActiveFormStage(CAPABILITIES_FORM_STAGE))
  }

  const handleClick = (e) => {
    e.preventDefault()
    setPhones((prevState) => [
      ...prevState,
      { id: prevState[prevState.length - 1].id + 1 }
    ])
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
            errorMessage={errors.phones ? errors.phones[phone.id].message : ''}
          />
        ))}

        {phones.length !== 3 && (
          <AddButton onClick={handleClick}>add phone number</AddButton>
        )}

        <Button>{isEdit ? 'Save' : 'Forward'}</Button>
      </div>
    </form>
  )
}

ContactsForm.propTypes = {
  isEdit: T.bool,
  id: T.string
}

export default ContactsForm
