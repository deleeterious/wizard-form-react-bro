import React, { memo } from 'react';
// prop-types
import T from 'prop-types';
import { ReactComponent as CloseIcon } from 'assets/icons/delete.svg';
// css
import classes from './ContinuePopup.module.css';

const ContinuePopup = ({ handleContinue, handleClose }) => (
  <div className={classes.popup}>
    <div className={classes.popupTextContent}>
      You have an unsaved user data. Do you want to complete it?
    </div>
    <div className={classes.button} onClick={handleContinue}>
      Continue
    </div>
    <div className={classes.closeButton} onClick={handleClose}>
      <CloseIcon />
    </div>
  </div>
);

ContinuePopup.propTypes = {
  handleContinue: T.func,
  handleClose: T.func,
};

export default memo(ContinuePopup);
