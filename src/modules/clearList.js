// CLEAR ALL TASKS ON HTML --------
const clearList = () => {
  const listPlaceholder = document.getElementById('list-placeholder');
  while (listPlaceholder.firstChild) {
    listPlaceholder.removeChild(listPlaceholder.firstChild);
  }
};

export default clearList;
