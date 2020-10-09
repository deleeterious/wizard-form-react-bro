import React from 'react'
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

const DateInput = ({ control, validate, errors, name }) => (
  <div className={commonStyles.inputCont}>
    <label htmlFor="birthDate">
      <div className={commonStyles.inputLabel}>Birth date</div>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        rules={{
          validate
        }}
        render={({ onChange, value }) => (
          <DatePicker
            onChange={onChange}
            value={value}
            format="dd/M/y"
            dayPlaceholder="DD"
            monthPlaceholder="MM"
            yearPlaceholder="YY"
            clearIcon={null}
            calendarIcon={<CalendarIcon />}
            next2Label={null}
            prev2Label={null}
            nextLabel={<CalendarArrowRight />}
            prevLabel={<CalendarArrowLeft />}
            calendarClassName={classes.calendar}
            tileClassName={classes.tile}
          />
        )}
      />
      {errors[name] && <ValidationError errors={errors} name={name} />}
    </label>
  </div>
)

DateInput.propTypes = {
  control: T.object,
  validate: T.func,
  errors: T.object,
  name: T.string
}

export default DateInput
