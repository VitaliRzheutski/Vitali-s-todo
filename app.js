//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck)
filterOption.addEventListener('click',filterTodo);



//FUNCTIONS

//so here we want to buid:
//  <div class="todo">
//      <li></li>
//      <button></button>
//      <button></button>
//  </div>
// and append this to class="todo-list"

function addTodo(event){
    //Prevent from submitting
    event.preventDefault();

    //TOdo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);

    //Check mark button
    const completedButton =document.createElement('button');
    //if we want to add some HTML code,need to use innerHTML
    completedButton.innerHTML = '<i class="fas fa-check"></i>'; 
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //Check trash button
    const trashButton =document.createElement('button');
    //if we want to add some HTML code,need to use innerHTML
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'; 
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //APPEND to list 
    todoList.appendChild(todoDiv);

    //Clear Todo Input Value
    todoInput.value = '';
}

function deleteCheck(e){
    const item = e.target;

    //Delete todo
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //ANimation (after transition we need to delete item)
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend',function(){ 
            todo.remove();
        });
    }

    //CHECK mark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    //check --HEY Do I already have thing in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos(){
        //check --HEY Do I already have thing in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        //TOdo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Check mark button
    const completedButton =document.createElement('button');
    //if we want to add some HTML code,need to use innerHTML
    completedButton.innerHTML = '<i class="fas fa-check"></i>'; 
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //Check trash button
    const trashButton =document.createElement('button');
    //if we want to add some HTML code,need to use innerHTML
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'; 
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //APPEND to list 
    todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
     //check --HEY Do I already have thing in there?
     let todos;
     if(localStorage.getItem('todos') === null){
         todos = [];
     }else{
         todos = JSON.parse(localStorage.getItem('todos'));
     }
     const todoIndex = todo.children[0].innerText;
     todos.splice(todos.indexOf(todoIndex),1);
     localStorage.setItem('todos',JSON.stringify(todos));
}