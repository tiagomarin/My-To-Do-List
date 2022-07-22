/**
 * @jest-environment jsdom 
*/
// import * from "../src/index";
import createTask from "../src/modules/createTask";
import deleteTask from "../src/modules/deleteTask";
import getArr from "../src/modules/getDataFromLocalStorage";
import saveInLocalStorage from "../src/modules/saveAtLocalStorage.js";

// add or remove exactly one <li> element to/from the list in the DOM.

describe('add & remove', () => {

  //set up environment
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

  // save fake values to local storage
  const taskListArr = getArr();
  for (let i = 1; i <= 10; i++) {
    let task = { Description: `fake${i}`, Completed: false, Index: i }
    taskListArr.push(task);
  }
  saveInLocalStorage(taskListArr);
  const initialArray = taskListArr;
  let arrFromStorage = getArr();

  // start add tests
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


    // begin of tests
    test("item not removed", () => {
      const arrLength = arrFromStorage.length; //store length to compare later
      deleteTask(2);
      arrFromStorage = getArr();
      expect(arrFromStorage.length).toEqual(arrLength - 1)
    });

    test("correct item was removed", () => {
      const itemToRemove = arrFromStorage[2].Description; //store value of Description to compare later
      deleteTask(2);
      arrFromStorage = getArr();
      expect(arrFromStorage[2].Description).not.toEqual(itemToRemove)
    });

    test("property Index is updated", () => {
      const index = arrFromStorage[2].Index; //store value of property Index to compare later
      deleteTask(2);
      arrFromStorage = getArr();
      expect(arrFromStorage[2].Index).toEqual(index)
    });
  });
});
