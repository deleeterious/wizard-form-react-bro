import React, { memo, useEffect, useState } from 'react';
// react-redux
import { useDispatch, useSelector } from 'react-redux';
import { generateUsers, loadUsers } from 'redux/actions/users';
// components
import Title from 'components/Title';
import NoUsersPlaceholder from 'components/NoUsersPlaceholder';
import Spinner from 'components/Spinner';

import Pagination from 'components/Pagination';
// containers
import UserList from 'containers/UserList';
import GenerateUsersButton from 'components/GenerateUsersButton/GenerateUsersButton';
import Search from 'components/Inputs/Search/Search';

const UserListPage = () => {
  const dispatch = useDispatch();

  const { data, isFetching } = useSelector((state) => state.users);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [usersPerPage] = useState(5);

  useEffect(() => dispatch(loadUsers()), [dispatch]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data?.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => dispatch(loadUsers()), [dispatch]);
  const foundUsers = data?.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .trim()
      .toLowerCase()
      .includes(searchValue.trim().toLowerCase())
  );

  const onChangePage = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  const onSearch = (e) => setSearchValue(e.target.value);

  useEffect(() => dispatch(loadUsers()), [dispatch]);

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <main className="container">
      <Title>List of users</Title>
      {data.length ? (
        <>
          <Search handleSearch={onSearch} />
          <UserList users={searchValue ? foundUsers : currentUsers} />
        </>
      ) : (
        <NoUsersPlaceholder />
      )}

      <GenerateUsersButton />

      {!searchValue.length ? (
        <Pagination
          currentPage={currentPage}
          usersPerPage={usersPerPage}
          totalUsers={data.length}
          handleChangePage={onChangePage}
        />
      ) : null}
    </main>
  );
};

export default memo(UserListPage);
