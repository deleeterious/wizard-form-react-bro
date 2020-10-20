import db from 'db'

import {
  ADD_USER,
  CHANGE_ACTIVE_FORM_STAGE,
  LOAD_USERS,
  GET_USER,
  UPDATE_USER,
  DELETE_USER,
  FETCHING_PENDING,
  FETCHING_SUCCESS,
  FETCHING_ERROR
} from 'redux/types'

export const fetchingPending = () => ({
  type: FETCHING_PENDING
})

export const fetchingSuccess = () => ({
  type: FETCHING_SUCCESS
})

export const fetchingError = (payload) => ({
  type: FETCHING_ERROR,
  payload
})

export const loadUsers = () => {
  return (dispatch) => {
    dispatch(fetchingPending())

    db.table('users')
      .toArray()
      .then((users) => {
        dispatch({
          type: LOAD_USERS,
          payload: users
        })

        dispatch(fetchingSuccess())
      })
      .catch((err) => {
        dispatch(fetchingError(err))
      })
  }
}

export const getUser = (id) => {
  return (dispatch) => {
    dispatch(fetchingPending())

    db.table('users')
      .get(+id)
      .then((user) => {
        dispatch({
          type: GET_USER,
          payload: user
        })

        dispatch(fetchingSuccess())
      })
      .catch((err) => {
        dispatch(fetchingError(err))
      })
  }
}

export const updateUser = (id, changes) => {
  return (dispatch) => {
    db.table('users')
      .update(id, { ...changes })
      .then(() => {
        dispatch({
          type: UPDATE_USER,
          payload: { id, changes }
        })
      })
      .catch((err) => {
        throw new Error(err)
      })
  }
}

export const addUser = (user) => {
  return (dispatch) => {
    db.table('users')
      .add(user)
      .then((id) => {
        dispatch({
          type: ADD_USER,
          payload: { ...user, id }
        })
      })
      .catch((err) => {
        throw new Error(err)
      })
  }
}

export const deleteUser = (id) => {
  return (dispatch) => {
    db.table('users')
      .delete(id)
      .then(() => {
        dispatch({
          type: DELETE_USER,
          payload: id
        })
      })
      .catch((err) => {
        throw new Error(err)
      })
  }
}

export const changeActiveFormStage = (payload) => ({
  type: CHANGE_ACTIVE_FORM_STAGE,
  payload
})
