import db from 'db';
import {
  ADD_USER_FAILED,
  ADD_USER_PENDING,
  ADD_USER_SUCCESS,
  DELETE_USER_FAILED,
  DELETE_USER_PENDING,
  DELETE_USER_SUCCESS,
  LOAD_USERS_FAILED,
  LOAD_USERS_PENDING,
  LOAD_USERS_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_PENDING,
  UPDATE_USER_SUCCESS,
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
    dispatch({ type: UPDATE_USER_PENDING });
    db.table('users')
      .update(id, payload)
      .then(() => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: { id, changes: payload },
        });
      })
      .catch((err) => {
        dispatch({ type: UPDATE_USER_FAILED, payload: err });
      });
  };
};

export const addUser = (user) => {
  return (dispatch) => {
    dispatch({ type: ADD_USER_PENDING });

    db.table('users')
      .add(user)
      .then((id) => {
        dispatch({
          type: ADD_USER_SUCCESS,
          payload: { ...user, id },
        });

        localStorage.clear();
      })
      .catch((err) => {
        dispatch({ type: ADD_USER_FAILED, payload: err });
      });
  };
};

export const deleteUser = (id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_USER_PENDING });

    db.table('users')
      .delete(id)
      .then(() => {
        dispatch({
          type: DELETE_USER_SUCCESS,
          payload: id,
        });
      })
      .catch((err) => {
        dispatch({ type: DELETE_USER_FAILED, payload: err });
      });
  };
};

export const generateUsers = (generatedUsers) => {
  return async (dispatch) => {
    await db.table('users').clear();
    await db.table('users').bulkAdd(generatedUsers);
    dispatch(loadUsers());
  };
};
