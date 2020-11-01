import React, { memo } from 'react';
// prop-types
import T from 'prop-types';
// css
import classes from './Placeholder.module.css';

const Placeholder = ({ title }) => (
  <div className={classes.container}>
    <h2 className={classes.title}>{title}</h2>
  </div>
);

Placeholder.propTypes = {
  title: T.string,
};

export default memo(Placeholder);
