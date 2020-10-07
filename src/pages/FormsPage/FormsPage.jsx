import React from 'react'
// react-redux
import { useSelector } from 'react-redux'
// containers
import FormNavigation from 'containers/FormNavigation'
import AccountForm from 'containers/Forms/AccountForm'
import ProfileForm from 'containers/Forms/ProfileForm'
import ContactsForm from 'containers/Forms/ContactsForm'
import CapabilitiesForm from 'containers/Forms/CapabilitiesForm/CapabilitiesForm'
import Title from 'components/Title'

const FormsPage = () => {
  const activeFormStage = useSelector((state) => state.activeFormStage)

  return (
    <main className="container">
      <Title content="Adding new user" />
      <FormNavigation />
      {activeFormStage === 1 ? <AccountForm /> : null}
      {activeFormStage === 2 ? <ProfileForm /> : null}
      {activeFormStage === 3 ? <ContactsForm /> : null}
      <CapabilitiesForm />
    </main>
  )
}

export default FormsPage
