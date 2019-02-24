const inputTodo = document.getElementById('todo-input'),
    divTodoWithTodoLists = document.getElementById('todo-list'),
    newOneOfTheList = document.createElement('div'),
    newEmptyCheckbox = document.createElement('i'),
    newTextOfOneOfTodo = document.createElement('p'),
    newDeleteBtn = document.createElement('i'),
    maxLengthOfList = 10,
    oneHundred = 100,
    addOneTodoBtn = document.getElementById('add-one-todo');
let counterForId = Math.ceil(Math.random() * oneHundred);

document.addEventListener(
    'click', (e) => {
        if (e.target.classList.contains('checkbox-empty')) {
            doneOneOfList(e);
        }
        if (e.target.classList.contains('delete')) {
            deleteOneOfList(e);
        }
    }
);

addOneTodoBtn.addEventListener(
    'click',
    () => {
        if (divTodoWithTodoLists.children.length < maxLengthOfList) {
            appendOneOfList();
        } else {
            alert('Maximum item per list are created');
        }
    }
);

document.addEventListener('dragstart', function (event) {
    if (event.target.tagName === 'DIV' && event.target.classList.contains('droptarget')) {
        event.dataTransfer.setData('text/plain', event.target.id);
        event.target.style.opacity = '0.4';
        event.target.classList.remove('droptarget');
    } else {
        return false;
    }
});

document.addEventListener('dragend', function (event) {
    if (event.target.classList.contains('droptarget')) {
        event.target.style.opacity = '1';
    }
    for (const elem of event.target.parentNode.children) {
        if (elem.classList.contains('one-of-list')) {
            elem.removeAttribute('class');
            elem.setAttribute('class', 'one-of-list droptarget');
            elem.style.opacity = '1';
        }
    }
});

document.addEventListener('dragenter', function (ev) {
    if (ev.target.classList.contains('droptarget')) {
        ev.target.style.border = '3px dotted red';
        if (ev.target.parentNode.lastElementChild === ev.target) {
            ev.target.style.paddingBottom = '44px';
        } else {
            ev.target.style.paddingTop = '44px';
        }
    }
});

document.addEventListener('dragover', function (event) {
    event.preventDefault();
});

document.addEventListener('dragleave', function (event) {
    if (event.target.classList.contains('droptarget')) {
        event.target.style.border = '';
        event.target.style.paddingTop = '10px';
        event.target.style.opacity = '1';
    }
});

document.addEventListener('drop', function (event) {
    event.preventDefault();
    if (event.target.classList.contains('droptarget')) {
        event.target.style.paddingTop = '10px';
        event.target.style.paddingBottom = '10px';
        event.target.style.border = '';
        const data = event.dataTransfer.getData('text');
        const dropElem = document.getElementById(data);
        if (dropElem.tagName === 'DIV') {
            if (event.target.parentNode.lastElementChild === event.target) {
                event.target.parentNode.appendChild(dropElem);
            } else {
                event.target.parentNode.insertBefore(dropElem, event.target);
            }
            dropElem.removeAttribute('class');
            dropElem.setAttribute('class', 'one-of-list droptarget');
        }
    }
});

function fillNewEmptyCheckbox() {
    newEmptyCheckbox.setAttribute('class', 'material-icons checkbox-empty');
    newEmptyCheckbox.setAttribute('draggable', 'false');

    return newEmptyCheckbox;
}

function fillNewTextOfOneOfTodo() {
    newTextOfOneOfTodo.setAttribute('class', 'text-todo-list');
    newTextOfOneOfTodo.innerText = inputTodo.value;

    return newTextOfOneOfTodo;
}

function fillNewDeleteBtn() {
    newDeleteBtn.setAttribute('class', 'material-icons delete');
    newDeleteBtn.setAttribute('draggable', 'false');
    newDeleteBtn.innerText = 'delete';

    return newDeleteBtn;
}

function idMaker() {
    return new Date().getDate() * new Date().getMonth() * new Date().getHours() *
        new Date().getMinutes() * new Date().getMilliseconds() * new Date().getFullYear()
}

function fillNewOneOfTheList() {
    newOneOfTheList.setAttribute('class', 'one-of-list droptarget');
    newOneOfTheList.setAttribute('draggable', 'true');
    newOneOfTheList.setAttribute('id', `drag${idMaker()}`);
    newOneOfTheList.appendChild(fillNewEmptyCheckbox());
    newOneOfTheList.appendChild(fillNewTextOfOneOfTodo());
    newOneOfTheList.appendChild(fillNewDeleteBtn());

    return newOneOfTheList;
}

function appendOneOfList() {
    if (inputTodo.value) {
        divTodoWithTodoLists.appendChild(fillNewOneOfTheList().cloneNode(true));
        inputTodo.value = '';
        inputTodo.focus();
        if (divTodoWithTodoLists.children.length === maxLengthOfList) {
            inputTodo.setAttribute('disabled', 'disabled');
            inputTodo.style.background = 'rgba(0, 0, 0, 0.5)';
        }
    }
}

function doneOneOfList(e) {
    e.target.classList.remove('checkbox-empty');
    e.target.classList.add('checkbox');
    e.target.innerText = 'checkbox';
}

function deleteOneOfList(e) {
    e.target.parentElement.parentElement.removeChild(e.target.parentElement);
    inputTodo.removeAttribute('disabled');
    inputTodo.style.background = '#ffffff';
    counterForId--;
}
