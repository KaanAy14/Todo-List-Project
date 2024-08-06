// Selecting All the Elements

const addForm = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card")[1];
const secondCardBody = document.querySelectorAll(".card")[2];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");


let todos = [];

runEvents();

function runEvents(){
    addForm.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadPage);
    secondCardBody.addEventListener("click",removeTodo);
    clearButton.addEventListener("click",clearAllTodos);
    filterInput.addEventListener("keyup",filter);
}


function filter(e){
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListItems = document.querySelectorAll(".list-group-item");

    if(todoListItems.length > 0 ){

        todoListItems.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                todo.setAttribute("style","display : block");
            }else{
                todo.setAttribute("style","display : none !important");
            }
        });

    }else{
        showAlert("warning","To filter, you should have at least 1 todo.")
    }
}


function clearAllTodos(){
    const todoList = document.querySelectorAll(".list-group-item");
    if(todoList.length > 0){
        //clear from screen
        todoList.forEach(function(todo){
            todo.remove();
        });

        // clear storage
        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos));

        showAlert("success","List cleared successfully.");

    }else{
        showAlert("danger","There is no todo to clear.");
    }
}

function removeTodo(e){
    if(e.target.className ==="fa fa-remove"){
        // remove from UI
        const todoToRemove = e.target.parentElement.parentElement;
        todoToRemove.remove();

        // remove from storage
        removeTodoFromStorage(todoToRemove.textContent);

        showAlert("success","Todo is removed.");
    }
}

function removeTodoFromStorage(removeTodo){
    checkTodosFromStorage();
    todos.forEach(function(todo,index){
        if(removeTodo === todo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadPage(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(e){
    const inputText = addInput.value.trim();

    if(inputText == null || inputText == ""){
        showAlert("warning","Please add a todo.");
    }else{
    //add to interface
    addTodoToUI(inputText);

    //add to storage
    addTodoToStorage(inputText);

    showAlert("success","Todo added!");

    }
    e.preventDefault();
}

function addTodoToUI(newTodo){

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);
    
    addInput.value = "";
}

function addTodoToStorage(newTodo){
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage(){
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type,message){
    const divAlert = document.createElement("div");
    divAlert.className = "alert alert-"+type;
    divAlert.textContent = message;

    firstCardBody.appendChild(divAlert);

    setTimeout(function(){
        divAlert.remove();
    },2250);

}