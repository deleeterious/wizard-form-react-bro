import React, { memo } from 'react'
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
import { CONTACTS_FORM_STAGE, skillsList, CHECKBOXES } from 'constants.js'
// utils
import { concatStyles } from 'utils'
// component
import SelectInput from 'components/Inputs/SelectInput'
import TextArea from 'components/Inputs/TextArea'
import Button from 'components/Button'
import Checkbox from 'components/Inputs/Checkbox'
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

        <TextArea
          name="additionInfo"
          refRegister={register(additionInfoValidation())}
          title="Additional information"
          errorMessage={errors?.additionInfo?.message}
        />
      </div>

      <div className={commonStyles.flexCont}>
        <Checkbox title="Hobbies">
          {CHECKBOXES.map((title, i) => (
            <label
              key={i}
              htmlFor={`hobbies[${i}]`}
              className={classes.checkboxLabelCont}
            >
              <input
                name={`hobbies[${i}]`}
                id={`hobbies[${i}]`}
                value={title}
                type="checkbox"
                ref={register()}
              />
              <span className={classes.checkboxLabel}>{title}</span>
            </label>
          ))}
        </Checkbox>

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

export default memo(CapabilitiesForm)
