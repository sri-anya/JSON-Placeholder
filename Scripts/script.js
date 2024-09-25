document.addEventListener('DOMContentLoaded', () => {
    fetchTodos();

    document.getElementById('add-todo').addEventListener('click', addTodo);
});

function fetchTodos() {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayTodos(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function displayTodos(todos) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = ''; // Clear existing todos

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = `${todo.id}: ${todo.title} - ${todo.completed ? 'Completed' : 'Not completed'}`;
        todoList.appendChild(li);
    });
}

function addTodo() {
    const todoInput = document.getElementById('new-todo');
    const newTodoText = todoInput.value.trim();

    if (newTodoText) {
        const newTodo = {
            title: newTodoText,
            completed: false,
            userId: 1 // You can set userId to any value; it's just a placeholder here
        };

        // Send the new todo to the server
        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Display the new todo at the top of the list
            const li = document.createElement('li');
            li.textContent = `${data.id}: ${data.title} - Not completed`;
            const todoList = document.getElementById('todo-list');
            todoList.insertBefore(li, todoList.firstChild);

            // Clear the input field
            todoInput.value = '';
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    } else {
        alert('Please enter a todo!');
    }
}
