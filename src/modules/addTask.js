import getArr from './getDataFromLocalStorage';
import createTask from './createTask';
import saveInLocalStorage from './saveAtLocalStorage';
import renderList from './renderList';

// ADD A TASK
const Add = () => {
  const addTaskDescInput = document.getElementById('task-text').value;
  if (addTaskDescInput !== '') {
    const taskListArr = getArr();
    const index = (taskListArr.length + 1);
    const newTask = createTask(addTaskDescInput, index);
    taskListArr.push(newTask);
    saveInLocalStorage(taskListArr);
    renderList();
  }
};

export default Add;