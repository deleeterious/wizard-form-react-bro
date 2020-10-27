import db from 'db';
import {
  ADD_USER,
  DELETE_USER,
  LOAD_USERS_FAILED,
  LOAD_USERS_PENDING,
  LOAD_USERS_SUCCESS,
  UPDATE_USER,
} from 'redux/types';

export const loadUsers = () => {
  return (dispatch) => {
    dispatch({ type: LOAD_USERS_PENDING });

    db.table('users')
      .toArray()
      .then((users) => {
        dispatch({
          type: LOAD_USERS_SUCCESS,
          payload: users,
        });
      })
      .catch((err) => {
        dispatch({ type: LOAD_USERS_FAILED, payload: err });
      });
  };
};

export const updateUser = (id, payload) => {
  return (dispatch) => {
    db.table('users')
      .update(id, { ...payload })
      .then(() => {
        dispatch({
          type: UPDATE_USER,
          payload: { id, changes: payload },
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
};

export const addUser = (user) => {
  return (dispatch) => {
    db.table('users')
      .add(user)
      .then((id) => {
        dispatch({
          type: ADD_USER,
          payload: { ...user, id },
        });

        localStorage.clear();
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
};

export const deleteUser = (id) => {
  return (dispatch) => {
    db.table('users')
      .delete(id)
      .then(() => {
        dispatch({
          type: DELETE_USER,
          payload: id,
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
};
