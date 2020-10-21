import React from 'react'
// prop-types
import T from 'prop-types'
// helpers
import { getFromLocalStorage } from 'helpers/localStorageHelper'
// utils
import { concatStyles } from 'utils'
// css
import classes from './FormNavigationItem.module.css'

const FormNavigationItem = ({ title, isActive, isSubmitted, onStepChange }) => {
  return (
    <div
      className={concatStyles(
        classes.navItem,
        isSubmitted ? classes.submitted : null,
        isActive ? classes.active : null
      )}
      onClick={onStepChange}
      style={{ cursor: onStepChange ? 'pointer' : 'default' }}
    >
      <div>{title}</div>
    </div>
  )
}

FormNavigationItem.propTypes = {
  title: T.string,
  isActive: T.bool,
  isSubmitted: T.bool,
  onStepChange: T.func
}

export default FormNavigationItem
