const getFromLocalStorage = (key: string) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error getting value from local storage:', error);
    return null;
  }
};

const setInLocalStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting value in local storage:', error);
  }
};

const removeFromLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing value from local storage:', error);
  }
};

export default {
  getFromLocalStorage,
  setInLocalStorage,
  removeFromLocalStorage,
};
