import React from 'react'
// react-hook-form
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
// react-datepicker
import ReactSelect from 'react-select'
// css
import classes from './CapabilitiesForm.module.css'
import FormButton from '../../../components/FormButton'
import { addUser } from '../../../redux/actions'

const CapabilitiesForm = () => {
  const dispatch = useDispatch()

  const { register, handleSubmit, control } = useForm()
  const onSubmit = (data) => {
    localStorage.setItem('capabilities', JSON.stringify(data))

    const account = JSON.parse(localStorage.getItem('account'))
    const profile = JSON.parse(localStorage.getItem('profile'))
    const contacts = JSON.parse(localStorage.getItem('contacts'))
    const capabilities = JSON.parse(localStorage.getItem('capabilities'))

    dispatch(addUser({ ...account, ...profile, ...contacts, ...capabilities }))

    localStorage.clear()
  }

  const options = [
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'js', label: 'Javascript' },
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'jquery', label: 'jQuery' },
    { value: 'nodejs', label: 'NodeJS' },
    { value: 'python', label: 'Python' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby On Rails' },
    { value: 'sql', label: 'SQL' },
    { value: 'backbonejs', label: 'BackboneJS' },
    { value: 'design', label: 'Web Design' },
    { value: 'pm', label: 'Project management' },
    { value: 'git', label: 'Git' },
    { value: 'docker', label: 'Docker' },
    { value: 'aws lambda', label: 'AWS Lambda' },
    { value: 'firebase', label: 'Firebase' }
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <div className={classes.flexCont}>
        <div className={classes.inputCont}>
          <label htmlFor="skills">
            <div className={classes.inputLabel}>Skills</div>
            <Controller
              name="skills"
              control={control}
              options={options}
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

        <FormButton />
      </div>
    </form>
  )
}

export default CapabilitiesForm
