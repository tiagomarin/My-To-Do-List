import getArr from './getDataFromLocalStorage';
import saveInLocalStorage from './saveAtLocalStorage';
import renderList from './renderList';
import clearList from './clearList';

// EDIT A TASK --------
const editTask = (str, num) => {
  const taskListArr = getArr();
  taskListArr[num - 1].Description = str;
  saveInLocalStorage(taskListArr);
  clearList();
  renderList();
};

export default editTask;