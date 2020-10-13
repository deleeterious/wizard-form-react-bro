import React, { useEffect, useState } from 'react'
// lodash/isEqual
import isEqual from 'lodash/isEqual'
// prop-types
import T from 'prop-types'
// react-hook-form
import { useForm } from 'react-hook-form'
// redux
import { useDispatch, useSelector } from 'react-redux'
import {
  addUser,
  changeActiveFormStage,
  clearNewUser,
  setNewUser,
  updateUser
} from 'redux/actions'
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
import { CONTACTS_FORM_STAGE, skillsList } from 'constants.js'
// css
import classes from './CapabilitiesForm.module.css'

const CapabilitiesForm = ({ isEdit, isContinue, id }) => {
  const dispatch = useDispatch()

  const [isDisabled, setIsDisabled] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [isFinish, setIsFinish] = useState(false)

  const { skills, additionInfo, hobbies } = useSelector((state) => state.user)
  const newUser = useSelector((state) => state.newUser)

  const { register, handleSubmit, errors, control, getValues, reset } = useForm(
    {
      defaultValues: { ...newUser.capabilities }
    }
  )

  const onSubmit = (data) => {
    const account = getFromLocalStorage('account')
    const profile = getFromLocalStorage('profile')
    const contacts = getFromLocalStorage('contacts')
    const capabilities = getFromLocalStorage('capabilities')

    if (isEdit) {
      dispatch(updateUser(+id, data))
      setIsSaved(true)
    } else {
      dispatch(
        addUser({ ...account, ...profile, ...contacts, ...capabilities })
      )
      dispatch(clearNewUser())
      localStorage.clear()
      setIsFinish(true)
    }
  }

  useEffect(() => {
    if (isContinue) {
      reset(getFromLocalStorage('capabilities'))
    } else if (isEdit) {
      reset({ skills, additionInfo, hobbies })
    }
  }, [isContinue])

  const handleChange = () => {
    setIsDisabled(isEqual({ skills, additionInfo, hobbies }, getValues()))
    if (!isEdit) {
      setToLocalStorage('capabilities', getValues())
      dispatch(setNewUser({ capabilities: getValues() }))
    }
  }

  const handleClickBack = (e) => {
    e.preventDefault()
    dispatch(changeActiveFormStage(CONTACTS_FORM_STAGE))
  }

  if (isFinish) return <Redirect to="/" />
  if (isSaved) return <Redirect to={`/profile/${id}`} />

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onChange={handleChange}
      className={classes.form}
    >
      <div className={classes.flexCont}>
        <SelectInput
          title="Skills"
          name="skills"
          options={skillsList}
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

        <div className={classes.buttons}>
          {isEdit || <Button onClick={handleClickBack}>Back</Button>}
          <Button
            disabled={isEdit && isDisabled}
            className={isEdit || classes.finish}
          >
            {isEdit ? 'Save' : 'Finish'}
          </Button>
        </div>
      </div>
    </form>
  )
}

CapabilitiesForm.propTypes = {
  isEdit: T.bool,
  isContinue: T.bool,
  id: T.string
}

export default CapabilitiesForm
