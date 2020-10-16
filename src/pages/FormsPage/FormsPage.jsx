import React, { useState } from 'react'
// react-redux
import { useSelector } from 'react-redux'

// components
import Title from 'components/Title'
import ContinuePopup from 'components/ContinuePopup'
// containers
import Form from 'containers/Form'
import FormNavigation from 'containers/FormNavigation'
import { getFromLocalStorage } from 'helpers/localStorageHelper'

const FormsPage = () => {
  const activeFormStage = useSelector((state) => state.activeFormStage)

  const [isPopup, setIsPopup] = useState(!!getFromLocalStorage('newUser'))
  const [isContinue, setIsContinue] = useState(false)

  const handleContinue = () => {
    setIsContinue(true)
    setIsPopup(false)
  }

  const handleClose = () => {
    localStorage.clear()
    setIsPopup(false)
  }

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
