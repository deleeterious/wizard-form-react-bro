import React, { memo } from 'react';
// lodash
import isEmpty from 'lodash/isEmpty';
// prop-types
import T from 'prop-types';
// react-router-dom
import { useHistory } from 'react-router-dom';
// react-redux
import { useSelector } from 'react-redux';
// useForm
import { useFormContext } from 'react-hook-form';
// constants
import { ACCOUNT_FORM_STAGE, CONTACTS_FORM_STAGE } from 'constants.js';
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

const ProfileForm = ({ setSubmittedStages, isEdit, handleSave }) => {
  const history = useHistory();

  const { data } = useSelector((state) => state.currentUser);

  const { register, trigger, errors, control, formState } = useFormContext();

  const handleClickForward = async (e) => {
    e.preventDefault();
    const result = await trigger([
      'firstName',
      'lastName',
      'birthDate',
      'email',
    ]);
    if (result) {
      setToLocalStorage('newUserStage', CONTACTS_FORM_STAGE);

      setToLocalStorage('submittedStages', {
        ...getFromLocalStorage('submittedStages'),
        PROFILE_FORM_STAGE: true,
      });

      setSubmittedStages((prevState) => ({
        ...prevState,
        PROFILE_FORM_STAGE: true,
      }));

      history.push('/new-user/contacts');
    }
  };

  const handleClickBack = (e) => {
    e.preventDefault();
    setToLocalStorage('newUserStage', ACCOUNT_FORM_STAGE);
    history.push('/new-user/account');
  };

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
            <Button disabled={false} handleClick={handleClickBack}>
              Back
            </Button>
          )}

          <Button
            disabled={isEdit ? !formState.isDirty : !isEmpty(errors)}
            className={commonStyles.positionRight}
            handleClick={isEdit ? handleSave : handleClickForward}
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
  handleSave: T.func,
  isEdit: T.bool,
};

export default memo(ProfileForm);
