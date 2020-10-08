import React from 'react'
// prop-types
import T from 'prop-types'
// css
import commonStyles from 'components/Inputs/common/styles.module.css'
import classes from './CheckboxInput.module.css'

const CheckboxInput = ({ children, title }) => {
  return (
    <div className={commonStyles.inputCont}>
      <label htmlFor="checkbox" className={classes.checkboxCont}>
        <div className={commonStyles.inputLabel}>{title}</div>
        {children}
      </label>
    </div>
  )
}

CheckboxInput.propTypes = {
  // children: T.object,
  title: T.string
}

export default CheckboxInput
