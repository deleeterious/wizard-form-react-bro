import React from 'react'
// prop-types
import T from 'prop-types'
// utils
import { concatStyles } from 'utils'
// css
import classes from './Pagination.module.css'

const Pagination = ({
  totalUsers,
  usersPerPage,
  currentPage,
  handleChangePage
}) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className={classes.pagination}>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={concatStyles(
            classes.button,
            currentPage === number && classes.active
          )}
          onClick={(e) => handleChangePage(e, number)}
        >
          {number}
        </button>
      ))}
    </nav>
  )
}

Pagination.propTypes = {
  totalUsers: T.number,
  usersPerPage: T.number,
  currentPage: T.number,
  handleChangePage: T.func
}

export default Pagination
