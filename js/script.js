// define UI Element 
let form = document.querySelector('#taskForm');
let getInput = document.querySelector('#taskInput');
let Filter = document.querySelector('#filterTask');
let taskList = document.querySelector('#tasks');
let clearBtn = document.querySelector('#clearTaskBtn');

// Define add Event Listener 
form.addEventListener('submit', addNewTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
Filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTask);

function addNewTask(e) {
    if (getInput.value === '') {
        alert('add a task')
    } else {
        // create li
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(getInput.value + ' '));
        taskList.appendChild(li);
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);
        // local storage
        storeTaskInLocalStorage(getInput.value);
        getInput.value = '';
    }
    e.preventDefault();
}

// removeTask
function removeTask(e) {
    if (e.target.hasAttribute('href')) {
        if (confirm('are you sure? ')) {
            let confirmTask = e.target.parentElement;
            confirmTask.remove();
            removeFromLocStore(confirmTask);
        }
    }
}

// clear Task
function clearTask(e) {
    // taskList.innerHTML = '';
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
}

// filter task
function filterTask(e) {
    let findText = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(findText) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}

// store in local storage
function storeTaskInLocalStorage(task) {
    let allTask;
    if (localStorage.getItem('allTask') === null) {
        allTask = [];
    } else {
        allTask = JSON.parse(localStorage.getItem('allTask'))
    }
    allTask.push(task);

    localStorage.setItem('allTask', JSON.stringify(allTask))
}

// store in browser from local storage
function getTask(task) {
    let allTask;
    if (localStorage.getItem('allTask') === null) {
        allTask = [];
    } else {
        allTask = JSON.parse(localStorage.getItem('allTask'));
    }

    allTask.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + ' '));
        taskList.appendChild(li);
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);
    })
}

// remove task from local store

function removeFromLocStore(taskItem) {
    let allTask;
    if (localStorage.getItem('allTask') === null) {
        allTask = [];
    } else {
        allTask = JSON.parse(localStorage.getItem('allTask'));
    }
    
    let li = taskItem;
    li.removeChild(li.lastChild);
    allTask.forEach((task, index) => {
        if (li.textContent.trim() === task) {
            allTask.splice(index, 1)
        }
    });
    localStorage.setItem('allTask', JSON.stringify(allTask));
}
