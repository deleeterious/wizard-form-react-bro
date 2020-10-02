import React from 'react'
// useForm
import { useForm } from 'react-hook-form'
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

        <PhoneInput control={control} />

        <ForwardButton />
      </div>
    </form>
  )
}

export default NewUserContacts
