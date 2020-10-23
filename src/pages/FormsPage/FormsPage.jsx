import React, { memo, useState } from 'react'
// react-redux
import { useSelector } from 'react-redux'
// components
import Title from 'components/Title'
// containers
import FormNavigation from 'containers/FormNavigation'
import CreateForm from 'containers/Form/CreateForm'

const FormsPage = () => {
  const activeFormStage = useSelector((state) => state.activeFormStage)

  const [submittedStages, setSubmittedStages] = useState({
    ACCOUNT_FORM_STAGE: false,
    PROFILE_FORM_STAGE: false,
    CONTACT_FORM_STAGE: false,
    CAPABILITIES_FORM_STAGE: false
  })

  return (
    <main className="container">
      <Title>Adding new user</Title>
      <FormNavigation
        submittedStages={submittedStages}
        activeFormStage={activeFormStage}
      />
      <CreateForm
        submittedStages={submittedStages}
        setSubmittedStages={setSubmittedStages}
      />
    </main>
  )
}

export default memo(FormsPage)
