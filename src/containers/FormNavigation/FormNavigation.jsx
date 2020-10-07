import React from 'react'
import FormNavigationItem from 'components/FormNavigationItem'
// css
import classes from './FormNavigation.module.css'

const FormNavigation = ({ activeFormStage, isEdit = false }) => (
  <nav className={classes.nav}>
    <FormNavigationItem
      title="1. Account"
      isActive={activeFormStage === 1}
      stage={1}
      isEdit={isEdit}
    />

    <FormNavigationItem
      title="2. Profile"
      isActive={activeFormStage === 2}
      stage={2}
      isEdit={isEdit}
    />

    <FormNavigationItem
      title="3. Contacts"
      isActive={activeFormStage === 3}
      stage={3}
      isEdit={isEdit}
    />

    <FormNavigationItem
      title="4. Capabilities"
      isActive={activeFormStage === 4}
      stage={4}
      isEdit={isEdit}
    />
  </nav>
)

export default FormNavigation
