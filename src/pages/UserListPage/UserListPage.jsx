import React, { memo, useCallback, useEffect, useState } from 'react';
// lodash
import debounce from 'lodash/debounce';
// react-router-dom
import { Link } from 'react-router-dom';
// react-redux
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers } from 'redux/actions/users';
// helpers
import {
  getFromLocalStorage,
  setToLocalStorage,
} from 'helpers/localStorageHelper';
// components
import Title from 'components/Title';
import Placeholder from 'components/Placeholder';
import Spinner from 'components/Spinner';
import Pagination from 'components/Pagination';
// containers
import UserList from 'containers/UserList';
import GenerateUsersButton from 'components/GenerateUsersButton';
import Search from 'components/Inputs/Search';
// css
import classes from './UserListPage.module.css';

const UserListPage = () => {
  const dispatch = useDispatch();

  const { data, isFetching } = useSelector((state) => state.users);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const usersPerPage = 5;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data?.slice(indexOfFirstUser, indexOfLastUser);

  // Change currentPage, if currentPage don't have items
  if (data.length && !currentUsers.length) {
    setCurrentPage(currentPage - 1);
  }

  // Load users, load currentPage from localStorage
  useEffect(() => {
    dispatch(loadUsers());
    setCurrentPage(getFromLocalStorage('currentPage'));
  }, [dispatch]);

  // Save currentPage to localStorage
  useEffect(() => {
    setToLocalStorage('currentPage', currentPage);
  }, [currentPage]);

  const onChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const foundUsers = data?.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .trim()
      .toLowerCase()
      .includes(searchValue.trim().toLowerCase())
  );

  // debounce func
  const delayedQuery = useCallback(
    debounce((e) => setSearchValue(e), 300),
    []
  );
  const onSearch = (e) => delayedQuery(e.target.value);

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <main className="container">
      <Title>List of users</Title>
      {data.length ? (
        <>
          <Search handleSearch={onSearch} />
          {foundUsers.length ? (
            <UserList users={searchValue ? foundUsers : currentUsers} />
          ) : (
            <Placeholder title="No search results" />
          )}
        </>
      ) : (
        <>
          <Placeholder title="No users here :(" />
          <div className={classes.button}>
            <Link className={classes.link} to="/new-user/account">
              Create new user
            </Link>
          </div>
        </>
      )}

      <GenerateUsersButton />

      {!searchValue.length && (
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={usersPerPage}
          totalItemsCount={data.length}
          onChange={onChangePage}
          hideDisabled
        />
      )}
    </main>
  );
};

export default memo(UserListPage);
