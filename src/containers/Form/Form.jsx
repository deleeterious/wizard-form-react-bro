/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
// prop-types
import T from 'prop-types'
// react-hook-form
import { FormProvider, useForm } from 'react-hook-form'
// react-redux
import { useDispatch, useSelector } from 'react-redux'
import { addUser, changeActiveFormStage, updateUser } from 'redux/actions'
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
// components
import ContinuePopup from 'components/ContinuePopup'
// containers
import AccountForm from 'containers/Forms/AccountForm'
import ProfileForm from 'containers/Forms/ProfileForm'
import ContactsForm from 'containers/Forms/ContactsForm'
import CapabilitiesForm from 'containers/Forms/CapabilitiesForm'

const Form = ({ submittedStages, setSubmittedStages, isEdit }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [isPopup, setIsPopup] = useState(
    isEdit ? false : !!getFromLocalStorage('newUser')
  )

  const { activeFormStage, user } = useSelector((state) => state)

  const methods = useForm({
    mode: 'onChange',
    shouldUnregister: false
  })

  const { getValues, handleSubmit, reset, watch, trigger, formState } = methods

  const onSubmit = (data) => {
    dispatch(addUser({ ...data, lastUpdate: new Date() }))
    history.push('/')
  }

  const onSave = async (e) => {
    e.preventDefault()
    const result = await trigger()
    if (result) {
      dispatch(updateUser(user.id, { ...getValues(), lastUpdate: new Date() }))
      history.push(`profile/${user.id}`)
    }
  }

  const handleContinue = () => {
    reset(getFromLocalStorage('newUser'))

    if (getFromLocalStorage('newUserStage'))
      dispatch(changeActiveFormStage(getFromLocalStorage('newUserStage')))

    setSubmittedStages(getFromLocalStorage('submittedStages'))

    setIsPopup(false)
  }

  const handleClose = () => {
    localStorage.clear()
    setToLocalStorage('submittedStages', submittedStages)
    setIsPopup(false)
  }

  useEffect(() => {
    if (isEdit) reset({ ...user })
  }, [user])

  useEffect(() => {
    if (!isPopup && !isEdit) {
      if (formState.isDirty) {
        setToLocalStorage('newUser', {
          ...getFromLocalStorage('newUser'),
          ...getValues()
        })
      }
    }
  }, [watch()])

  useEffect(() => () => dispatch(changeActiveFormStage(ACCOUNT_FORM_STAGE)), [])

  return (
    <FormProvider {...methods}>
      {isPopup && (
        <ContinuePopup
          handleContinue={handleContinue}
          handleClose={handleClose}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {activeFormStage === ACCOUNT_FORM_STAGE && (
          <AccountForm
            setSubmittedStages={setSubmittedStages}
            handleSave={onSave}
            isEdit={isEdit}
          />
        )}

        {activeFormStage === PROFILE_FORM_STAGE && (
          <ProfileForm
            setSubmittedStages={setSubmittedStages}
            handleSave={onSave}
            isEdit={isEdit}
          />
        )}

        {activeFormStage === CONTACTS_FORM_STAGE && (
          <ContactsForm
            setSubmittedStages={setSubmittedStages}
            handleSave={onSave}
            isEdit={isEdit}
          />
        )}

        {activeFormStage === CAPABILITIES_FORM_STAGE && (
          <CapabilitiesForm handleSave={onSave} isEdit={isEdit} />
        )}
      </form>
    </FormProvider>
  )
}

Form.propTypes = {
  setSubmittedStages: T.func,
  submittedStages: T.object,
  activeFormStage: T.string,
  isEdit: T.bool
}

export default Form
