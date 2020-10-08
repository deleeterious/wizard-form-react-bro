import React from 'react'
// prop-types
import T from 'prop-types'
// redux
import { useSelector } from 'react-redux'
// components
import Title from 'components/Title/Title'
// containers
import FormNavigation from 'containers/FormNavigation'
import AccountForm from 'containers/Forms/AccountForm/AccountForm'
import CapabilitiesForm from 'containers/Forms/CapabilitiesForm/CapabilitiesForm'
import ContactsForm from 'containers/Forms/ContactsForm/ContactsForm'
import ProfileForm from 'containers/Forms/ProfileForm/ProfileForm'

const EditPage = ({ match }) => {
  const activeFormStage = useSelector((state) => state.activeFormStage)
  const { id } = match.params
  return (
    <main className="container">
      <Title content="Editing" />
      <FormNavigation activeFormStage={activeFormStage} isEdit />
      {activeFormStage === 1 ? <AccountForm id={id} isEdit /> : null}
      {activeFormStage === 2 ? <ProfileForm id={id} isEdit /> : null}
      {activeFormStage === 3 ? <ContactsForm id={id} isEdit /> : null}
      {activeFormStage === 4 ? <CapabilitiesForm id={id} isEdit /> : null}
    </main>
  )
}

EditPage.propTypes = {
  match: T.object
}

export default EditPage
