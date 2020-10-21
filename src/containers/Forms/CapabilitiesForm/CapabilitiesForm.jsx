import React from 'react'
// prop-types
import T from 'prop-types'
// react-hook-form
import { useFormContext } from 'react-hook-form'
// redux
import { useDispatch } from 'react-redux'
import { changeActiveFormStage } from 'redux/actions'
// helpers
import { setToLocalStorage } from 'helpers/localStorageHelper'
import { additionInfoValidation, skillsValidation } from 'helpers/validations'
// constants
import { CONTACTS_FORM_STAGE, skillsList } from 'constants.js'
// utils
import { concatStyles } from 'utils'
// component
import SelectInput from 'components/Inputs/SelectInput'
import TextareaInput from 'components/Inputs/TextareaInput'
import Button from 'components/Button'
import CheckboxInput from 'components/Inputs/CheckboxInput'
import CheckboxInputItem from 'components/Inputs/CheckboxInput/CheckboxInputItem'

// css
import commonStyles from 'containers/Forms/common/style.module.css'
import classes from './CapabilitiesForm.module.css'

const CapabilitiesForm = ({ handleSave, isEdit }) => {
  const dispatch = useDispatch()

  const { register, errors, control, formState } = useFormContext()

  const handleClickBack = (e) => {
    e.preventDefault()
    setToLocalStorage('newUserStage', CONTACTS_FORM_STAGE)
    dispatch(changeActiveFormStage(CONTACTS_FORM_STAGE))
  }

  return (
    <div className={commonStyles.form}>
      <div className={commonStyles.flexCont}>
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
      <div className={commonStyles.flexCont}>
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
            disabled={!formState.isValid}
            handleClick={isEdit ? handleSave : null}
            className={concatStyles(
              commonStyles.positionRight,
              isEdit || classes.finish
            )}
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
