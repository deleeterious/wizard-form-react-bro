import React from 'react'
// prop-types
import PropTypes from 'prop-types'
// css
import classes from './WrappedInput.module.css'

const WrappedInput = ({ name, type, title, refRegister, errors }) => {
  return (
    <div className={classes.inputCont}>
      <label htmlFor={name}>
        <div className={classes.inputLabel}>{title}</div>
        <input
          type={type}
          name={name}
          id={name}
          className={classes.input}
          ref={refRegister}
        />
        {errors[name] && (
          <div className={classes.validMess}>This field is required</div>
        )}
      </label>
    </div>
  )
}

WrappedInput.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  refRegister: PropTypes.func,
  errors: PropTypes.shape({
    massage: PropTypes.string,
    ref: PropTypes.node
  })
}

export default WrappedInput
