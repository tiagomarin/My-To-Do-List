import './style.scss';
import createTask from './modules/createTask';
import deleteTask from './modules/deleteTask';
import getArr from './modules/getDataFromLocalStorage';
import saveInLocalStorage from './modules/saveAtLocalStorage';
import clearList from './modules/clearList';
import renderList from './modules/renderList';
import editTask from './modules/editTask';
import updateStatus from './modules/updateStatus';

// ------------ EVENT LISTENERS ------------
// TRAGET DOM ELEMENTS
const listPlaceholder = document.getElementById('list-placeholder');
const addTaskBtn = document.getElementById('add-task-btn');
const clearButton = document.getElementById('clear-btn');

// ADD A TASK
addTaskBtn.addEventListener('click', () => {
  const addTaskDescInput = document.getElementById('task-text').value;
  if (addTaskDescInput !== '') {
    const taskListArr = getArr();
    const index = (taskListArr.length + 1);
    const newTask = createTask(addTaskDescInput, index);
    taskListArr.push(newTask);
    saveInLocalStorage(taskListArr);
    renderList();
  }
});

// EDIT A TASK
listPlaceholder.addEventListener('click', (e) => {
  if (e.target.tagName === 'INPUT' && e.target.classList.contains('task-text')) {
    const taskDescription = e.target;
    let index = [...taskDescription.classList];
    index = index[index.length - 1];
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
    const index = parseInt(e.target.parentElement.id, 10);
    deleteTask(index);
    clearList();
    renderList();
  }
});

// CHANGE STATUS OF CHECKBOX
listPlaceholder.addEventListener('click', (e) => {
  if (e.target.tagName === 'INPUT' && e.target.classList.contains('checkbox')) {
    const checkbox = e.target;
    const taskText = [...checkbox.nextElementSibling.classList];
    if (taskText[0] !== 'done') {
      taskText.unshift('done');
      const classList = taskText.join(' ');
      checkbox.nextElementSibling.classList = classList;
    } else {
      taskText.shift();
      const classList = taskText.join(' ');
      checkbox.nextElementSibling.classList = classList;
    }
    // taskText.classList.add("done");
    const completed = checkbox.checked;
    let index = [...checkbox.classList];
    index = index[index.length - 1];
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
listPlaceholder.addEventListener('drag', (e) => {

  if (e.target.tagName === 'LI') {
    const dragTarget = e.target
    dragTarget.addEventListener("dragstart", dragStart);
    dragTarget.addEventListener("dragover", dragOver);
    dragTarget.addEventListener("drop", dragDrop);
  }
});

function dragStart() {
  let dragStartIndex = [...this.classList];
  dragStartIndex = parseInt(dragStartIndex[dragStartIndex.length - 1], 10);
  localStorage.setItem('startDragIndex', JSON.stringify(dragStartIndex));
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  let dragEndIndex = [...this.classList];
  dragEndIndex = parseInt(dragEndIndex[dragEndIndex.length - 1], 10);
  let dragStartIndex = JSON.parse(localStorage.getItem('startDragIndex'));
  console.log("startIndex: ", dragStartIndex);
  console.log("dropIndex: ", dragEndIndex);
  swapItems(dragStartIndex, dragEndIndex);
}

function swapItems(fromIndex, toIndex) {
  let taskListArr = getArr();
  taskListArr[fromIndex - 1].Index = toIndex;
  taskListArr[toIndex - 1].Index = fromIndex;
  taskListArr.sort((a, b) => a.Index - b.Index);
  saveInLocalStorage(taskListArr);
  clearList();
  renderList();
}



// SHOW LIST ON HTML
renderList();
