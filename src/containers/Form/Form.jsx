import React, { useEffect } from 'react'
// react-hook-form
import { useForm } from 'react-hook-form'
// react-redux
import { useDispatch, useSelector } from 'react-redux'
import { addUser, setNewUser } from 'redux/actions'
// react-router-dom
import { useHistory } from 'react-router-dom'
// constants
import {
  ACCOUNT_FORM_STAGE,
  CAPABILITIES_FORM_STAGE,
  CONTACTS_FORM_STAGE,
  PROFILE_FORM_STAGE
} from 'constants.js'
// helpers
import {
  getFromLocalStorage,
  setToLocalStorage
} from 'helpers/localStorageHelper'
// containers
import AccountForm from 'containers/Forms/AccountForm'
import ProfileForm from 'containers/Forms/ProfileForm'
import ContactsForm from 'containers/Forms/ContactsForm'
import CapabilitiesForm from 'containers/Forms/CapabilitiesForm'
// css
import classes from './Form.module.css'

const Form = ({ activeFormStage, isContinue }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const newUser = useSelector((state) => state.newUser)

  const {
    register,
    handleSubmit,
    errors,
    getValues,
    control,
    trigger,
    reset
  } = useForm()

  const onChange = () => {
    setToLocalStorage(activeFormStage, getValues())
    dispatch(setNewUser({ [activeFormStage]: getValues() }))
  }

  const onSubmit = () => {
    const account = getFromLocalStorage(ACCOUNT_FORM_STAGE)
    const profile = getFromLocalStorage(PROFILE_FORM_STAGE)
    const contacts = getFromLocalStorage(CONTACTS_FORM_STAGE)
    const capabilities = getFromLocalStorage(CAPABILITIES_FORM_STAGE)
    dispatch(addUser({ ...account, ...profile, ...contacts, ...capabilities }))
    localStorage.clear()
    history.push('/')
  }

  console.log(newUser)

  useEffect(() => {
    if (isContinue) {
      reset(getFromLocalStorage(activeFormStage))
    } else {
      reset({ ...newUser[activeFormStage] })
    }
  }, [activeFormStage, isContinue])

  return (
    <form onChange={onChange} onSubmit={handleSubmit(onSubmit)}>
      {activeFormStage === ACCOUNT_FORM_STAGE && (
        <AccountForm register={register} errors={errors} trigger={trigger} />
      )}
      {activeFormStage === PROFILE_FORM_STAGE && (
        <ProfileForm
          control={control}
          register={register}
          errors={errors}
          trigger={trigger}
        />
      )}
      {activeFormStage === CONTACTS_FORM_STAGE && (
        <ContactsForm
          control={control}
          register={register}
          errors={errors}
          trigger={trigger}
        />
      )}
      {activeFormStage === CAPABILITIES_FORM_STAGE && (
        <CapabilitiesForm
          control={control}
          register={register}
          errors={errors}
          trigger={trigger}
        />
      )}
    </form>
  )
}

export default Form
