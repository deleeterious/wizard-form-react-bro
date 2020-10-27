import React, { memo } from 'react';
// prop-types
import T from 'prop-types';
// react-router
import { Link } from 'react-router-dom';
// assets
import { ReactComponent as LinkBackIcon } from 'assets/icons/link-back.svg';
// css
import classes from './LinkBack.module.css';

const LinkBack = ({ children, to }) => {
  return (
    <Link className={classes.linkBack} to={to}>
      <LinkBackIcon />
      <span className={classes.title}>{children}</span>
    </Link>
  );
};

LinkBack.propTypes = {
  children: T.string,
  to: T.string,
};

export default memo(LinkBack);
