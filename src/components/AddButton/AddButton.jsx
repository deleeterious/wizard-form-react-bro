import React, { memo } from 'react';
// prop-types
import T from 'prop-types';
// assets
import { ReactComponent as AddIcon } from 'assets/icons/add.svg';
// css
import classes from './AddButton.module.css';

const AddButton = ({ onClick, children }) => (
  <button type="button" onClick={onClick} className={classes.button}>
    <AddIcon className={classes.icon} />
    <div>{children}</div>
  </button>
);

AddButton.propTypes = {
  onClick: T.func,
  children: T.string,
};

export default memo(AddButton);
