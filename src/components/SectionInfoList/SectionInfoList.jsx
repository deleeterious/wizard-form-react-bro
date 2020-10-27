import React from 'react';
// prop-types
import T from 'prop-types';
// css
import classes from './SectionInfoList.module.css';

const SectionInfoList = ({ data }) => (
  <div className={classes.infoList}>
    {data.map(
      ({ label, value, render }, i) =>
        render || (
          <div className={classes.infoListItem} key={i}>
            <div className={classes.infoListItemTitle}>{label}:</div>
            <div className={classes.infoListItemValue}>{value}</div>
          </div>
        )
    )}
  </div>
);

SectionInfoList.propTypes = {
  data: T.arrayOf(T.object),
};

export default SectionInfoList;
