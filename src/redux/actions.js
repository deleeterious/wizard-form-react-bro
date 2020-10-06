import { ADD_USER, CHANGE_ACTIVE_FORM_STAGE, LOAD_USERS } from './types'
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
