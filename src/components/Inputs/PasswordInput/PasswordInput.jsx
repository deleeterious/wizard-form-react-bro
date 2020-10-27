import React, { useState } from 'react';
// prop-types
import T from 'prop-types';
// react-hook-form
import { useFormContext } from 'react-hook-form';
// components
import TextInput from 'components/Inputs/TextInput';
// assets
import { ReactComponent as PassVisibleIcon } from 'assets/icons/pass-visible.svg';
import { ReactComponent as PassNotVisibleIcon } from 'assets/icons/pass-notvisible.svg';
// css
import classes from './PasswordInput.module.css';

const PasswordInput = ({ name, title, refRegister }) => {
  const { errors } = useFormContext();

  const [isShowPassword, setShowPassword] = useState(false);

  const handleShowPass = (e) => {
    e.preventDefault();
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={classes.passwordInputCont}>
      <TextInput
        type="text"
        name={name}
        title={title}
        className={!isShowPassword ? classes.showPass : null}
        refRegister={refRegister}
        errorMessage={errors[name]?.message}
      />

      <button className={classes.showPassBtn} onClick={handleShowPass}>
        {isShowPassword ? <PassNotVisibleIcon /> : <PassVisibleIcon />}
      </button>
    </div>
  );
};

PasswordInput.propTypes = {
  name: T.string,
  title: T.string,
  refRegister: T.func,
};

export default PasswordInput;
