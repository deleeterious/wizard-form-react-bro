import React, { memo } from 'react';
// prop-types
import T from 'prop-types';
// react-hook-form
import { useFormContext } from 'react-hook-form';
// helpers
import { additionInfoValidation } from 'helpers/validations';
// constants
import { CONTACTS_FORM_STAGE, skillsList, CHECKBOXES } from 'constants.js';
// utils
import { concatStyles } from 'utils';
// component
import SelectInput from 'components/Inputs/SelectInput';
import TextArea from 'components/Inputs/TextArea';
import Button from 'components/Button';
import Checkbox from 'components/Inputs/Checkbox';
// css
import commonStyles from 'containers/Forms/common/style.module.css';
import classes from './CapabilitiesForm.module.css';

const CapabilitiesForm = ({ handleSave, onClickBack, isEdit }) => {
  const { register, errors, formState } = useFormContext();

  return (
    <div className={commonStyles.form}>
      <div className={commonStyles.formSection}>
        <SelectInput
          title="Skills"
          name="skills"
          options={skillsList}
          isMulti
          isEdit={isEdit}
          errorMessage={errors?.skills?.message}
        />

        <TextArea
          name="additionInfo"
          refRegister={register(additionInfoValidation())}
          title="Additional information"
          errorMessage={errors?.additionInfo?.message}
        />
      </div>

      <div className={commonStyles.formSection}>
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
          {isEdit || (
            <Button
              disabled={false}
              type="button"
              handleClick={() => onClickBack(CONTACTS_FORM_STAGE)}
            >
              Back
            </Button>
          )}
          <Button
            disabled={isEdit ? !formState.isDirty : false}
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
  );
};

CapabilitiesForm.propTypes = {
  isEdit: T.bool,
  handleSave: T.func,
  onClickBack: T.func,
};

export default memo(CapabilitiesForm);
