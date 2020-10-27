import React, { memo } from 'react';
// prop-types
import T from 'prop-types';
// components
import LinkBack from 'components/LinkBack';
// css
import classes from './Title.module.css';

const Title = ({ children, linkBackPath, linkBackTitle }) => (
  <div className={classes.title}>
    {linkBackPath ? (
      <LinkBack to={linkBackPath}>{linkBackTitle}</LinkBack>
    ) : null}
    <h1>{children}</h1>
  </div>
);

Title.propTypes = {
  children: T.string,
  linkBackPath: T.string,
  linkBackTitle: T.string,
};

export default memo(Title);
