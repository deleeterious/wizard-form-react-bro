import React from 'react'
// react-redux
import { useSelector } from 'react-redux'

// components
import Title from 'components/Title'
// containers
import Form from 'containers/Form'
import FormNavigation from 'containers/FormNavigation'

const FormsPage = () => {
  const activeFormStage = useSelector((state) => state.activeFormStage)

  return (
    <main className="container">
      <Title>Adding new user</Title>
      <FormNavigation activeFormStage={activeFormStage} />
      <Form />
    </main>
  )
}

export default FormsPage
