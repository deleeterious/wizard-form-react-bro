import React, { useEffect, useState } from 'react'
// lodash/isEqual
import isEqual from 'lodash/isEqual'
// react-router
import { Redirect } from 'react-router-dom'
// prop-types
import T from 'prop-types'
// redux
import { useDispatch, useSelector } from 'react-redux'
// useForm
import { useForm } from 'react-hook-form'
import { changeActiveFormStage, setNewUser, updateUser } from 'redux/actions'
// helpers
import {
  getFromLocalStorage,
  setToLocalStorage
} from 'helpers/localStorageHelper'
import {
  faxValidation,
  requiredValidation,
  phoneValidation
} from 'helpers/validations'
// constants
import {
  CAPABILITIES_FORM_STAGE,
  languages,
  PROFILE_FORM_STAGE
} from 'constants.js'
// components
import TextInput from 'components/Inputs/TextInput'
import Button from 'components/Button'
import SelectInput from 'components/Inputs/SelectInput'
import MaskInput from 'components/Inputs/MaskInput'
import AddButton from 'components/AddButton'
// css
import commonStyles from 'containers/Forms/common/style.module.css'
import classes from './ContactsForm.module.css'

const ContactsForm = ({ isEdit, isContinue, id }) => {
  const dispatch = useDispatch()

  const [isDisabled, setIsDisabled] = useState(true)
  const [isSaved, setIsSaved] = useState(false)

  const [phones, setPhones] = useState([{ id: 0 }])

  const {
    company,
    githubLink,
    facebookLink,
    language,
    fax
    // phones
  } = useSelector((state) => state.user)
  const newUser = useSelector((state) => state.newUser)

  const { register, handleSubmit, errors, control, getValues, reset } = useForm(
    {
      defaultValues: { ...newUser.contacts }
    }
  )

  const onSubmit = (data) => {
    if (isEdit) {
      dispatch(updateUser(+id, data))
      setIsSaved(true)
    }
    dispatch(changeActiveFormStage(CAPABILITIES_FORM_STAGE))
  }

  useEffect(() => {
    if (isContinue) {
      reset(getFromLocalStorage('contacts'))
    } else if (isEdit) {
      reset({
        company,
        githubLink,
        facebookLink,
        language,
        fax
        // phones
      })
    }
  }, [isContinue])

  const handleClick = (e) => {
    e.preventDefault()
    setPhones((prevState) => [
      ...prevState,
      { id: prevState[prevState.length - 1].id + 1 }
    ])
  }

  const handleChange = () => {
    setIsDisabled(
      isEqual(
        {
          company,
          githubLink,
          facebookLink,
          language,
          fax
          // phones
        },
        getValues()
      )
    )

    if (!isEdit) {
      setToLocalStorage('contacts', getValues())
      dispatch(setNewUser({ contacts: getValues() }))
    }
  }

  const handleClickBack = (e) => {
    e.preventDefault()
    dispatch(changeActiveFormStage(PROFILE_FORM_STAGE))
  }

  if (isSaved) return <Redirect to={`/profile/${id}`} />

  console.log(errors)
  console.log(phones)

  return (
    <form
      className={classes.form}
      onChange={handleChange}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={classes.flexCont}>
        <TextInput
          type="text"
          name="company"
          title="Company"
          refRegister={register(requiredValidation())}
          errorMessage={errors?.company?.message}
        />

        <TextInput
          type="text"
          name="githubLink"
          title="Github link"
          refRegister={register()}
        />

        <TextInput
          type="text"
          name="facebookLink"
          title="Facebook link"
          refRegister={register()}
        />

        <SelectInput
          control={control}
          options={languages}
          title="Main languages"
          name="language"
          rules={requiredValidation()}
          errorMessage={errors?.language?.message}
        />
      </div>

      <div className={classes.flexCont}>
        <MaskInput
          title="Fax"
          control={control}
          name="fax"
          placeholder="+38 (XXX) XXX XX XX"
          mask="+38 (999) 999 99 99"
          rules={faxValidation()}
          errorMessage={errors?.fax?.message}
        />

        {phones.map((phone) => (
          <MaskInput
            key={phone.id}
            title={`Phone #${phone.id + 1}`}
            control={control}
            name={`phones[${phone.id}]`}
            placeholder="+38 (XXX) XXX XX XX"
            mask="+38 (999) 999 99 99"
            rules={phoneValidation()}
            errorMessage={
              errors.phones && errors.phones[phone.id]
                ? errors.phones[phone.id].message
                : ''
            }
          />
        ))}

        {phones.length !== 3 && (
          <AddButton onClick={handleClick}>add phone number</AddButton>
        )}

        <div className={commonStyles.buttons}>
          {isEdit || (
            <Button className={commonStyles.l0} onClick={handleClickBack}>
              Back
            </Button>
          )}
          <Button className={commonStyles.r0} disabled={isEdit && isDisabled}>
            {isEdit ? 'Save' : 'Forward'}
          </Button>
        </div>
      </div>
    </form>
  )
}

ContactsForm.propTypes = {
  isEdit: T.bool,
  isContinue: T.bool,
  id: T.string
}

export default ContactsForm
