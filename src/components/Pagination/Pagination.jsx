import React from 'react';
// utils
import ReactPaginate from 'react-js-pagination';
// css
import classes from './Pagination.module.css';

const Pagination = (props) => (
  <ReactPaginate
    {...props}
    innerClass={classes.innerClass}
    itemClass={classes.itemClass}
    activeClass={classes.activeClass}
    linkClass={classes.linkClass}
    disabledClass={classes.disabledClass}
  />
);

export default Pagination;
