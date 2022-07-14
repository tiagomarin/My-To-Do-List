// ADD NEW TASK --------

const createTask = (str, num) => {
  const newtask = { Description: str, Completed: false, Index: num };
  return newtask;
};

export default createTask;