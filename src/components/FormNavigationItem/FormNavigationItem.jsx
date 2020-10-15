import React from 'react'
// prop-types
import T from 'prop-types'
// utils
import { concatStyles } from 'utils'
// css
import classes from './FormNavigationItem.module.css'

const FormNavigationItem = ({ title, isActive, onStepChange }) => {
  return (
    <div
      className={concatStyles(
        classes.navItem,
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
  onStepChange: T.func
}

export default FormNavigationItem
