import React from 'react'
// prop-types
import T from 'prop-types'
// css
import classes from './ValidationError.module.css'

const ValidationError = ({ errors, name }) => (
  <div className={classes.validMess}>{errors[name]?.message}</div>
)

ValidationError.propTypes = {
  errors: T.shape({
    message: T.string
  }),
  name: T.string
}

export default ValidationError
