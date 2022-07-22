import './style.scss';
import Add from './modules/addTask';
import deleteTask from './modules/deleteTask';
import getArr from './modules/getDataFromLocalStorage';
import saveInLocalStorage from './modules/saveAtLocalStorage';
import clearList from './modules/clearList';
import renderList from './modules/renderList';
import editTask from './modules/editTask';
import updateStatus from './modules/updateStatus';

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
    let index = taskDescription.parentElement.parentElement.id;
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
    taskText.classList.toggle("done");
    const completed = checkbox.checked;
    let index = checkbox.parentElement.parentElement.id;
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

/*
// DRAG AND DROP
listPlaceholder.addEventListener('dragstart', (e) => {
  if (e.target.classList.contains("task-text")) {
    let index = e.target.parentElement.parentElement.id;
    localStorage.setItem('startDragIndex', JSON.stringify(index));
  }
  const dragTargetArr = [...listPlaceholder.getElementsByTagName("li")];
  dragTargetArr.forEach(target => {
    target.addEventListener('dragover', dragOver);
    target.addEventListener("drop", dragDrop);
  });
})
 
function dragOver(e) {
  this.classList.add('drag-over');//colocar margin-top: 40px;
  e.preventDefault();
}
 
function dragDrop() {
  const dragEndIndex = this.id;
  const dragStartIndex = JSON.parse(localStorage.getItem('startDragIndex'));
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
*/

// SHOW LIST ON HTML
renderList();
const focusBackToInput = document.getElementById('task-text').focus();

