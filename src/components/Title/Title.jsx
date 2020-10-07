import React from 'react'
// prop-types
import PropTypes from 'prop-types'
// css
import classes from './Title.module.css'

const Title = ({ content }) => (
  <div className={classes.title}>
    <h1>{content}</h1>
  </div>
)

Title.propTypes = {
  content: PropTypes.string
}

export default Title
