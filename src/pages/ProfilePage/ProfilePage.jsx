import React, { memo, useEffect } from 'react';
// prop-types
import T from 'prop-types';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getUser, resetUser } from 'redux/actions/currentUser';
// components
import Title from 'components/Title';
import UserInfo from 'components/UserInfo';
import Spinner from 'components/Spinner';

const ProfilePage = ({ match }) => {
  const dispatch = useDispatch();

  const { data, isFetching } = useSelector((state) => state.currentUser);

  useEffect(() => {
    dispatch(getUser(match.params.id));
    return () => {
      dispatch(resetUser());
    };
  }, [dispatch, match.params.id]);

  return (
    <main className="container">
      <Title linkBackPath="/" linkBackTitle="Users List">
        {data.userName}
      </Title>
      {isFetching ? <Spinner /> : <UserInfo user={data} />}
    </main>
  );
};

ProfilePage.propTypes = {
  match: T.object,
};

export default memo(ProfilePage);
