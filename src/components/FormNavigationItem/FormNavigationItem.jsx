import React from 'react'
import { useDispatch } from 'react-redux'
import { changeActiveFormStage } from 'redux/actions'
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

export default FormNavigationItem
