const todoAdd = document.querySelector('.todo__add');
const todoInput = document.querySelector('.todo__text');
const todoItems = document.querySelector('.todo__items');
let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
const select = document.querySelector('.todo__options');

const createTask = (event) => {
  event.preventDefault();
  let chek = 0;
  if (!(todoInput.value.trim() === '')) {
    tasks.forEach((task) => {
      if (task.value === todoInput.value) {
        chek += 1;
      }
    })

    if (chek < 1) {
      const task = {
        value: todoInput.value,
        isCompleted: false,
        time: new Date().toLocaleString(),
      };
      tasks.push(task);
    }

    console.log(tasks);
    renderTasks(tasks);
  }
  todoInput.value = '';
}

const renderTasks = (tasks) => {
  todoItems.innerHTML = '';
  localStorage.setItem('tasks', JSON.stringify(tasks));
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.classList.add('todo__item');
    const todoTask = document.createElement('span');
    const todoValue = document.createElement('span');
    todoTask.classList.add('todo__task', task.isCompleted ? 'completed' : 'not-completed');
    todoValue.innerText = task.value;
    todoValue.classList.add('todo__value');
    todoTask.append(todoValue);
    todoTask.innerHTML += `<span class = "todo__date"> ${task.time} </span>`;
    li.append(todoTask);
    li.innerHTML += `<span class = "todo__action todo__action_complete"></span>
                        <span class = "todo__action todo__action_delete"></span>`;
    todoItems.append(li);
  })
}

const deleteTask = () => {
  const tag = event.target;
  if (tag.classList.contains('todo__action_delete')) {
    const newTasks = [];
    tasks.forEach((task) => {
      if (task.value !== tag.parentElement.querySelector('.todo__value').innerText) {
        newTasks.push(task);
      }
    })
    tasks = newTasks;
    renderTasks(tasks);
  }
}

const completedTask = () => {
  const tag = event.target;
  if (tag.classList.contains('todo__action_complete')) {
    tag.parentElement.classList.add('completed');
    const newTasks = tasks.map(task => task.value === tag.parentElement.querySelector('.todo__value').innerText ? {
      value: task.value,
      isCompleted: true,
      time: task.time,
    }
    : task,
      )
    tasks = newTasks;
    renderTasks(tasks);
  }
}


todoAdd.addEventListener('click', createTask);
todoItems.addEventListener('click', deleteTask);
todoItems.addEventListener('click', completedTask);

renderTasks(tasks);

const selectCompletedTasks = () => {
  const activeTasks = [];
  if (select.value === 'completed') {
     const completeTasks = tasks.filter();
      if (task.isCompleted === true) {
        completeTasks.push(task);
      }
    }
    renderTasks(completeTasks);
  
  localStorage.setItem('activeTasks', JSON.stringify(activeTasks));
  localStorage.setItem('completeTasks', JSON.stringify(completeTasks));
}





const selectTasks = () => {
  const activeTasks = [];
  const completeTasks = [];
  if (select.value === 'completed') {
    for (let task of tasks) {
      if (task.isCompleted === true) {
        completeTasks.push(task);
      }
    }
    renderTasks(completeTasks);
  } else if (select.value === 'active') {
    for (let task of tasks) {
      if (task.isCompleted === false) {
        activeTasks.push(task);
      }
    }
    renderTasks(activeTasks);
  } else {
    renderTasks(tasks);

  }
  localStorage.setItem('activeTasks', JSON.stringify(activeTasks));
  localStorage.setItem('completeTasks', JSON.stringify(completeTasks));
}

select.addEventListener('click', selectTasks);

renderTasks(tasks);
