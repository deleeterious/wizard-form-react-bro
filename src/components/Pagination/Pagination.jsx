import React from 'react'
// prop-types
import T from 'prop-types'
// css
import classes from './Pagination.module.css'

const Pagination = ({ totalUsers, usersPerPage, handleChangePage }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className={classes.pagination}>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={classes.button}
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
  handleChangePage: T.func
}

export default Pagination
