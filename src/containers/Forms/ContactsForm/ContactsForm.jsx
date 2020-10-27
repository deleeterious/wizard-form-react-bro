import React, { memo } from 'react';
// lodash
import isEmpty from 'lodash/isEmpty';
// prop-types
import T from 'prop-types';
// react-router-dom
import { useHistory } from 'react-router-dom';
// react-hook-form
import { useFormContext } from 'react-hook-form';
// helpers
import {
  getFromLocalStorage,
  setToLocalStorage,
} from 'helpers/localStorageHelper';
import { faxValidation, requiredValidation } from 'helpers/validations';
// constants
import {
  CAPABILITIES_FORM_STAGE,
  languages,
  PHONE_MASK,
  PROFILE_FORM_STAGE,
} from 'constants.js';
// components
import TextInput from 'components/Inputs/TextInput';
import SelectInput from 'components/Inputs/SelectInput';
import MaskInput from 'components/Inputs/MaskInput';
import PhoneInput from 'components/Inputs/PhoneInput';
import Button from 'components/Button';
// css
import commonStyles from 'containers/Forms/common/style.module.css';

const ContactsForm = ({ setSubmittedStages, handleSave, isEdit }) => {
  const history = useHistory();

  const {
    register,
    trigger,
    getValues,
    errors,
    control,
    formState,
  } = useFormContext();

  const handleClickForward = async (e) => {
    e.preventDefault();
    const result = await trigger(['company', 'language']);
    if (result) {
      setToLocalStorage('newUserStage', CAPABILITIES_FORM_STAGE);

      setToLocalStorage('submittedStages', {
        ...getFromLocalStorage('submittedStages'),
        CONTACTS_FORM_STAGE: true,
      });

      setSubmittedStages((prevState) => ({
        ...prevState,
        CONTACTS_FORM_STAGE: true,
      }));

      history.push('/new-user/capabilities');
    }
  };

  const handleClickBack = (e) => {
    e.preventDefault();
    setToLocalStorage('newUserStage', PROFILE_FORM_STAGE);
    history.push('/new-user/profile');
  };

  return (
    <div className={commonStyles.form}>
      <div className={commonStyles.formSection}>
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
          title="Main languages"
          name="language"
          isEdit={isEdit}
          options={languages}
          errorMessage={errors?.language?.message}
        />
      </div>

      <div className={commonStyles.formSection}>
        <MaskInput
          value=""
          title="Fax"
          control={control}
          name="fax"
          placeholder="+38 (XXX) XXX XX XX"
          mask={PHONE_MASK}
          rules={faxValidation()}
          errorMessage={errors?.fax?.message}
        />

        <PhoneInput isEdit={isEdit} />

        <div className={commonStyles.buttons}>
          {isEdit || (
            <Button disabled={false} handleClick={handleClickBack}>
              Back
            </Button>
          )}

          <Button
            disabled={
              isEdit
                ? !formState.isDirty
                : isEmpty(getValues()) || !isEmpty(errors)
            }
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

ContactsForm.propTypes = {
  setSubmittedStages: T.func,
  handleSave: T.func,
  isEdit: T.bool,
};

export default memo(ContactsForm);
