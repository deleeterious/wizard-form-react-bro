import React from 'react';
// prop-types
import T from 'prop-types';
// react-router-dom
import { Link } from 'react-router-dom';
// assets
import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
// css
import classes from './SectionInfoTitle.module.css';

const SectionInfoTitle = ({ children, id, formStage }) => (
  <div className={classes.sectionTitle}>
    <div>{children}</div>
    <Link to={`/edit/${id}/${formStage}`}>
      <EditIcon className={classes.editIcon} />
    </Link>
  </div>
);

SectionInfoTitle.propTypes = {
  children: T.string,
  id: T.number,
  formStage: T.string,
};

export default SectionInfoTitle;
