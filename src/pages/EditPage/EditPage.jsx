import React, { useEffect } from 'react'
// prop-types
import T from 'prop-types'
// constants
import { ACCOUNT_FORM_STAGE } from 'constants.js'
// redux
import { useDispatch, useSelector } from 'react-redux'
import {
  changeActiveFormStage,
  clearNewUser,
  getUser,
  setEdit
} from 'redux/actions'
// components
import Title from 'components/Title'
// containers
import FormNavigation from 'containers/FormNavigation'
import Form from 'containers/Form'

const EditPage = ({ match }) => {
  const { id } = match.params

  const dispatch = useDispatch()

  const activeFormStage = useSelector((state) => state.activeFormStage)

  useEffect(() => {
    dispatch(getUser(id))
    dispatch(setEdit(true))
    return () => {
      dispatch(setEdit(false))
      dispatch(clearNewUser())
      dispatch(changeActiveFormStage(ACCOUNT_FORM_STAGE))
    }
  }, [id])

  return (
    <main className="container">
      <Title linkBackPath={`/profile/${id}`} linkBackTitle="User Profile">
        Editing
      </Title>
      <FormNavigation activeFormStage={activeFormStage} isEdit />
      <Form activeFormStage={activeFormStage} isEdit />
    </main>
  )
}

EditPage.propTypes = {
  match: T.object
}

export default EditPage
