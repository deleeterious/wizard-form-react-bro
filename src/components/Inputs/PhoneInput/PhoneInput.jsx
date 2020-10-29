import React, { useEffect } from 'react';
// react-hook-form
import { useFieldArray, useFormContext } from 'react-hook-form';
// components
import MaskInput from 'components/Inputs/MaskInput';
import AddButton from 'components/AddButton';
// constants
import { PHONE_MASK } from 'constants.js';
// assets
import { ReactComponent as DeletePhoneBtn } from 'assets/icons/minus.svg';
// helpers
import { phoneValidation } from 'helpers/validations';
// css
import classes from './PhoneInput.module.css';

const PhoneInput = () => {
  const { control, errors } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'phones',
  });

  useEffect(() => {
    if (fields.length === 0) append('');
  }, [fields, append]);

  const handleAddPhone = () => append('');

  const handleDeletePhone = (i) => () => remove(i);

  return (
    <>
      {fields?.map((item, i) => (
        <div className={classes.itemContainer} key={item.id}>
          <MaskInput
            title={`Phone #${i + 1}`}
            control={control}
            name={`phones[${i}].value`}
            value={item.value}
            placeholder="+38 (XXX) XXX XX XX"
            mask={PHONE_MASK}
            rules={phoneValidation()}
            errorMessage={errors.phones ? errors.phones[i]?.value?.message : ''}
          />
          {fields?.length === 1 || (
            <DeletePhoneBtn
              onClick={handleDeletePhone(i)}
              className={classes.deleteButton}
            />
          )}
        </div>
      ))}

      {fields.length !== 3 && (
        <AddButton onClick={handleAddPhone}>add phone number</AddButton>
      )}
    </>
  );
};

export default PhoneInput;
