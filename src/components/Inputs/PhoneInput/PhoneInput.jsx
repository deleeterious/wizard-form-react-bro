import React, { useEffect, useState } from 'react';
// prop-types
import T from 'prop-types';
// react-redux
import { useSelector } from 'react-redux';
// react-hook-form
import { useFormContext } from 'react-hook-form';
// components
import MaskInput from 'components/Inputs/MaskInput';
import AddButton from 'components/AddButton';
// constants
import { PHONE_MASK } from 'constants.js';
// assets
import { ReactComponent as DeletePhoneBtn } from 'assets/icons/minus.svg';
// helpers
import { getFromLocalStorage } from 'helpers/localStorageHelper';
import { phoneValidation } from 'helpers/validations';
// css
import classes from './PhoneInput.module.css';

const PhoneInput = ({ isEdit }) => {
  const [phones, setPhones] = useState([]);

  const { data } = useSelector((state) => state.currentUser);

  const { setValue, control, errors } = useFormContext();

  useEffect(() => {
    const newUserPhones = isEdit
      ? data?.phones?.filter((item) => item)
      : getFromLocalStorage('newUser')?.phones?.filter((item) => item);

    setPhones(newUserPhones?.length ? newUserPhones : ['']);
  }, [isEdit, data]);

  useEffect(() => {
    setValue('phones', phones, { shouldDirty: true });
  }, [setValue, phones]);

  const handleAddPhone = (e) => {
    e.preventDefault();
    setPhones((prevState) => [...prevState, '']);
  };

  const handleDeletePhone = (i) => {
    const newArr = [...phones];
    newArr.splice(i, 1);
    setPhones(newArr);
  };
  return (
    <>
      {phones?.map((phone, i) => (
        <div className={classes.phoneCont} key={i}>
          <MaskInput
            value={phone}
            title={`Phone #${i + 1}`}
            control={control}
            name={`phones[${i}]`}
            placeholder="+38 (XXX) XXX XX XX"
            mask={PHONE_MASK}
            rules={phoneValidation()}
            errorMessage={
              errors.phones && errors.phones[i] ? errors.phones[i].message : ''
            }
          />
          {phones?.length === 1 || (
            <DeletePhoneBtn
              onClick={() => handleDeletePhone(i)}
              className={classes.deletePhoneBtn}
            />
          )}
        </div>
      ))}

      {phones?.length !== 3 && (
        <AddButton onClick={handleAddPhone}>add phone number</AddButton>
      )}
    </>
  );
};

PhoneInput.propTypes = {
  isEdit: T.bool,
};

export default PhoneInput;
