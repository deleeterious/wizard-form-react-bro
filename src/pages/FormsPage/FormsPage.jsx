import React, { useEffect, useState } from 'react'
// react-redux
import { useDispatch, useSelector } from 'react-redux'
import { changeActiveFormStage, clearNewUser } from 'redux/actions'
import { ACCOUNT_FORM_STAGE } from 'constants.js'
// components
import Title from 'components/Title'
import ContinuePopup from 'components/ContinuePopup'
// containers
import FormNavigation from 'containers/FormNavigation'
import AccountForm from 'containers/Forms/AccountForm'
import ProfileForm from 'containers/Forms/ProfileForm'
import ContactsForm from 'containers/Forms/ContactsForm'
import CapabilitiesForm from 'containers/Forms/CapabilitiesForm'

const FormsPage = () => {
  const dispatch = useDispatch()

  const activeFormStage = useSelector((state) => state.activeFormStage)

  const [isPopup, setIsPopup] = useState(!!localStorage.account)
  const [isContinue, setIsContinue] = useState(false)

  const handleContinue = () => {
    setIsContinue(true)
    setIsPopup(false)
  }

  const handleClose = () => {
    setIsContinue(false)
    setIsPopup(false)
  }

  useEffect(
    () => () => {
      dispatch(clearNewUser())
      dispatch(changeActiveFormStage(ACCOUNT_FORM_STAGE))
    },
    []
  )

  return (
    <main className="container">
      <Title>Adding new user</Title>
      <FormNavigation activeFormStage={activeFormStage} />
      {isPopup && (
        <ContinuePopup
          handleContinue={handleContinue}
          handleClose={handleClose}
        />
      )}
      {activeFormStage === 1 && <AccountForm isContinue={isContinue} />}
      {activeFormStage === 2 && <ProfileForm isContinue={isContinue} />}
      {activeFormStage === 3 && <ContactsForm isContinue={isContinue} />}
      {activeFormStage === 4 && <CapabilitiesForm isContinue={isContinue} />}
    </main>
  )
}

export default FormsPage
