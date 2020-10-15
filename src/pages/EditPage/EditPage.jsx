import React, { useEffect } from 'react'
// prop-types
import T from 'prop-types'
// constants
import { ACCOUNT_FORM_STAGE } from 'constants.js'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { changeActiveFormStage, clearNewUser, getUser } from 'redux/actions'
// components
import Title from 'components/Title'
// containers
import FormNavigation from 'containers/FormNavigation'
import AccountForm from 'containers/Forms/AccountForm'
import CapabilitiesForm from 'containers/Forms/CapabilitiesForm'
import ContactsForm from 'containers/Forms/ContactsForm'
import ProfileForm from 'containers/Forms/ProfileForm'

const EditPage = ({ match }) => {
  const { id } = match.params

  const dispatch = useDispatch()

  const activeFormStage = useSelector((state) => state.activeFormStage)

  useEffect(() => {
    dispatch(getUser(id))
    return () => {
      dispatch(clearNewUser())
      dispatch(changeActiveFormStage(ACCOUNT_FORM_STAGE))
    }
  }, [])

  return (
    <main className="container">
      <Title linkBackPath={`/profile/${id}`} linkBackTitle="User Profile">
        Editing
      </Title>
      <FormNavigation activeFormStage={activeFormStage} isEdit />
      {activeFormStage === 1 && <AccountForm id={id} isEdit />}
      {activeFormStage === 2 && <ProfileForm id={id} isEdit />}
      {activeFormStage === 3 && <ContactsForm id={id} isEdit />}
      {activeFormStage === 4 && <CapabilitiesForm id={id} isEdit />}
    </main>
  )
}

EditPage.propTypes = {
  match: T.object
}

export default EditPage
