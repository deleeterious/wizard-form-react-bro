import React from 'react'
// prop-types
import T from 'prop-types'
// redux
import { useDispatch } from 'react-redux'
// useForm
import { useForm } from 'react-hook-form'
import { changeActiveFormStage, updateUser } from 'redux/actions'
// helpers
import { setToLocalStorage } from 'helpers/localStorageHelper'
// constants
import { languages } from 'constants.js'
// components
import TextInput from 'components/Inputs/TextInput'
import Button from 'components/Button'
import SelectInput from 'components/Inputs/SelectInput'
import PhoneInput from 'components/Inputs/PhoneInput'
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
      setToLocalStorage('contacts', data)
    }
    dispatch(changeActiveFormStage(NEXT_STAGE))
  }

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

        <SelectInput
          control={control}
          options={languages}
          title="Main languages"
          name="language"
        />
      </div>

      <div className={classes.flexCont}>
        <TextInput
          type="text"
          name="fax"
          title="Fax"
          refRegister={register()}
          errors={errors}
        />

        <PhoneInput control={control} />

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
