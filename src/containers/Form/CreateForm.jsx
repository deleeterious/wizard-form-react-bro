/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react';
// prop-types
import T from 'prop-types';
// react-hook-form
import { FormProvider, useForm } from 'react-hook-form';
// react-redux
import { useDispatch } from 'react-redux';
import { addUser } from 'redux/actions/users';
// react-router-dom
import { Route, Switch, useHistory, useParams } from 'react-router-dom';
// constants
import {
  ACCOUNT_FORM_STAGE,
  CAPABILITIES_FORM_STAGE,
  CONTACTS_FORM_STAGE,
  PROFILE_FORM_STAGE,
} from 'constants.js';
// helpers
import {
  getFromLocalStorage,
  setToLocalStorage,
} from 'helpers/localStorageHelper';
// components
import ContinuePopup from 'components/ContinuePopup';
// containers
import AccountForm from 'containers/Forms/AccountForm';
import ProfileForm from 'containers/Forms/ProfileForm';
import ContactsForm from 'containers/Forms/ContactsForm';
import CapabilitiesForm from 'containers/Forms/CapabilitiesForm';
import { saveSubmittedStage } from 'helpers/saveSubmittedStage';
// css
import classes from './Form.module.css';

const Form = ({ submittedStages, setSubmittedStages }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { activeFormStage } = useParams();

  const [isPopup, setIsPopup] = useState(!!getFromLocalStorage('newUser'));

  const methods = useForm({
    mode: 'onChange',
    shouldUnregister: false,
  });

  const {
    getValues,
    handleSubmit,
    reset,
    watch,
    formState,
    trigger,
    clearErrors,
  } = methods;

  const onClickForward = (
    inputsToTrigger,
    currentStage,
    nextStage
  ) => async () => {
    const isValid = await trigger(inputsToTrigger);
    if (isValid) {
      setToLocalStorage('newUserStage', nextStage);

      saveSubmittedStage(setSubmittedStages, currentStage);

      history.push(`/new-user/${nextStage}`);
    }
  };

  const onClickBack = (stage) => {
    clearErrors();
    setToLocalStorage('newUserStage', stage);
    history.push(`/new-user/${stage}`);
  };

  // User is added in last form stage (CapabilitiesForm) on click 'Finish'
  const onSubmit = async (data) => {
    const result = await trigger();
    if (result) {
      dispatch(addUser({ ...data, lastUpdate: new Date() }));
      history.push('/');
    }
  };

  // Popup: reset data if confirm continue
  const handleContinue = () => {
    reset(getFromLocalStorage('newUser'));

    if (getFromLocalStorage('newUserStage'))
      history.push(`/new-user/${getFromLocalStorage('newUserStage')}`);

    setSubmittedStages(getFromLocalStorage('submittedStages'));

    setIsPopup(false);
  };

  // Popup: clear localStorage if cancel continue
  const handleClose = () => {
    localStorage.clear();
    setToLocalStorage('submittedStages', submittedStages);
    setIsPopup(false);
  };

  // Save data to localStorage on change inputs value
  useEffect(() => {
    if (!isPopup) {
      if (formState.isDirty) {
        setToLocalStorage('newUser', {
          ...getFromLocalStorage('newUser'),
          ...getValues(),
        });
      }
    }
  }, [watch()]);

  useEffect(() => {
    if (activeFormStage !== ACCOUNT_FORM_STAGE)
      history.push('/new-user/account');
  }, []);

  return (
    <FormProvider {...methods}>
      {isPopup && (
        <ContinuePopup
          handleContinue={handleContinue}
          handleClose={handleClose}
        />
      )}

      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Switch>
          <Route
            path={`/new-user/${ACCOUNT_FORM_STAGE}`}
            render={() => (
              <AccountForm
                onClickForward={onClickForward(
                  ['userName', 'password', 'passwordRepeat'],
                  ACCOUNT_FORM_STAGE,
                  PROFILE_FORM_STAGE
                )}
              />
            )}
          />

          <Route
            path={`/new-user/${PROFILE_FORM_STAGE}`}
            render={() => (
              <ProfileForm
                onClickBack={onClickBack}
                onClickForward={onClickForward(
                  ['firstName', 'lastName', 'birthDate', 'email'],
                  PROFILE_FORM_STAGE,
                  CONTACTS_FORM_STAGE
                )}
              />
            )}
          />

          <Route
            path={`/new-user/${CONTACTS_FORM_STAGE}`}
            render={() => (
              <ContactsForm
                onClickBack={onClickBack}
                onClickForward={onClickForward(
                  ['company', 'language'],
                  CONTACTS_FORM_STAGE,
                  CAPABILITIES_FORM_STAGE
                )}
              />
            )}
          />

          <Route
            path={`/new-user/${CAPABILITIES_FORM_STAGE}`}
            render={() => <CapabilitiesForm onClickBack={onClickBack} />}
          />
        </Switch>
      </form>
    </FormProvider>
  );
};

Form.propTypes = {
  setSubmittedStages: T.func,
  submittedStages: T.object,
};

export default memo(Form);
