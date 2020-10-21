import React, { useState } from 'react'
// react-redux
import { useSelector } from 'react-redux'
// components
import Title from 'components/Title'
// containers
import Form from 'containers/Form'
import FormNavigation from 'containers/FormNavigation'

const FormsPage = () => {
  const activeFormStage = useSelector((state) => state.activeFormStage)

  const [submittedStages, setSubmittedStages] = useState([])

  return (
    <main className="container">
      <Title>Adding new user</Title>
      <FormNavigation
        submittedStages={submittedStages}
        activeFormStage={activeFormStage}
      />
      <Form setSubmittedStages={setSubmittedStages} />
    </main>
  )
}

export default FormsPage
