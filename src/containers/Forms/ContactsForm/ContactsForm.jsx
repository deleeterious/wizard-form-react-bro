import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// useForm
import { useForm } from 'react-hook-form'
import { changeActiveFormStage, updateUser } from 'redux/actions'
// assets
import { ReactComponent as AddIcon } from 'assets/icons/add.svg'
// helpers
import { setToLocalStorage } from 'helpers/localStorageHelper'
// components
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import SelectInput from 'components/SelectInput/SelectInput'
import PhoneInput from 'components/PhoneInput/PhoneInput'
// css
import classes from './ContactsForm.module.css'

const ContactsForm = ({ isEdit, id }) => {
  const NEXT_STAGE = 4

  const { register, handleSubmit, errors, control } = useForm()
  const dispatch = useDispatch()
  const onSubmit = (data) => {
    console.log(data)
    if (isEdit) {
      dispatch(updateUser(+id, data))
    } else {
      setToLocalStorage('contacts', ...data)
    }
    dispatch(changeActiveFormStage(NEXT_STAGE))
  }

  const [phoneNumbers, setPhoneNumbers] = useState([
    <PhoneInput key={+new Date().toString()} control={control} />
  ])

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.flexCont}>
        <TextInput
          type="text"
          name="company"
          title="Company"
          refRegister={register({ required: true })}
          errors={errors}
        />

        <TextInput
          type="text"
          name="githubLink"
          title="Github link"
          refRegister={register()}
          errors={errors}
        />

        <TextInput
          type="text"
          name="facebookLink"
          title="Facebook link"
          refRegister={register()}
          errors={errors}
        />

        <SelectInput control={control} />
      </div>

      <div className={classes.flexCont}>
        <TextInput
          type="text"
          name="fax"
          title="Fax"
          refRegister={register()}
          errors={errors}
        />

        {phoneNumbers}

        <button
          onClick={(e) => {
            e.preventDefault()
            setPhoneNumbers((prev) => [
              ...prev,
              <PhoneInput key={+new Date()} control={control} />
            ])
          }}
          className={classes.addPhoneBtn}
        >
          <AddIcon />
          <span>add phone number</span>
        </button>

        <Button />
      </div>
    </form>
  )
}

export default ContactsForm
