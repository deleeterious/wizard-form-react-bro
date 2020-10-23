import db from 'db'

import {
  ADD_USER,
  CHANGE_ACTIVE_FORM_STAGE,
  LOAD_USERS_SUCCESS,
  LOAD_USER_SUCCESS,
  UPDATE_USER,
  DELETE_USER,
  FETCHING_PENDING,
  FETCHING_ERROR
} from 'redux/types'

export const fetchingPending = () => ({
  type: FETCHING_PENDING
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
          type: LOAD_USERS_SUCCESS,
          payload: users
        })
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
          type: LOAD_USER_SUCCESS,
          payload: user
        })
      })
      .catch((err) => {
        dispatch(fetchingError(err))
      })
  }
}

export const updateUser = (id, payload) => {
  return (dispatch) => {
    db.table('users')
      .update(id, { ...payload })
      .then(() => {
        dispatch({
          type: UPDATE_USER,
          payload: { id, changes: payload }
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

        localStorage.clear()
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

export const generateUsers = (generatedUsers) => {
  return async (dispatch) => {
    await db.table('users').clear()
    await db.table('users').bulkAdd(generatedUsers)
    dispatch(loadUsers())
  }
}

export const changeActiveFormStage = (payload) => ({
  type: CHANGE_ACTIVE_FORM_STAGE,
  payload
})
