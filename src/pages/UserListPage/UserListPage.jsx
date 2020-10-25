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

const UserListPage = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const { data, isFetching } = useSelector((state) => state.users);

  useEffect(() => dispatch(loadUsers()), [dispatch]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data?.slice(indexOfFirstUser, indexOfLastUser);

  const onChangePage = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <main className="container">
      <Title>List of users</Title>
      {data.length ? <UserList users={currentUsers} /> : <NoUsersPlaceholder />}

      <GenerateUsersButton />

      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={data.length}
        handleChangePage={onChangePage}
      />
    </main>
  );
};

export default memo(UserListPage);
