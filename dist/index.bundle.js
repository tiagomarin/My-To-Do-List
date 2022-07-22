"use strict";
(self["webpackChunkwebpack_boilerplate"] = self["webpackChunkwebpack_boilerplate"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_addTask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/addTask */ "./src/modules/addTask.js");
/* harmony import */ var _modules_deleteTask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/deleteTask */ "./src/modules/deleteTask.js");
/* harmony import */ var _modules_getDataFromLocalStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/getDataFromLocalStorage */ "./src/modules/getDataFromLocalStorage.js");
/* harmony import */ var _modules_saveAtLocalStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/saveAtLocalStorage */ "./src/modules/saveAtLocalStorage.js");
/* harmony import */ var _modules_clearList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/clearList */ "./src/modules/clearList.js");
/* harmony import */ var _modules_renderList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/renderList */ "./src/modules/renderList.js");
/* harmony import */ var _modules_editTask__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/editTask */ "./src/modules/editTask.js");
/* harmony import */ var _modules_updateStatus__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/updateStatus */ "./src/modules/updateStatus.js");
/* harmony import */ var _modules_drag_drop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/drag&drop */ "./src/modules/drag&drop.js");
// import './style.scss';










// ------------ EVENT LISTENERS ------------
// TRAGET DOM ELEMENTS
const addTaskBtn = document.getElementById('add-task-btn');
const listPlaceholder = document.getElementById('list-placeholder');
const clearButton = document.getElementById('clear-btn');

addTaskBtn.addEventListener('click', _modules_addTask__WEBPACK_IMPORTED_MODULE_0__["default"]);

// EDIT A TASK
listPlaceholder.addEventListener('click', (e) => {
  if (e.target.tagName === 'INPUT' && e.target.classList.contains('task-text')) {
    const taskDescription = e.target;
    const index = taskDescription.parentElement.parentElement.id;
    taskDescription.addEventListener('keydown', (e) => {
      if (e.keyCode === 13 && taskDescription.value !== '') {
        (0,_modules_editTask__WEBPACK_IMPORTED_MODULE_6__["default"])(taskDescription.value, index);
      }
    });
  }
});

// DELETE A TASK

listPlaceholder.addEventListener('click', (e) => {
  if (e.target.className === 'fa-solid fa-trash-can') { // element clicked is the trash icon
    // get the index of the button (same as the object Index: in the array)
    const index = +e.target.parentElement.parentElement.id;
    (0,_modules_deleteTask__WEBPACK_IMPORTED_MODULE_1__["default"])(index);
    (0,_modules_clearList__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_renderList__WEBPACK_IMPORTED_MODULE_5__["default"])();
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
    (0,_modules_updateStatus__WEBPACK_IMPORTED_MODULE_7__["default"])(index, completed);
  }
});

// CLEAR ALL SELECTED ITEMS
clearButton.addEventListener('click', () => {
  let taskListArr = (0,_modules_getDataFromLocalStorage__WEBPACK_IMPORTED_MODULE_2__["default"])();
  taskListArr = taskListArr.filter((task) => task.Completed !== true);
  for (let i = 0; i < taskListArr.length; i += 1) {
    taskListArr[i].Index = i + 1;
  }
  (0,_modules_saveAtLocalStorage__WEBPACK_IMPORTED_MODULE_3__["default"])(taskListArr);
  (0,_modules_clearList__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_renderList__WEBPACK_IMPORTED_MODULE_5__["default"])();
});

// DRAG AND DROP
listPlaceholder.addEventListener('dragstart', (e) => {
  if (e.target.classList.contains('task-text')) {
    const index = e.target.parentElement.parentElement.id;
    localStorage.setItem('startDragIndex', JSON.stringify(index));
  }
  const dragTargetArr = [...listPlaceholder.getElementsByTagName('li')];
  dragTargetArr.forEach((target) => {
    target.addEventListener('dragover', _modules_drag_drop__WEBPACK_IMPORTED_MODULE_8__.dragOver());
    target.addEventListener('drop', _modules_drag_drop__WEBPACK_IMPORTED_MODULE_8__.dragDrop());
  });
});

// SHOW LIST ON HTML
(0,_modules_renderList__WEBPACK_IMPORTED_MODULE_5__["default"])();
document.getElementById('task-text').focus();


/***/ }),

/***/ "./src/modules/addTask.js":
/*!********************************!*\
  !*** ./src/modules/addTask.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getDataFromLocalStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDataFromLocalStorage */ "./src/modules/getDataFromLocalStorage.js");
/* harmony import */ var _createTask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createTask */ "./src/modules/createTask.js");
/* harmony import */ var _saveAtLocalStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./saveAtLocalStorage */ "./src/modules/saveAtLocalStorage.js");
/* harmony import */ var _renderList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderList */ "./src/modules/renderList.js");





// ADD A TASK
const Add = () => {
  const addTaskDescInput = document.getElementById('task-text').value;
  if (addTaskDescInput !== '') {
    const taskListArr = (0,_getDataFromLocalStorage__WEBPACK_IMPORTED_MODULE_0__["default"])();
    const index = (taskListArr.length + 1);
    const newTask = (0,_createTask__WEBPACK_IMPORTED_MODULE_1__["default"])(addTaskDescInput, index);
    taskListArr.push(newTask);
    (0,_saveAtLocalStorage__WEBPACK_IMPORTED_MODULE_2__["default"])(taskListArr);
    (0,_renderList__WEBPACK_IMPORTED_MODULE_3__["default"])();
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Add);

/***/ }),

/***/ "./src/modules/clearList.js":
/*!**********************************!*\
  !*** ./src/modules/clearList.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// CLEAR ALL TASKS ON HTML --------
const clearList = () => {
  const listPlaceholder = document.getElementById('list-placeholder');
  while (listPlaceholder.firstChild) {
    listPlaceholder.removeChild(listPlaceholder.firstChild);
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clearList);


/***/ }),

/***/ "./src/modules/createTask.js":
/*!***********************************!*\
  !*** ./src/modules/createTask.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// ADD NEW TASK --------

const createTask = (str, num) => {
  const newtask = { Description: str, Completed: false, Index: num };
  return newtask;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createTask);

/***/ }),

/***/ "./src/modules/deleteTask.js":
/*!***********************************!*\
  !*** ./src/modules/deleteTask.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getDataFromLocalStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDataFromLocalStorage */ "./src/modules/getDataFromLocalStorage.js");
/* harmony import */ var _saveAtLocalStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./saveAtLocalStorage */ "./src/modules/saveAtLocalStorage.js");



const deleteTask = (index) => {
  let taskListArr = (0,_getDataFromLocalStorage__WEBPACK_IMPORTED_MODULE_0__["default"])();
  // remove the item on the array based on the index
  taskListArr = taskListArr.filter((task) => task.Index !== index);
  // update the indexes of each element in the array
  for (let i = 0; i < taskListArr.length; i += 1) {
    taskListArr[i].Index = i + 1;
  }
  (0,_saveAtLocalStorage__WEBPACK_IMPORTED_MODULE_1__["default"])(taskListArr);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (deleteTask);

/***/ }),

/***/ "./src/modules/drag&drop.js":
/*!**********************************!*\
  !*** ./src/modules/drag&drop.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dragDrop": () => (/* binding */ dragDrop),
/* harmony export */   "dragOver": () => (/* binding */ dragOver),
/* harmony export */   "swapItems": () => (/* binding */ swapItems)
/* harmony export */ });
/* harmony import */ var _getDataFromLocalStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDataFromLocalStorage */ "./src/modules/getDataFromLocalStorage.js");
/* harmony import */ var _saveAtLocalStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./saveAtLocalStorage */ "./src/modules/saveAtLocalStorage.js");
/* harmony import */ var _clearList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./clearList */ "./src/modules/clearList.js");
/* harmony import */ var _renderList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderList */ "./src/modules/renderList.js");





function dragOver(e) {
  this.classList.add('drag-over');// add style margin-top: 40px;
  e.preventDefault();
}

function swapItems(fromIndex, toIndex) {
  const taskListArr = (0,_getDataFromLocalStorage__WEBPACK_IMPORTED_MODULE_0__["default"])();
  taskListArr[fromIndex - 1].Index = toIndex;
  taskListArr[toIndex - 1].Index = fromIndex;
  taskListArr.sort((a, b) => a.Index - b.Index);
  (0,_saveAtLocalStorage__WEBPACK_IMPORTED_MODULE_1__["default"])(taskListArr);
  (0,_clearList__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_renderList__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

function dragDrop() {
  const dragEndIndex = this.id;
  const dragStartIndex = JSON.parse(localStorage.getItem('startDragIndex'));
  swapItems(dragStartIndex, dragEndIndex);
}


/***/ }),

/***/ "./src/modules/editTask.js":
/*!*********************************!*\
  !*** ./src/modules/editTask.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getDataFromLocalStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDataFromLocalStorage */ "./src/modules/getDataFromLocalStorage.js");
/* harmony import */ var _saveAtLocalStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./saveAtLocalStorage */ "./src/modules/saveAtLocalStorage.js");
/* harmony import */ var _renderList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderList */ "./src/modules/renderList.js");
/* harmony import */ var _clearList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./clearList */ "./src/modules/clearList.js");





// EDIT A TASK --------
const editTask = (str, num) => {
  const taskListArr = (0,_getDataFromLocalStorage__WEBPACK_IMPORTED_MODULE_0__["default"])();
  taskListArr[num - 1].Description = str;
  (0,_saveAtLocalStorage__WEBPACK_IMPORTED_MODULE_1__["default"])(taskListArr);
  (0,_clearList__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_renderList__WEBPACK_IMPORTED_MODULE_2__["default"])();
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (editTask);

/***/ }),

/***/ "./src/modules/getDataFromLocalStorage.js":
/*!************************************************!*\
  !*** ./src/modules/getDataFromLocalStorage.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// GET ARRAY FROM LOCAL STORAGE --------
const getArr = () => {
  let arr = JSON.parse(localStorage.getItem('taskListArr'));
  if (arr === null) {
    arr = [];
  }
  return arr;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getArr);


/***/ }),

/***/ "./src/modules/renderList.js":
/*!***********************************!*\
  !*** ./src/modules/renderList.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getDataFromLocalStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDataFromLocalStorage */ "./src/modules/getDataFromLocalStorage.js");


const renderList = () => {
  const taskListArr = (0,_getDataFromLocalStorage__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const listPlaceholder = document.getElementById('list-placeholder');

  for (let i = 0; i < taskListArr.length; i += 1) {
    const task = `<li id="${taskListArr[i].Index}" class="task">
      <div class="task-info">
        <input class="checkbox" type="checkbox">
        <input class="task-text" type="text" value="${taskListArr[i].Description}" draggable="true"></input>
      </div>
      <button "class="delete-btn"><i class="fa-solid fa-trash-can"></i></i></button>
    </li>`;
    listPlaceholder.innerHTML += task;
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderList);


/***/ }),

/***/ "./src/modules/saveAtLocalStorage.js":
/*!*******************************************!*\
  !*** ./src/modules/saveAtLocalStorage.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// SAVE ARRAY AS STRING TO LOCAL STORAGE --------

const saveInLocalStorage = (arr) => {
  localStorage.setItem('taskListArr', JSON.stringify(arr));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (saveInLocalStorage);

/***/ }),

/***/ "./src/modules/updateStatus.js":
/*!*************************************!*\
  !*** ./src/modules/updateStatus.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getDataFromLocalStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDataFromLocalStorage */ "./src/modules/getDataFromLocalStorage.js");
/* harmony import */ var _saveAtLocalStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./saveAtLocalStorage */ "./src/modules/saveAtLocalStorage.js");



// EDIT A TASK --------
const updateStatus = (num, completed) => {
  const taskListArr = (0,_getDataFromLocalStorage__WEBPACK_IMPORTED_MODULE_0__["default"])();
  taskListArr[num - 1].Completed = completed;
  (0,_saveAtLocalStorage__WEBPACK_IMPORTED_MODULE_1__["default"])(taskListArr);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updateStatus);

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=index.bundle.js.map