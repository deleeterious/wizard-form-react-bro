import React, { useEffect, useState } from 'react'
// react-redux
import { useDispatch, useSelector } from 'react-redux'
import { changeActiveFormStage, clearNewUser } from 'redux/actions'
import { ACCOUNT_FORM_STAGE } from 'constants.js'
// components
import Title from 'components/Title'
import ContinuePopup from 'components/ContinuePopup'
// containers
import Form from 'containers/Form'
import FormNavigation from 'containers/FormNavigation'

const FormsPage = () => {
  const dispatch = useDispatch()

  const activeFormStage = useSelector((state) => state.activeFormStage)

  const [isPopup, setIsPopup] = useState(!!localStorage[ACCOUNT_FORM_STAGE])
  const [isContinue, setIsContinue] = useState(false)

  const handleContinue = () => {
    setIsContinue(true)
    setIsPopup(false)
  }

  const handleClose = () => {
    localStorage.clear()
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
      <Form isContinue={isContinue} activeFormStage={activeFormStage} />
    </main>
  )
}

export default FormsPage
