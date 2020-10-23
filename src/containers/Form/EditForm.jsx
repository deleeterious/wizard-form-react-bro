/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect } from 'react'
// prop-types
import T from 'prop-types'
// react-hook-form
import { FormProvider, useForm } from 'react-hook-form'
// react-redux
import { useDispatch, useSelector } from 'react-redux'
import { changeActiveFormStage, updateUser } from 'redux/actions'
// react-router-dom
import { useHistory } from 'react-router-dom'
// constants
import {
  ACCOUNT_FORM_STAGE,
  CAPABILITIES_FORM_STAGE,
  CONTACTS_FORM_STAGE,
  PROFILE_FORM_STAGE
} from 'constants.js'
// containers
import AccountForm from 'containers/Forms/AccountForm'
import ProfileForm from 'containers/Forms/ProfileForm'
import ContactsForm from 'containers/Forms/ContactsForm'
import CapabilitiesForm from 'containers/Forms/CapabilitiesForm'

const Form = () => {
  const isEdit = true
  const dispatch = useDispatch()
  const history = useHistory()

  const { activeFormStage, user } = useSelector((state) => state)

  const methods = useForm({
    mode: 'onChange',
    shouldUnregister: false
  })

  const { getValues, reset, trigger } = methods

  // On click "Save" trigger validation, if form valid update user
  const onSave = async (e) => {
    e.preventDefault()
    const result = await trigger()
    if (result) {
      dispatch(updateUser(user.id, { ...getValues(), lastUpdate: new Date() }))
      history.push(`profile/${user.id}`)
    }
  }

  // When component did mount, push to form inputs data from redux
  useEffect(() => {
    if (isEdit) reset({ ...user })
  }, [user])

  // If you go other stage and don't save form, reset values, on component unmount
  useEffect(
    () => () => {
      if (isEdit) reset({ ...user })
    },
    [activeFormStage]
  )

  // Return to first step when component unmount
  useEffect(() => () => dispatch(changeActiveFormStage(ACCOUNT_FORM_STAGE)), [])

  return (
    <FormProvider {...methods}>
      <form>
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
  setSubmittedStages: T.func,
  submittedStages: T.object,
  activeFormStage: T.string,
  isEdit: T.bool
}

export default memo(Form)
