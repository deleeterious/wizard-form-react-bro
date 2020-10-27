import db from 'db';
import {
  LOAD_USER_FAILED,
  LOAD_USER_PENDING,
  LOAD_USER_SUCCESS,
} from 'redux/types';

export const getUser = (id) => {
  return (dispatch) => {
    dispatch({ type: LOAD_USER_PENDING });

    db.table('users')
      .get(+id)
      .then((user) => {
        dispatch({
          type: LOAD_USER_SUCCESS,
          payload: user,
        });
      })
      .catch((err) => {
        dispatch({ type: LOAD_USER_FAILED, payload: err });
      });
  };
};
