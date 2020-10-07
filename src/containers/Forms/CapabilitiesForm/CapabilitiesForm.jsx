import React, { useState } from 'react'
// react-hook-form
import { Controller, useForm } from 'react-hook-form'
// redux
import { useDispatch } from 'react-redux'
import { addUser, updateUser } from 'redux/actions'
// router
import { Redirect } from 'react-router-dom'
// helpers
import {
  getFromLocalStorage,
  setToLocalStorage
} from 'helpers/localStorageHelper'
// react-datepicker
import ReactSelect from 'react-select'
// component
import Button from 'components/Button'
// constants
import { skills } from 'constants.js'
// css
import classes from './CapabilitiesForm.module.css'

const CapabilitiesForm = ({ isEdit, id }) => {
  const [isFinish, setIsFinish] = useState(false)
  const dispatch = useDispatch()

  const { register, handleSubmit, control } = useForm()
  const onSubmit = (data) => {
    if (!isEdit) setToLocalStorage('capabilities', data)

    const account = getFromLocalStorage('account')
    const profile = getFromLocalStorage('profile')
    const contacts = getFromLocalStorage('contacts')
    const capabilities = getFromLocalStorage('capabilities')

    if (isEdit) {
      dispatch(updateUser(+id, data))
    } else {
      dispatch(
        addUser({ ...account, ...profile, ...contacts, ...capabilities })
      )
    }

    localStorage.clear()

    setIsFinish(true)
  }

  // TODO remove <br /> and split components

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <div className={classes.flexCont}>
        <div className={classes.inputCont}>
          <label htmlFor="skills">
            <div className={classes.inputLabel}>Skills</div>
            <Controller
              name="skills"
              control={control}
              options={skills}
              isMulti
              as={ReactSelect}
            />
          </label>
        </div>

        <div className={classes.inputCont}>
          <label htmlFor="additionalInfo">
            <div className={classes.inputLabel}>Additional information</div>
            <textarea
              ref={register()}
              name="additionalInfo"
              className={classes.textarea}
            />
          </label>
        </div>
      </div>
      <div className={classes.flexCont}>
        <div className={classes.inputCont}>
          <label htmlFor="checkbox">
            <div className={classes.inputLabel}>Additional information</div>
            <label htmlFor="art">
              <input name="art" id="art" type="checkbox" ref={register()} />
              <span className={classes.checkboxLabel}>Art</span>
            </label>
            <br />
            <label htmlFor="sport">
              <input name="sport" id="sport" type="checkbox" ref={register()} />
              <span className={classes.checkboxLabel}>Sport</span>
            </label>
            <br />
            <label htmlFor="guitar">
              <input
                name="guitar"
                id="guitar"
                type="checkbox"
                ref={register()}
              />
              <span className={classes.checkboxLabel}>Guitar</span>
            </label>
          </label>
        </div>

        <Button />
        {isFinish ? <Redirect to="/" /> : null}
      </div>
    </form>
  )
}

export default CapabilitiesForm
