import React, { useState } from 'react'
// prop-types
import T from 'prop-types'
// react-hook-form
import { useForm } from 'react-hook-form'
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
import { additionInfoValidation, skillsValidation } from 'helpers/validations'
// component
import SelectInput from 'components/Inputs/SelectInput'
import TextareaInput from 'components/Inputs/TextareaInput'
import Button from 'components/Button'
import CheckboxInput from 'components/Inputs/CheckboxInput'
import CheckboxInputItem from 'components/Inputs/CheckboxInput/CheckboxInputItem'
// constants
import { skills } from 'constants.js'
// css
import classes from './CapabilitiesForm.module.css'

const CapabilitiesForm = ({ isEdit, id }) => {
  const [isFinish, setIsFinish] = useState(false)

  const dispatch = useDispatch()

  const { register, handleSubmit, errors, control } = useForm()

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

  if (isFinish) return <Redirect to="/" />
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <div className={classes.flexCont}>
        <SelectInput
          title="Skills"
          name="skills"
          options={skills}
          control={control}
          isMulti
          rules={skillsValidation()}
          errorMessage={errors?.skills?.message}
        />

        <TextareaInput
          name="additionInfo"
          refRegister={register(additionInfoValidation())}
          title="Additional information"
          errorMessage={errors?.additionInfo?.message}
        />
      </div>
      <div className={classes.flexCont}>
        <CheckboxInput title="Hobbies">
          <CheckboxInputItem
            title="Art"
            name="hobbies[0]"
            refRegister={register()}
          />

          <CheckboxInputItem
            title="Sport, fitness and staff like that"
            name="hobbies[1]"
            refRegister={register()}
          />

          <CheckboxInputItem
            title="I just want to play games, I’m not living in this life"
            name="hobbies[2]"
            refRegister={register()}
          />

          <CheckboxInputItem
            title="I’m a female... I’m doing nothing. Every day."
            name="hobbies[3]"
            refRegister={register()}
          />

          <CheckboxInputItem
            title="Guitar, guitar and guitar again. I’m fall in love with it."
            name="hobbies[4]"
            refRegister={register()}
          />

          <CheckboxInputItem
            title="WTF is “hobbies”???"
            name="hobbies[5]"
            refRegister={register()}
          />
        </CheckboxInput>

        <Button>{isEdit ? 'Save' : 'Forward'}</Button>
      </div>
    </form>
  )
}

CapabilitiesForm.propTypes = {
  isEdit: T.bool,
  id: T.string
}

export default CapabilitiesForm
