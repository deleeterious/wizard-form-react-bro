import React, { useState } from 'react'
// useForm
import { useForm } from 'react-hook-form'
// assets
import { ReactComponent as AddIcon } from '../../../assets/icons/add.svg'
// css
import classes from './NewUserContacts.module.css'
// components
import WrappedInput from '../../../components/WrappedInput'
import ForwardButton from '../../../components/ForwardButton'
import SelectInput from '../../../components/SelectInput/SelectInput'
import PhoneInput from '../../../components/PhoneInput/PhoneInput'

const NewUserContacts = () => {
  const { register, handleSubmit, errors, control } = useForm()
  const onSubmit = (data) => console.log(data)

  const [phoneNumbers, setPhoneNumbers] = useState([
    <PhoneInput key={+new Date().toString()} control={control} />
  ])

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.flexCont}>
        <WrappedInput
          type="text"
          name="company"
          title="Company"
          refRegister={register({ required: true })}
          errors={errors}
        />

        <WrappedInput
          type="text"
          name="githubLink"
          title="Github link"
          refRegister={register()}
          errors={errors}
        />

        <WrappedInput
          type="text"
          name="facebookLink"
          title="Facebook link"
          refRegister={register()}
          errors={errors}
        />

        <SelectInput control={control} />
      </div>

      <div className={classes.flexCont}>
        <WrappedInput
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

        <ForwardButton />
      </div>
    </form>
  )
}

export default NewUserContacts
