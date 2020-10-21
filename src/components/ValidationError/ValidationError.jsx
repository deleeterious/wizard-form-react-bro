import React, { memo } from 'react'
// prop-types
import T from 'prop-types'
// css
import classes from './ValidationError.module.css'

const ValidationError = ({ errorMessage }) => (
  <div className={classes.validMess}>{errorMessage}</div>
)

ValidationError.propTypes = {
  errorMessage: T.string
}

export default memo(ValidationError)
