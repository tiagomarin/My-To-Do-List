/**
 * @jest-environment jsdom
*/
import editTask from '../src/modules/editTask';
import Add from '../src/modules/addTask';
import deleteTask from '../src/modules/deleteTask';
import getArr from '../src/modules/getDataFromLocalStorage';
import saveInLocalStorage from '../src/modules/saveAtLocalStorage';
import renderList from '../src/modules/renderList';
import clearList from '../src/modules/clearList';

describe('edit , update & clear All', () => {
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

  describe("edit", () => {
    // set up environment
    const taskListArr = getArr();
    for (let i = 1; i <= 10; i += 1) {
      const task = { Description: `fake${i}`, Completed: false, Index: i };
      taskListArr.push(task);
    }
    saveInLocalStorage(taskListArr);
    clearList();
    renderList();


    //start tests
    test('description was edited succesfully', () => {
      const taskDescriptionBefore = document.querySelector(".task-text").value;
      const taskDescriptionInput = "chaged description";
      editTask(taskDescriptionInput, 1);
      const taskDescriptionAfter = document.querySelector(".task-text").value;
      expect(taskDescriptionAfter).not.toBe(taskDescriptionBefore);
      expect(taskDescriptionAfter).toBe(taskDescriptionInput)
    })
  })


})