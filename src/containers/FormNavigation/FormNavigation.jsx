import React from 'react'
// prop-types
import T from 'prop-types'
// react-redux
import { useDispatch, useSelector } from 'react-redux'
import { changeActiveFormStage } from 'redux/actions'
// constants
import {
  ACCOUNT_FORM_STAGE,
  PROFILE_FORM_STAGE,
  CONTACTS_FORM_STAGE,
  CAPABILITIES_FORM_STAGE
} from 'constants.js'
// components
import FormNavigationItem from 'components/FormNavigationItem'
// css
import classes from './FormNavigation.module.css'

const FormNavigation = ({ submittedStages, isEdit }) => {
  const dispatch = useDispatch()

  const { activeFormStage } = useSelector((state) => state)

  const onStepChange = (stage) =>
    isEdit ? () => dispatch(changeActiveFormStage(stage)) : undefined

  return (
    <nav className={classes.nav}>
      <FormNavigationItem
        title="1. Account"
        isActive={activeFormStage === ACCOUNT_FORM_STAGE}
        isSubmitted={isEdit || submittedStages.includes(ACCOUNT_FORM_STAGE)}
        onStepChange={onStepChange(ACCOUNT_FORM_STAGE)}
      />

      <FormNavigationItem
        title="2. Profile"
        isActive={activeFormStage === PROFILE_FORM_STAGE}
        isSubmitted={isEdit || submittedStages.includes(PROFILE_FORM_STAGE)}
        onStepChange={onStepChange(PROFILE_FORM_STAGE)}
      />

      <FormNavigationItem
        title="3. Contacts"
        isActive={activeFormStage === CONTACTS_FORM_STAGE}
        isSubmitted={isEdit || submittedStages.includes(CONTACTS_FORM_STAGE)}
        onStepChange={onStepChange(CONTACTS_FORM_STAGE)}
      />

      <FormNavigationItem
        title="4. Capabilities"
        isActive={activeFormStage === CAPABILITIES_FORM_STAGE}
        isSubmitted={
          isEdit || submittedStages.includes(CAPABILITIES_FORM_STAGE)
        }
        onStepChange={onStepChange(CAPABILITIES_FORM_STAGE)}
      />
    </nav>
  )
}

FormNavigation.propTypes = {
  submittedStages: T.arrayOf(T.string),
  isEdit: T.bool
}

export default FormNavigation
