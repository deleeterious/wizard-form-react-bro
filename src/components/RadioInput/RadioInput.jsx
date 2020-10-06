import React from 'react'
// prop-types
import PropTypes from 'prop-types'
// css
import classes from '../TextInput/TextInput.module.css'
import radioClasses from './RadioInput.module.css'

const RadioInput = ({ refRegister }) => {
  return (
    <div className={classes.inputCont}>
      <div className={classes.inputLabel}>Gender</div>
      <label htmlFor="male">
        <input
          defaultChecked
          ref={refRegister}
          type="radio"
          name="gender"
          id="male"
          value="Male"
        />
        <span className={radioClasses.gender} style={{ marginRight: 60 }}>
          Male
        </span>
      </label>
      <label htmlFor="female">
        <input
          ref={refRegister}
          type="radio"
          name="gender"
          id="female"
          value="Female"
        />
        <span className={radioClasses.gender}>Female</span>
      </label>
    </div>
  )
}

RadioInput.propTypes = {
  refRegister: PropTypes.func
}

export default RadioInput
