import getArr from './getDataFromLocalStorage';
import saveInLocalStorage from './saveAtLocalStorage';
import clearList from './clearList';
import renderList from './renderList';

const clearCompleted = () => {
  let taskListArr = getArr();
  taskListArr = taskListArr.filter((task) => task.Completed !== true);
  for (let i = 0; i < taskListArr.length; i += 1) {
    taskListArr[i].Index = i + 1;
  }
  saveInLocalStorage(taskListArr);
  clearList();
  renderList();
};

export default clearCompleted;