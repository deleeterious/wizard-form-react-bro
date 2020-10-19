import React, { useEffect } from 'react'
// prop-types
import T from 'prop-types'
// constants
import { ACCOUNT_FORM_STAGE } from 'constants.js'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { changeActiveFormStage, getUser } from 'redux/actions'
// components
import Title from 'components/Title'
// containers
import FormNavigation from 'containers/FormNavigation'
import Form from 'containers/Form'

const EditPage = ({ match }) => {
  const dispatch = useDispatch()

  const activeFormStage = useSelector((state) => state.activeFormStage)

  useEffect(() => {
    dispatch(getUser(match.params.id))
    return () => {
      dispatch(changeActiveFormStage(ACCOUNT_FORM_STAGE))
    }
  }, [match.params.id])

  return (
    <main className="container">
      <Title
        linkBackPath={`/profile/${match.params.id}`}
        linkBackTitle="User Profile"
      >
        Editing
      </Title>
      <FormNavigation activeFormStage={activeFormStage} isEdit />
      <Form isEdit />
    </main>
  )
}

EditPage.propTypes = {
  match: T.object
}

export default EditPage
