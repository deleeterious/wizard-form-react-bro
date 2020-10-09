import React from 'react'
// react-redux
import { useSelector } from 'react-redux'
// components
import Title from 'components/Title'
// containers
import FormNavigation from 'containers/FormNavigation'
import AccountForm from 'containers/Forms/AccountForm'
import ProfileForm from 'containers/Forms/ProfileForm'
import ContactsForm from 'containers/Forms/ContactsForm'
import CapabilitiesForm from 'containers/Forms/CapabilitiesForm/CapabilitiesForm'

const FormsPage = () => {
  const activeFormStage = useSelector((state) => state.activeFormStage)

  return (
    <main className="container">
      <Title content="Adding new user" />
      <FormNavigation activeFormStage={activeFormStage} />
      {activeFormStage === 1 && <AccountForm />}
      {activeFormStage === 2 && <ProfileForm />}
      {activeFormStage === 3 && <ContactsForm />}
      {activeFormStage === 4 && <CapabilitiesForm />}
    </main>
  )
}

export default FormsPage
