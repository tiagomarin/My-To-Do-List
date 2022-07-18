import getArr from './getDataFromLocalStorage';

const renderList = () => {
  const taskListArr = getArr();
  const listPlaceholder = document.getElementById('list-placeholder');

  for (let i = 0; i < taskListArr.length; i += 1) {
    const task = `<li id="${taskListArr[i].Index}" class="task">
      <div class="task-info">
        <input class="checkbox" type="checkbox">
        <input class="task-text" type="text" value="${taskListArr[i].Description}" draggable="true"></input>
      </div>
      <button class="actions"><i class="fa-solid fa-trash-can"></i></i></button>
    </li>`;
    listPlaceholder.innerHTML += task;
  }
};

export default renderList;

// for (let i = 0; i < taskListArr.length; i += 1) {
//   const task = `<li class="task ${taskListArr[i].Index}">
//     <div class="task-info">
//       <input class="checkbox ${taskListArr[i].Index}" type="checkbox">
//       <input class="task-text ${taskListArr[i].Index}" type="text" value="${taskListArr[i].Description}" draggable="true"></input>
//     </div>
//     <button id="${taskListArr[i].Index}" class="actions"><i class="fa-solid fa-trash-can"></i></i></button>
//   </li>`;
//   listPlaceholder.innerHTML += task;
// }
