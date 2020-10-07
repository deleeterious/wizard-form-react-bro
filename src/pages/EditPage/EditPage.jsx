import Title from 'components/Title/Title'
import FormNavigation from 'containers/FormNavigation'
import AccountForm from 'containers/Forms/AccountForm/AccountForm'
import CapabilitiesForm from 'containers/Forms/CapabilitiesForm/CapabilitiesForm'
import ContactsForm from 'containers/Forms/ContactsForm/ContactsForm'
import ProfileForm from 'containers/Forms/ProfileForm/ProfileForm'
import React from 'react'
import { useSelector } from 'react-redux'

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

export default EditPage
