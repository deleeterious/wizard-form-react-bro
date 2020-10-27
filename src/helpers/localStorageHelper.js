export const setToLocalStorage = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const getFromLocalStorage = (name) =>
  JSON.parse(localStorage.getItem(name));
