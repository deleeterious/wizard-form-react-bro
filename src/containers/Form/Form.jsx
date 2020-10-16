import React, { useEffect } from 'react'
// prop-types
import T from 'prop-types'
// react-hook-form
import { FormProvider, useForm } from 'react-hook-form'
// react-redux
import { useDispatch, useSelector } from 'react-redux'
import {
  addUser,
  changeActiveFormStage,
  clearNewUser,
  setAvatar,
  setNewUser,
  updateUser
} from 'redux/actions'
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
import { getFromLocalStorage } from 'helpers/localStorageHelper'
// containers
import AccountForm from 'containers/Forms/AccountForm'
import ProfileForm from 'containers/Forms/ProfileForm'
import ContactsForm from 'containers/Forms/ContactsForm'
import CapabilitiesForm from 'containers/Forms/CapabilitiesForm'

const Form = ({ activeFormStage, isContinue, isEdit }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const avatar = useSelector((state) => state.avatar)
  const user = useSelector((state) => state.user)

  const methods = useForm({ mode: 'onChange' })
  const { getValues, reset } = methods

  const onSubmit = () => {
    dispatch(addUser({ ...getFromLocalStorage('newUser'), avatar }))
    localStorage.clear()
    history.push('/')
  }

  const onSave = () => {
    dispatch(updateUser(user.id, { ...getValues(), avatar }))
    history.push(`profile/${user.id}`)
  }

  // ? FORM mount
  useEffect(() => {
    if (isContinue)
      dispatch(changeActiveFormStage(getFromLocalStorage('newUserStage')))
  }, [isContinue])

  // ? Forms isContinue mount
  useEffect(() => {
    if (isContinue)
      reset({
        ...getFromLocalStorage('newUser'),
        avatar: ''
      })
  }, [isContinue, activeFormStage])

  // ? FORMS isEdit mount
  useEffect(() => {
    if (isEdit) reset({ ...user, avatar })
  }, [isEdit, user])

  // ! FORM unmount
  useEffect(
    () => () => {
      dispatch(clearNewUser())
      dispatch(changeActiveFormStage(ACCOUNT_FORM_STAGE))
    },
    []
  )

  // useEffect(() => {
  //   if (isContinue) {
  //     methods.reset({ ...getFromLocalStorage(activeFormStage), avatar: '' })
  //   } else if (!isEdit) {
  //     methods.reset({ ...newUser[activeFormStage] })
  //   }
  // }, [activeFormStage, isContinue])

  // useEffect(() => {
  //   if (isContinue) {
  //     dispatch(changeActiveFormStage(getFromLocalStorage('newUserStage')))
  //     dispatch(setAvatar(getFromLocalStorage('avatar')))
  //   }
  //   return () => {
  //     dispatch(setAvatar(''))
  //   }
  // }, [isContinue])

  // useEffect(() => {
  //   if (isEdit) {
  //     dispatch(setAvatar(user.avatar))
  //     methods.reset({ ...user, avatar: '' })
  //   }
  // }, [activeFormStage, isEdit, user])

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {activeFormStage === ACCOUNT_FORM_STAGE && (
          <AccountForm handleSave={onSave} isEdit={isEdit} />
        )}
        {activeFormStage === PROFILE_FORM_STAGE && (
          <ProfileForm handleSave={onSave} isEdit={isEdit} />
        )}
        {activeFormStage === CONTACTS_FORM_STAGE && (
          <ContactsForm handleSave={onSave} isEdit={isEdit} />
        )}
        {activeFormStage === CAPABILITIES_FORM_STAGE && (
          <CapabilitiesForm handleSave={onSave} isEdit={isEdit} />
        )}
      </form>
    </FormProvider>
  )
}

Form.propTypes = {
  activeFormStage: T.string,
  isContinue: T.bool,
  isEdit: T.bool
}

export default Form
