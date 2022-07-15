import getArr from './getDataFromLocalStorage';
import clearList from './clearList';

const renderList = () => {
  const taskListArr = getArr();
  const listPlaceholder = document.getElementById('list-placeholder');

  for (let i = 0; i < taskListArr.length; i += 1) {
    const task = `<li class="task" draggable="true">
      <div class="task info">
        <input class="checkbox ${taskListArr[i].Index}" type="checkbox">
        <input class="task-text ${taskListArr[i].Index}" type="text" value="${taskListArr[i].Description}"></input>
      </div>
      <button id="${taskListArr[i].Index}" class="actions"><i class="fa-solid fa-trash-can"></i></i></button>
    </li>`;
    listPlaceholder.innerHTML += task;
  }
};
const task = document.querySelector('.task');

if (task !== null) {
  clearList();
}
export default renderList;