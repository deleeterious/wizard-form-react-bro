import React from 'react'
// prop-types
import T from 'prop-types'
// css
import classes from './CheckboxInputItem.module.css'

const CheckboxInputItem = ({ title, name, refRegister }) => (
  <label htmlFor={name} className={classes.checkboxLabelCont}>
    <input
      name={name}
      id={name}
      value={title}
      type="checkbox"
      ref={refRegister}
    />
    <span className={classes.checkboxLabel}>{title}</span>
  </label>
)

CheckboxInputItem.propTypes = {
  title: T.string,
  name: T.string,
  refRegister: T.func
}

export default CheckboxInputItem
