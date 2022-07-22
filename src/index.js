import './style.scss';
import Add from './modules/addTask';
import deleteTask from './modules/deleteTask';
import getArr from './modules/getDataFromLocalStorage';
import saveInLocalStorage from './modules/saveAtLocalStorage';
import clearList from './modules/clearList';
import renderList from './modules/renderList';
import editTask from './modules/editTask';
import updateStatus from './modules/updateStatus';
import * as dragNdrop from './modules/drag&drop';

// ------------ EVENT LISTENERS ------------
// TRAGET DOM ELEMENTS
const addTaskBtn = document.getElementById('add-task-btn');
const listPlaceholder = document.getElementById('list-placeholder');
const clearButton = document.getElementById('clear-btn');

addTaskBtn.addEventListener('click', Add);

// EDIT A TASK
listPlaceholder.addEventListener('click', (e) => {
  if (e.target.tagName === 'INPUT' && e.target.classList.contains('task-text')) {
    const taskDescription = e.target;
    const index = taskDescription.parentElement.parentElement.id;
    taskDescription.addEventListener('keydown', (e) => {
      if (e.keyCode === 13 && taskDescription.value !== '') {
        editTask(taskDescription.value, index);
      }
    });
  }
});

// DELETE A TASK
listPlaceholder.addEventListener('click', (e) => {
  if (e.target.className === 'fa-solid fa-trash-can') { // element clicked is the trash icon
    // get the index of the button (same as the object Index: in the array)
    const index = +e.target.parentElement.parentElement.id;
    deleteTask(index);
    clearList();
    renderList();
  }
});

// CHANGE STATUS OF CHECKBOX
listPlaceholder.addEventListener('click', (e) => {
  if (e.target.tagName === 'INPUT' && e.target.classList.contains('checkbox')) {
    const checkbox = e.target;
    const taskText = checkbox.nextElementSibling;
    taskText.classList.toggle('done');
    const completed = checkbox.checked;
    const index = checkbox.parentElement.parentElement.id;
    updateStatus(index, completed);
  }
});

// CLEAR ALL SELECTED ITEMS
clearButton.addEventListener('click', () => {
  let taskListArr = getArr();
  taskListArr = taskListArr.filter((task) => task.Completed !== true);
  for (let i = 0; i < taskListArr.length; i += 1) {
    taskListArr[i].Index = i + 1;
  }
  saveInLocalStorage(taskListArr);
  clearList();
  renderList();
});

// DRAG AND DROP
listPlaceholder.addEventListener('dragstart', (e) => {
  if (e.target.classList.contains('task-text')) {
    const index = e.target.parentElement.parentElement.id;
    localStorage.setItem('startDragIndex', JSON.stringify(index));
  }
  const dragTargetArr = [...listPlaceholder.getElementsByTagName('li')];
  dragTargetArr.forEach((target) => {
    target.addEventListener('dragover', dragNdrop.dragOver());
    target.addEventListener('drop', dragNdrop.dragDrop());
  });
});

// SHOW LIST ON HTML
renderList();
document.getElementById('task-text').focus();
