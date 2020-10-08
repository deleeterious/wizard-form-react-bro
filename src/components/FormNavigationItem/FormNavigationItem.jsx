import React from 'react'
// prop-types
import T from 'prop-types'
// redux
import { useDispatch } from 'react-redux'
import { changeActiveFormStage } from 'redux/actions'
// utils
import { concatStyles } from 'utils'
// css
import classes from './FormNavigationItem.module.css'

const FormNavigationItem = ({ title, isActive, stage, isEdit }) => {
  const dispatch = useDispatch()

  const handleClick = () => dispatch(changeActiveFormStage(stage))

  return (
    <div
      className={concatStyles(
        classes.navItem,
        isActive ? classes.active : null
      )}
      onClick={isEdit ? handleClick : null}
      style={{ cursor: isEdit ? 'pointer' : 'default' }}
    >
      <div>{title}</div>
    </div>
  )
}

FormNavigationItem.propTypes = {
  title: T.string,
  isActive: T.bool,
  stage: T.number,
  isEdit: T.bool
}

export default FormNavigationItem
