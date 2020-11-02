import React from 'react';
// prop-types
import T from 'prop-types';
// css
import classes from './Search.module.css';

const Search = ({ handleSearch }) => (
  <div className={classes.search}>
    <input
      type="text"
      placeholder="Search..."
      onChange={(e) => handleSearch(e)}
    />
  </div>
);

Search.propTypes = {
  handleSearch: T.func,
};

export default Search;
