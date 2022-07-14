import getArr from './getDataFromLocalStorage';
import saveInLocalStorage from './saveAtLocalStorage';

const deleteTask = (index) => {
  let taskListArr = getArr();
  // remove the item on the array based on the index
  taskListArr = taskListArr.filter((task) => task.Index !== index);
  // update the indexes of each element in the array
  for (let i = 0; i < taskListArr.length; i += 1) {
    taskListArr[i].Index = i + 1;
  }
  saveInLocalStorage(taskListArr);
};

export default deleteTask;