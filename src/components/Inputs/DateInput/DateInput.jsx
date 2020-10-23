import React, { memo } from 'react'
// prop-types
import T from 'prop-types'
// react-hook-form
import { Controller } from 'react-hook-form'
// react-datepicker
import DatePicker from 'react-date-picker'
// assets
import { ReactComponent as CalendarIcon } from 'assets/icons/calendar.svg'
import { ReactComponent as CalendarArrowRight } from 'assets/icons/calendarArrowRight.svg'
import { ReactComponent as CalendarArrowLeft } from 'assets/icons/calendarArrowLeft.svg'

// components
import ValidationError from 'components/ValidationError'
// css
import commonStyles from 'components/Inputs/common/styles.module.css'
import classes from './DateInput.module.css'

const DateInput = ({ control, rules, label, errorMessage, name }) => (
  <div className={commonStyles.inputCont}>
    <label htmlFor={name}>
      <div className={commonStyles.inputLabel}>{label}</div>
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue=""
        render={({ onChange, value }) => {
          return (
            <DatePicker
              className={classes.dataPicker}
              tileClassName={classes.tile}
              calendarClassName={classes.calendar}
              format="dd/M/y"
              dayPlaceholder="DD"
              monthPlaceholder="MM"
              yearPlaceholder="YY"
              calendarIcon={<CalendarIcon />}
              nextLabel={<CalendarArrowRight />}
              prevLabel={<CalendarArrowLeft />}
              next2Label={null}
              clearIcon={null}
              prev2Label={null}
              onChange={onChange}
              onClickDay={onChange}
              showLeadingZeros
              value={
                typeof value === 'string' && value ? new Date(value) : value
              }
            />
          )
        }}
      />
      {errorMessage && <ValidationError errorMessage={errorMessage} />}
    </label>
  </div>
)

DateInput.propTypes = {
  control: T.object,
  label: T.string,
  rules: T.object,
  errorMessage: T.string,
  name: T.string
}

export default memo(DateInput)
