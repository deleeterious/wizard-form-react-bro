import React, { memo } from 'react';
import { Link } from 'react-router-dom';
// css
import classes from './NoUsersPlaceholder.module.css';

const NoUsersPlaceholder = () => (
  <div className={classes.container}>
    <h2 className={classes.title}>No users here :(</h2>
    <div className={classes.button}>
      <Link className={classes.link} to="/new-user">
        Create new user
      </Link>
    </div>
  </div>
);

export default memo(NoUsersPlaceholder);
