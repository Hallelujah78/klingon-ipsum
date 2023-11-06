// takes a data structure like an array and generates a random number based on the structure's length - essentially generates a random index
export const generateRandomNumber = (dataStructure) => {
  return Math.floor(Math.random() * dataStructure.length);
};

//set local storage

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

//get local storage

export const getLocalStorage = (key) => {
  const value = JSON.parse(localStorage.getItem(key));
  return value ? value : false;
};

// display alert
export const displayAlert = (text, action, ref) => {
  ref.classList.add(`alert-${action}`);
  ref.textContent = text;

  //remove alert
  setTimeout(function () {
    ref.classList.remove(`alert-${action}`);
    ref.textContent = "";
  }, 3000);
};
