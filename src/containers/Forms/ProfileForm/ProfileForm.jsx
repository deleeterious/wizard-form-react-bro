import React, { memo, useEffect } from 'react';
// lodash
import isEmpty from 'lodash/isEmpty';
// prop-types
import T from 'prop-types';
// react-redux
import { useSelector } from 'react-redux';
// useForm
import { useFormContext } from 'react-hook-form';
// constants
import { ACCOUNT_FORM_STAGE } from 'constants.js';
// helpers
import {
  getFromLocalStorage,
  setToLocalStorage,
} from 'helpers/localStorageHelper';
import {
  birthDateValidation,
  emailValidation,
  requiredValidation,
} from 'helpers/validations';
// components
import TextInput from 'components/Inputs/TextInput';
import Button from 'components/Button';
import DateInput from 'components/Inputs/DateInput';
import RadioInput from 'components/Inputs/RadioInput';
// css
import commonStyles from 'containers/Forms/common/style.module.css';

const ProfileForm = ({
  setSubmittedStages,
  onClickForward,
  onClickBack,
  isEdit,
  handleSave,
}) => {
  const { data } = useSelector((state) => state.currentUser);

  const { register, errors, control, formState } = useFormContext();

  useEffect(
    () => () => {
      setToLocalStorage('submittedStages', {
        ...getFromLocalStorage('submittedStages'),
        PROFILE_FORM_STAGE: true,
      });

      setSubmittedStages((prevState) => ({
        ...prevState,
        PROFILE_FORM_STAGE: true,
      }));
    },
    [setSubmittedStages]
  );

  return (
    <div className={commonStyles.form}>
      <div className={commonStyles.formSection}>
        <TextInput
          type="text"
          title="First name"
          name="firstName"
          refRegister={register(requiredValidation())}
          errorMessage={errors?.firstName?.message}
        />

        <TextInput
          type="text"
          title="Last name"
          name="lastName"
          refRegister={register(requiredValidation())}
          errorMessage={errors?.lastName?.message}
        />

        <DateInput
          name="birthDate"
          label="Birth date"
          control={control}
          rules={birthDateValidation()}
          errorMessage={errors?.birthDate?.message}
        />
      </div>

      <div className={commonStyles.formSection}>
        <TextInput
          type="text"
          name="email"
          title="Email"
          refRegister={register(emailValidation(isEdit ? data : {}))}
          errorMessage={errors?.email?.message}
        />

        <TextInput
          type="text"
          name="address"
          title="Address"
          refRegister={register()}
        />

        <RadioInput refRegister={register()} />

        <div className={commonStyles.buttons}>
          {isEdit || (
            <Button
              disabled={false}
              handleClick={() => onClickBack(ACCOUNT_FORM_STAGE)}
            >
              Back
            </Button>
          )}

          <Button
            disabled={isEdit ? !formState.isDirty : !isEmpty(errors)}
            className={commonStyles.positionRight}
            handleClick={isEdit ? handleSave : onClickForward}
          >
            {isEdit ? 'Save' : 'Forward'}
          </Button>
        </div>
      </div>
    </div>
  );
};

ProfileForm.propTypes = {
  setSubmittedStages: T.func,
  onClickForward: T.func,
  handleSave: T.func,
  isEdit: T.bool,
  onClickBack: T.func,
};

export default memo(ProfileForm);
