import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// useForm
import { useForm } from 'react-hook-form'
import { changeActiveFormStage } from 'redux/actions'
// assets
import { ReactComponent as AddIcon } from 'assets/icons/add.svg'
// components
import TextInput from 'components/TextInput'
import FormButton from 'components/FormButton'
import SelectInput from 'components/SelectInput/SelectInput'
import PhoneInput from 'components/PhoneInput/PhoneInput'
// css
import classes from './ContactsForm.module.css'

const ContactsForm = () => {
  const NEXT_STAGE = 4

  const { register, handleSubmit, errors, control } = useForm()
  const dispatch = useDispatch()
  const onSubmit = (data) => {
    console.log(data)
    localStorage.setItem('contacts', JSON.stringify(data))
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

        <FormButton />
      </div>
    </form>
  )
}

export default ContactsForm
