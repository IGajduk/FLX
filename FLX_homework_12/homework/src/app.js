const addNewItemPage = document.getElementById('add-new-item'),
    editTodoPage = document.getElementById('edit-todo'),
    mainPage = document.getElementById('main'),
    cancelEditTodoBtn = document.getElementById('cancel-edit-todo-btn'),
    cancelAddTodoBtn = document.getElementById('cancel-add-todo-btn'),
    addNewBtn = document.getElementById('add-todo-btn'),
    addNewInput = document.getElementById('add-todo-input'),
    editTodoInput = document.getElementById('edit-todo-input'),
    listBlock = document.getElementById('list'),
    checkedListBlock = document.getElementById('checked-list'),
    locationHashArr = location.hash.split('/:'),
    ifListEmpty = document.createElement('p'),
    regexp = /todo.[d]{0,1}[0-9]{0,15}/ig,
    zero = 0,
    one = 1;
let todoItems = [];
ifListEmpty.setAttribute('class', 'empty-list');
ifListEmpty.innerText = 'Your list is empty...';
ifListEmpty.style.paddingTop = '20px';

if (location.hash === '' || locationHashArr[zero] === '#/modify' || location.hash === '#/add-new-item') {
    addNewItemPage.style.display = 'none';
    editTodoPage.style.display = 'none';
    mainPage.style.display = 'block';
    location.hash = '';
}

if (localStorage.length) {
    pushAndAddTodoList();
} else {
    listBlock.appendChild(ifListEmpty);
}

function pushAndAddTodoList() {
    listBlock.innerHTML = '';
    checkedListBlock.innerHTML = '';
    todoItems = [];
    if (localStorage.length) {
        for (let i = 0; i < localStorage.length; i++) {
            while (regexp.exec(localStorage.key(i))) {
                const todoId = localStorage.key(i);
                const todoObj = JSON.parse(localStorage.getItem(todoId));
                todoItems.push({
                        position: todoObj.position,
                        isDone: todoObj.isDone,
                        description: todoObj.description,
                        id: todoId
                    }
                );
            }
        }
    } else {
        listBlock.appendChild(ifListEmpty);
    }
    todoItems.sort(comparePosition);
    createTaskBlocks(todoItems);
}

function idMaker() {

    return `todo.${new Date().getDate() * new Date().getMonth() * new Date().getHours() *
    new Date().getMinutes() * new Date().getMilliseconds() * new Date().getFullYear()}`;
}

function createTaskBlocks(arr) {
    for (const todo of arr) {
        const oneOfList = document.createElement('div');
        oneOfList.setAttribute('class', 'one-of-list');
        oneOfList.setAttribute('id', todo.id);
        const emptyCheckBox = document.createElement('img');
        const doneCheckBox = document.createElement('img');
        const removeBtn = document.createElement('img');
        if (todo.isDone === true) {
            doneCheckBox.setAttribute('class', 'todo-icons checkbox');
            doneCheckBox.setAttribute('src', './assets/img/done-s.png');
            doneCheckBox.setAttribute('alt', 'done-btn');
            oneOfList.appendChild(doneCheckBox);
            removeBtn.setAttribute('class', 'todo-icons remove');
            removeBtn.setAttribute('src', './assets/img/remove-s.jpg');
            removeBtn.setAttribute('alt', 'remove-btn');
        } else {
            emptyCheckBox.setAttribute('class', 'todo-icons  checkbox');
            emptyCheckBox.setAttribute('src', './assets/img/todo-s.png');
            emptyCheckBox.setAttribute('alt', 'todo-btn');
            oneOfList.appendChild(emptyCheckBox);
            removeBtn.setAttribute('class', 'todo-icons remove disassembled');
            removeBtn.setAttribute('src', './assets/img/remove-s.jpg');
            removeBtn.setAttribute('alt', 'remove-btn');
        }
        const todoText = document.createElement('a');
        todoText.setAttribute('href', `#/modify/:${todo.id}`);
        todoText.setAttribute('class', `todo-text`);
        todoText.innerText = todo.description;
        oneOfList.appendChild(todoText);
        oneOfList.appendChild(removeBtn);
        if (todo.isDone === true) {
            checkedListBlock.appendChild(oneOfList);
        } else {

            listBlock.appendChild(oneOfList);
        }

    }
}


function comparePosition(objA, objB) {

    return objA.position - objB.position;
}

function setPositionForElem() {
    let todoArr = [];
    if (localStorage.length) {
        for (let i = 0; i < localStorage.length; i++) {
            while (regexp.exec(localStorage.key(i))) {
                const todo = localStorage.key(i);
                todoArr.push(JSON.parse(localStorage.getItem(todo)));
            }
        }
        todoArr.sort(comparePosition);
        let positionOfLastElem = todoArr[todoArr.length - one].position;
        positionOfLastElem = one + positionOfLastElem;

        return positionOfLastElem;
    } else {

        return one;
    }
}

window.addEventListener('hashchange', function (e) {
    const zero = 0;
    const arrForIdParse = e.target.location.hash.split('/:');
    if (e.target.location.hash === '#/add-new-item') {
        addNewItemPage.style.display = 'block';
        editTodoPage.style.display = 'none';
        mainPage.style.display = 'none';
    } else if (e.target.location.hash === '') {
        addNewItemPage.style.display = 'none';
        editTodoPage.style.display = 'none';
        mainPage.style.display = 'block';
    } else if (arrForIdParse[zero] === `#/modify`) {
        if (localStorage.getItem(arrForIdParse[one])) {
            editTodoInput.value = JSON.parse(localStorage.getItem(arrForIdParse[one])).description;
            editTodoInput.idOfTodo = arrForIdParse[one];
        }
        addNewItemPage.style.display = 'none';
        editTodoPage.style.display = 'block';
        mainPage.style.display = 'none';
    }
});

document.addEventListener('click', function (e) {
    if (cancelEditTodoBtn === e.target || cancelAddTodoBtn === e.target) {
        location.hash = '';
        addNewItemPage.style.display = 'none';
        editTodoPage.style.display = 'none';
        mainPage.style.display = 'block';
    } else if (addNewBtn === e.target && addNewInput.value) {
        listBlock.innerHTML = '';
        localStorage.setItem(idMaker(), JSON.stringify({
            position: setPositionForElem(),
            isDone: false,
            description: addNewInput.value
        }));
        addNewInput.value = '';
        pushAndAddTodoList();
        location.hash = '';
    } else if (e.target.classList.contains('remove') && !e.target.classList.contains('disassembled')) {
        localStorage.removeItem(e.target.parentNode.id);
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        pushAndAddTodoList();
    } else if (e.target.classList.contains('checkbox')) {
        const todoObjFromStorage = JSON.parse(localStorage.getItem(e.target.parentNode.id));
        if (todoObjFromStorage.isDone === false) {
            localStorage.setItem(idMaker(), JSON.stringify({
                position: setPositionForElem(),
                isDone: true,
                description: todoObjFromStorage.description
            }));
            localStorage.removeItem(e.target.parentNode.id);
            listBlock.removeChild(e.target.parentNode);
            pushAndAddTodoList();
        }
    } else if (e.target.classList.contains('save-changes') && document.getElementById('edit-todo-input').value) {
        const todoObjFromStorage = JSON.parse(localStorage.getItem(editTodoInput.idOfTodo));
        localStorage.removeItem(editTodoInput.idOfTodo);
        localStorage.setItem(editTodoInput.idOfTodo, JSON.stringify({
            position: todoObjFromStorage.position,
            isDone: todoObjFromStorage.isDone,
            description: document.getElementById('edit-todo-input').value
        }));
        pushAndAddTodoList();
        location.hash = '';
    }
});