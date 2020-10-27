import React, { memo } from 'react';
// prop-types
import T from 'prop-types';
// react-router-dom
import { useHistory, useParams } from 'react-router-dom';
// constants
import {
  ACCOUNT_FORM_STAGE,
  PROFILE_FORM_STAGE,
  CONTACTS_FORM_STAGE,
  CAPABILITIES_FORM_STAGE,
} from 'constants.js';
// components
import FormNavigationItem from 'components/FormNavigationItem';
// css
import classes from './FormNavigation.module.css';

const FormNavigation = ({ submittedStages, isEdit }) => {
  const history = useHistory();

  const { id, activeFormStage } = useParams();

  const onStepChange = (stage) =>
    isEdit ? () => history.push(`/edit/${id}/${stage}`) : undefined;

  return (
    <nav className={classes.nav}>
      <FormNavigationItem
        title="1. Account"
        isActive={activeFormStage === ACCOUNT_FORM_STAGE}
        isSubmitted={isEdit || submittedStages?.ACCOUNT_FORM_STAGE}
        onStepChange={onStepChange(ACCOUNT_FORM_STAGE)}
      />

      <FormNavigationItem
        title="2. Profile"
        isActive={activeFormStage === PROFILE_FORM_STAGE}
        isSubmitted={isEdit || submittedStages?.PROFILE_FORM_STAGE}
        onStepChange={onStepChange(PROFILE_FORM_STAGE)}
      />

      <FormNavigationItem
        title="3. Contacts"
        isActive={activeFormStage === CONTACTS_FORM_STAGE}
        isSubmitted={isEdit || submittedStages?.CONTACTS_FORM_STAGE}
        onStepChange={onStepChange(CONTACTS_FORM_STAGE)}
      />

      <FormNavigationItem
        title="4. Capabilities"
        isActive={activeFormStage === CAPABILITIES_FORM_STAGE}
        isSubmitted={isEdit || submittedStages?.CAPABILITIES_FORM_STAGE}
        onStepChange={onStepChange(CAPABILITIES_FORM_STAGE)}
      />
    </nav>
  );
};

FormNavigation.propTypes = {
  submittedStages: T.object,
  isEdit: T.bool,
};

export default memo(FormNavigation);
