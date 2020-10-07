import {
  ADD_USER,
  CHANGE_ACTIVE_FORM_STAGE,
  LOAD_USERS,
  GET_USER,
  LOAD_AVATAR,
  UPDATE_USER
} from './types'
import db from '../db'

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

export const changeActiveFormStage = (payload) => ({
  type: CHANGE_ACTIVE_FORM_STAGE,
  payload
})

export const loadAvatar = (payload) => ({
  type: LOAD_AVATAR,
  payload
})