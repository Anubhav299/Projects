let arr = JSON.parse(localStorage.getItem('tasks')) || [];

renderList();
function keydownAdd(event)
{
    if (event.key === 'Enter')
        addTask();
}

function addTask()
{
    const name = document.querySelector('.js-inputTask').value;
    const dueDate = document.querySelector('.js-inputDate').value;
    arr.push({
        //name: name, dueDate: dueDate
        name, dueDate
    });

    localStorage.setItem('tasks', JSON.stringify(arr));
    document.querySelector('.js-inputTask').value = '';
    document.querySelector('.js-inputDate').value = '';
    renderList();
}

function renderList()
{
    let todoList = '';
    arr.forEach( (toDoOject, index) => {
        const { name, dueDate } = toDoOject;
        const html = `
        <div>${name}</div>
        <div>${dueDate}</div>
        <button onclick = "
          arr.splice(${index},1);
          renderList();
        " class="js-delete-button">Delete</button>
        `;
        todoList += html;
    })
    document.querySelector('.to-do-list').innerHTML = todoList;
}

// function deleteTask()
// {

// }