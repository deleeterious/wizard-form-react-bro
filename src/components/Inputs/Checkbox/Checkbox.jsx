import React, { memo } from 'react'
// prop-types
import T from 'prop-types'
// css
import commonStyles from 'components/Inputs/common/styles.module.css'
import classes from './Checkbox.module.css'

const Checkbox = ({ children, title }) => {
  return (
    <div className={commonStyles.inputCont}>
      <label htmlFor="checkbox" className={classes.checkboxCont}>
        <div className={commonStyles.inputLabel}>{title}</div>
        {children}
      </label>
    </div>
  )
}

Checkbox.propTypes = {
  children: T.arrayOf(T.element),
  title: T.string
}

export default memo(Checkbox)
