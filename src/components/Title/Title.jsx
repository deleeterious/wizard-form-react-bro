import React from 'react'
// prop-types
import T from 'prop-types'
// css
import classes from './Title.module.css'

const Title = ({ title, children }) => (
  <div className={classes.titleCont}>
    {children}
    <h1 className={classes.title}>{title}</h1>
  </div>
)

Title.propTypes = {
  title: T.string
}

export default Title
