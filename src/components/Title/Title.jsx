import React from 'react'
// prop-types
import T from 'prop-types'
// components
import LinkBack from 'components/LinkBack'
// css
import classes from './Title.module.css'

const Title = ({ children, linkBackPath, linkBackTitle }) => (
  <div className={classes.titleCont}>
    {linkBackPath ? (
      <LinkBack to={linkBackPath}>{linkBackTitle}</LinkBack>
    ) : null}
    <h1 className={classes.title}>{children}</h1>
  </div>
)

Title.propTypes = {
  children: T.string,
  linkBackPath: T.string,
  linkBackTitle: T.string
}

export default Title
