import {
  getFromLocalStorage,
  setToLocalStorage,
} from 'helpers/localStorageHelper';

export const saveSubmittedStage = (setSubmittedStages, currentStage) => {
  setToLocalStorage('submittedStages', {
    ...getFromLocalStorage('submittedStages'),
    [currentStage]: true,
  });

  setSubmittedStages((prevState) => ({
    ...prevState,
    [currentStage]: true,
  }));
};
