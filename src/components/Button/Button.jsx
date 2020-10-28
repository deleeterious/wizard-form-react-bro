import React, { memo } from 'react';
// prop-types
import T from 'prop-types';
// utils
import { concatStyles } from 'utils';
// css
import classes from './Button.module.css';

const Button = ({
  type,
  children,
  className,
  handleClick,
  disabled = true,
}) => (
  <div className={classes.buttonContainer}>
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={concatStyles(
        classes.button,
        className,
        disabled ? classes.disabled : null
      )}
    >
      {children}
    </button>
  </div>
);

Button.propTypes = {
  type: T.string,
  children: T.string,
  className: T.string,
  handleClick: T.func,
  disabled: T.oneOfType([T.bool, T.number]),
};

export default memo(Button);
