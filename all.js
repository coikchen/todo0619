let todoArr = [];
let doneArr = [];
let addBtn = document.querySelector('#addBtn');
let newTodo = document.querySelector('#newTodo');
let todoList = document.querySelector('#todoList');
let taskNum = document.querySelector('#taskNum');
let clearBtn = document.querySelector('#clearBtn');
// 新增
addBtn.addEventListener('click', addTodo);
function addTodo() {
  if (newTodo.value.trim() != '') {
    todoArr.push({
      id: Math.floor(Date.now()), //id 隨機編碼
      todoTitle: newTodo.value,
      completed: false,
    });
  } else {
    alert('請輸入待辦事項')
  }
  render();
}
// 全部移除
clearBtn.addEventListener('click', clearTodo);

function clearTodo(e) {
  e.preventDefault();
  renderClear();
}
// 刪除
todoList.addEventListener('click', removeTodo);
function removeTodo(e) {
  let removeIndex = 0;
  if (e.target.dataset.action == 'remove') {
    todoArr.forEach(function (item, key) {
      if (e.target.dataset.id == item.id) {
        removeIndex = key;
      }
    });
    todoArr.splice(removeIndex, 1)
    render();
  }
}

// 完成
todoList.addEventListener('click', doneTodo);
function doneTodo(e) {
  if (e.target.dataset.action = 'complete') {
    todoArr.forEach(function (item) {
      if (e.target.dataset.id == item.id) {
        if (item.completed) {
          item.completed = false
        } else {
          item.completed = true
        }}
    });
    render();
  }
}

// 畫面1，全部移除以外用的
function render() {
  let str = '';
  todoArr.forEach(function (item) {
    str += `<li class="list-group-item">
      <input type="checkbox" class="form-check-input" ${item.completed ? 'checked' : '' }
      data-action="complete" data-id="${item.id}" >
     <label class="form-check-label ${item.completed ? 'completed' : ''}" data-action="complete"
      data-id="${item.id}"> ${item.todoTitle} </label>
      <button type="button" class="close ml-auto" aria-label="Close"> 
        <span aria-hidden="true" data-action="remove" data-id="${item.id}">&times;</span>
      </button>
    </li> `
  });
  
  newTodo.value = '';
  todoList.innerHTML = str;
  taskNum.innerHTML = `待辦事項數量：${todoArr.length}`
}
// 畫面2，全部移除移除用
function renderClear() {
  todoArr = [];
  todoList.innerHTML = '';
  taskNum.innerHTML = `待辦事項數量：${todoArr.length}`
}

