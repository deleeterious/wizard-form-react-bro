import React, { memo } from 'react'
// prop-types
import T from 'prop-types'
// utils
import { concatStyles } from 'utils'
// css
import classes from './FormNavigationItem.module.css'

const FormNavigationItem = ({ title, isActive, isSubmitted, onStepChange }) => (
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

FormNavigationItem.propTypes = {
  title: T.string,
  isActive: T.bool,
  isSubmitted: T.bool,
  onStepChange: T.func
}

export default memo(FormNavigationItem)
