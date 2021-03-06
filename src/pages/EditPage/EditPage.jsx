import React, { memo, useEffect } from 'react';
// prop-types
import T from 'prop-types';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'redux/actions/currentUser';

// components
import Title from 'components/Title';
// containers
import FormNavigation from 'containers/FormNavigation';
import EditForm from 'containers/Form/EditForm';

const EditPage = ({ match }) => {
  const dispatch = useDispatch();

  const activeFormStage = useSelector((state) => state.activeFormStage);

  useEffect(() => {
    dispatch(getUser(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <main className="container">
      <Title
        linkBackPath={`/profile/${match.params.id}`}
        linkBackTitle="User Profile"
      >
        Editing
      </Title>
      <FormNavigation activeFormStage={activeFormStage} isEdit />
      <EditForm />
    </main>
  );
};

EditPage.propTypes = {
  match: T.object,
};

export default memo(EditPage);
