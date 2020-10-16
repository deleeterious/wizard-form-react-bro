import React, { useEffect, useState } from 'react'
// prop-types
import T from 'prop-types'
// react-hook-form
import { useFormContext } from 'react-hook-form'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { changeActiveFormStage, setNewUser } from 'redux/actions'

import { additionInfoValidation, skillsValidation } from 'helpers/validations'
// component
import SelectInput from 'components/Inputs/SelectInput'
import TextareaInput from 'components/Inputs/TextareaInput'
import Button from 'components/Button'
import CheckboxInput from 'components/Inputs/CheckboxInput'
import CheckboxInputItem from 'components/Inputs/CheckboxInput/CheckboxInputItem'
// constants
import { CONTACTS_FORM_STAGE, skillsList } from 'constants.js'
// utils
import { concatStyles } from 'utils'
// css
import commonStyles from 'containers/Forms/common/style.module.css'
import classes from './CapabilitiesForm.module.css'

const CapabilitiesForm = ({ handleSave }) => {
  const dispatch = useDispatch()

  const isEdit = useSelector((state) => state.isEdit)

  const { register, getValues, errors, control } = useFormContext()

  const handleClickBack = (e) => {
    e.preventDefault()
    dispatch(changeActiveFormStage(CONTACTS_FORM_STAGE))
  }

  const [isFinish, setIsFinish] = useState(false)

  useEffect(() => {
    if (isEdit) {
      return () => {
        if (isFinish) {
          localStorage.clear()
        } else {
          dispatch(setNewUser(getValues()))
        }
      }
    }
  }, [isFinish])

  return (
    <div className={classes.form}>
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

        <div className={commonStyles.buttons}>
          {isEdit || <Button handleClick={handleClickBack}>Back</Button>}
          <Button
            handleClick={isEdit ? handleSave : () => setIsFinish(true)}
            className={concatStyles(commonStyles.r0, isEdit || classes.finish)}
          >
            {isEdit ? 'Save' : 'Finish'}
          </Button>
        </div>
      </div>
    </div>
  )
}

CapabilitiesForm.propTypes = {
  isEdit: T.bool,
  handleSave: T.func
}

export default CapabilitiesForm
