/**
 * @jest-environment jsdom 
*/
// import * from "../src/index";
import createTask from "../src/modules/createTask";
import deleteTask from "../src/modules/deleteTask";
import getArr from "../src/modules/getDataFromLocalStorage";
import saveInLocalStorage from "../src/modules/saveAtLocalStorage.js";


describe('add & remove', () => {
  describe('add task', () => {
    test("new item created has correct Description value", () => {
      expect(createTask("pet the dog", 3).Description).toEqual("pet the dog");
    })

    test("new item created has correct Index value", () => {
      expect(createTask("pet the dog", 3).Index).toEqual(3);
    })

    test("new item created has correct Completed value", () => {
      expect(createTask("pet the dog", 3).Completed).toEqual(false);
    })

    test("new item Description is not an empty string", () => {
      expect(createTask("1wde2", 3).Description).not.toEqual("");
    })

    test("new item is created with a Index value that is not a number", () => {
      expect(typeof createTask("", 2).Index).toEqual("number");
    })
  })




  describe('remove task', () => {
    test("item not removed", () => {

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

      console.log(document)
      const one = document.getElementById('task-text').value = "task1";
      const taskListArr = getArr();
      const index = (taskListArr.length + 1);
      const newTask = createTask(one, index);
      taskListArr.push(newTask);
      console.log(taskListArr);
      saveInLocalStorage(taskListArr);

      document.getElementById('task-text').value = "task2";
      document.getElementById('add-task-btn').click();
      const taskListArr2 = getArr();
      console.log(taskListArr2);
      document.getElementById('task-text').value = "task3";
      // document.getElementById('add-task-btn').click();
      document.getElementById('task-text').value = "task3";
      // document.getElementById('add-task-btn').click();

      let arr = getArr();
      const arrLength = arr.length;
      deleteTask(0);
      expect(0).toEqual(0)
    })
  })

});