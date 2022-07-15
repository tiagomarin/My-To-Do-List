import getArr from './getDataFromLocalStorage';
import saveInLocalStorage from './saveAtLocalStorage';

// EDIT A TASK --------
const updateStatus = (num, completed) => {
  const taskListArr = getArr();
  taskListArr[num - 1].Completed = completed;
  saveInLocalStorage(taskListArr);
};

export default updateStatus;