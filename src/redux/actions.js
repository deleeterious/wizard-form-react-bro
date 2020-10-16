import db from 'db'
// helpers
import {
  getFromLocalStorage,
  setToLocalStorage
} from 'helpers/localStorageHelper'

import {
  ADD_USER,
  CHANGE_ACTIVE_FORM_STAGE,
  LOAD_USERS,
  GET_USER,
  UPDATE_USER,
  DELETE_USER,
  SET_NEW_USER,
  CLEAR_NEW_USER,
  SET_AVATAR,
  SET_EDIT
} from 'redux/types'

export const loadUsers = () => {
  return (dispatch) => {
    db.table('users')
      .toArray()
      .then((users) => {
        dispatch({
          type: LOAD_USERS,
          payload: users
        })
      })
  }
}

export const getUser = (id) => {
  return (dispatch) => {
    db.table('users')
      .get(+id)
      .then((user) => {
        dispatch({
          type: GET_USER,
          payload: user
        })
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
  }
}

export const changeActiveFormStage = (payload) => ({
  type: CHANGE_ACTIVE_FORM_STAGE,
  payload
})

export const setAvatar = (payload) => ({
  type: SET_AVATAR,
  payload
})

export const setNewUser = (payload) => {
  setToLocalStorage('newUser', {
    ...getFromLocalStorage('newUser'),
    ...payload
  })
  return {
    type: SET_NEW_USER,
    payload
  }
}

export const clearNewUser = () => ({
  type: CLEAR_NEW_USER
})

export const setEdit = (payload) => ({
  type: SET_EDIT,
  payload
})
