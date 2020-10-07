import Title from 'components/Title/Title'
import FormNavigation from 'containers/FormNavigation'
import AccountForm from 'containers/Forms/AccountForm/AccountForm'
import CapabilitiesForm from 'containers/Forms/CapabilitiesForm/CapabilitiesForm'
import ContactsForm from 'containers/Forms/ContactsForm/ContactsForm'
import ProfileForm from 'containers/Forms/ProfileForm/ProfileForm'
import React from 'react'
import { useSelector } from 'react-redux'

const EditPage = () => {
  const activeFormStage = useSelector((state) => state.activeFormStage)
  return (
    <main className="container">
      <Title content="Editing" />
      <FormNavigation activeFormStage={activeFormStage} isEdit />
      {activeFormStage === 1 ? <AccountForm /> : null}
      {activeFormStage === 2 ? <ProfileForm /> : null}
      {activeFormStage === 3 ? <ContactsForm /> : null}
      {activeFormStage === 4 ? <CapabilitiesForm /> : null}
    </main>
  )
}

export default EditPage
