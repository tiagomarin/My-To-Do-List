/**
 * @jest-environment jsdom
*/
import Add from '../src/modules/addTask';
import deleteTask from '../src/modules/deleteTask';
import getArr from '../src/modules/getDataFromLocalStorage';
import saveInLocalStorage from '../src/modules/saveAtLocalStorage';
import renderList from '../src/modules/renderList';
import clearList from '../src/modules/clearList';

describe('add & remove', () => {
  // set up environment
  document.body.innerHTML = `<main>+
  <section id="task-list">+
    <div id="list-title">+
      <h2>Today's To Do</h2>+
      <span><i class="fa-solid fa-arrows-rotate"></i></span>+
    </div>+
      <input id="task-text" type="text" placeholder="Add your task..." required>+
      <button id="add-task-btn" type="submit"><i class="fa-solid fa-plus"></i></button>+
    <div class="check-all">+
      <input  type="checkbox">+
      <label>SELECT ALL</label>+
    </div>+
    <ul id="list-placeholder"></ul>+
    <button id="clear-btn">Clear all completed</button>+
  </section>+
</main>`;
  document.getElementById('add-task-btn').onclick = Add;

  // start add tests
  describe('add task', () => {
    test('only 1 li item is added in the DOM', () => {
      const listPlaceholder = document.querySelector('#list-placeholder');
      const listLengthBefore = listPlaceholder.children.length;
      document.getElementById('task-text').value = 'fake task 1';
      document.getElementById('add-task-btn').click();
      const listLengthAfter = listPlaceholder.children.length;
      expect(listLengthAfter).toBe(listLengthBefore + 1);
    });
  });

  describe('remove task', () => {
    // set up environment
    // save fake values to local storage
    const taskListArr = getArr();
    for (let i = 1; i <= 10; i += 1) {
      const task = { Description: `fake${i}`, Completed: false, Index: i };
      taskListArr.push(task);
    }
    saveInLocalStorage(taskListArr);
    clearList();
    renderList();

    // start delete tests
    test('item is removed', () => {
      const listPlaceholder = document.querySelector('#list-placeholder');
      const listLengthBefore = listPlaceholder.children.length;
      deleteTask(5);
      clearList();
      renderList();
      const listLengthAfter = listPlaceholder.children.length;
      expect(listLengthAfter).toBe(listLengthBefore - 1);
    });
  });
});
