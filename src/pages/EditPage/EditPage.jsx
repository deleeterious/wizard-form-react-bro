import React, { useEffect } from 'react'
// prop-types
import T from 'prop-types'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from 'redux/actions'
// components
import Title from 'components/Title/Title'
import LinkBack from 'components/LinkBack'
// containers
import FormNavigation from 'containers/FormNavigation'
import AccountForm from 'containers/Forms/AccountForm'
import CapabilitiesForm from 'containers/Forms/CapabilitiesForm'
import ContactsForm from 'containers/Forms/ContactsForm'
import ProfileForm from 'containers/Forms/ProfileForm'

const EditPage = ({ match }) => {
  const { id } = match.params

  const dispatch = useDispatch()

  const activeFormStage = useSelector((state) => state.activeFormStage)

  useEffect(() => {
    dispatch(getUser(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="container">
      <Title title="Editing">
        <LinkBack to={`/profile/${id}`}>User Profile</LinkBack>
      </Title>
      <FormNavigation activeFormStage={activeFormStage} isEdit />
      {activeFormStage === 1 && <AccountForm id={id} isEdit />}
      {activeFormStage === 2 && <ProfileForm id={id} isEdit />}
      {activeFormStage === 3 && <ContactsForm id={id} isEdit />}
      {activeFormStage === 4 && <CapabilitiesForm id={id} isEdit />}
    </main>
  )
}

EditPage.propTypes = {
  match: T.object
}

export default EditPage
