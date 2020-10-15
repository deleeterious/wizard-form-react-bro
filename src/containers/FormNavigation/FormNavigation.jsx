import React from 'react'
// prop-types
import T from 'prop-types'
// components
import FormNavigationItem from 'components/FormNavigationItem'
// css
import classes from './FormNavigation.module.css'
import { useDispatch } from 'react-redux'
import { changeActiveFormStage } from 'redux/actions'

const FormNavigation = ({ activeFormStage, isEdit = false }) => {
  const dispatch = useDispatch()

  const onStepChange = (stage) =>
    isEdit ? () => dispatch(changeActiveFormStage(stage)) : undefined

  return (
    <nav className={classes.nav}>
      <FormNavigationItem
        title="1. Account"
        isActive={activeFormStage === 1}
        onStepChange={onStepChange(1)}
      />

      <FormNavigationItem
        title="2. Profile"
        isActive={activeFormStage === 2}
        onStepChange={onStepChange(2)}
      />

      <FormNavigationItem
        title="3. Contacts"
        isActive={activeFormStage === 3}
        onStepChange={onStepChange(3)}
      />

      <FormNavigationItem
        title="4. Capabilities"
        isActive={activeFormStage === 4}
        onStepChange={onStepChange(4)}
      />
    </nav>
  )
}

FormNavigation.propTypes = {
  activeFormStage: T.number,
  isEdit: T.bool
}

export default FormNavigation
