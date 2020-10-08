import React from 'react'
// prop-types
import T from 'prop-types'
// utils
import { concatStyles } from 'utils'
// css
import commonStyles from 'components/Inputs/common/styles.module.css'
import classes from './RadioInput.module.css'

const RadioInput = ({ refRegister }) => (
  <div className={commonStyles.inputCont}>
    <div className={commonStyles.inputLabel}>Gender</div>
    <label htmlFor="male">
      <input
        defaultChecked
        ref={refRegister}
        type="radio"
        name="gender"
        id="male"
        value="Male"
      />
      <span className={concatStyles(classes.gender, classes.mr60)}>Male</span>
    </label>
    <label htmlFor="female">
      <input
        ref={refRegister}
        type="radio"
        name="gender"
        id="female"
        value="Female"
      />
      <span className={classes.gender}>Female</span>
    </label>
  </div>
)

RadioInput.propTypes = {
  refRegister: T.func
}

export default RadioInput
