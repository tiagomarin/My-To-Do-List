import getArr from './getDataFromLocalStorage';
import saveInLocalStorage from './saveAtLocalStorage';
import clearList from './clearList';
import renderList from './renderList';

export function dragOver() {
  this.classList.add('drag-over');// add style margin-top: 40px;
  e.preventDefault();
}

export function swapItems(fromIndex, toIndex) {
  const taskListArr = getArr();
  taskListArr[fromIndex - 1].Index = toIndex;
  taskListArr[toIndex - 1].Index = fromIndex;
  taskListArr.sort((a, b) => a.Index - b.Index);
  saveInLocalStorage(taskListArr);
  clearList();
  renderList();
}

export function dragDrop() {
  const dragEndIndex = this.id;
  const dragStartIndex = JSON.parse(localStorage.getItem('startDragIndex'));
  swapItems(dragStartIndex, dragEndIndex);
}
