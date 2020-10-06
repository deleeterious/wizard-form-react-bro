import React from 'react'
// react-redux
import { useSelector } from 'react-redux'
// containers
import FormNav from 'containers/FormNav'
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
      <FormNav />
      {activeFormStage === 1 ? <AccountForm /> : null}
      {activeFormStage === 2 ? <ProfileForm /> : null}
      {activeFormStage === 3 ? <ContactsForm /> : null}
      {activeFormStage === 4 ? <CapabilitiesForm /> : null}
    </main>
  )
}

export default FormsPage
