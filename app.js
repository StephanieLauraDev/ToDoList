// Selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
// Functions
function addTodo(event) {
	// Prevent form from submitting
	event.preventDefault();
	// Create todo div
	const todoDiv = document.createElement('div');
	// Add class to div
	todoDiv.classList.add('todo');
	// Create li
	const newTodo = document.createElement('li');
	// todo value
	newTodo.innerText = todoInput.value;
	// add classlist to newtodo
	newTodo.classList.add('todo-item');
	//grab todo  and append the child to the todo div
	todoDiv.appendChild(newTodo);
	// Add the todo to local storage
	saveLocalTodos(todoInput.value);
	// add completed and delete buttons
	const completed = document.createElement('button');
	// Add the FontAwesome icon to the button
	completed.innerHTML = '<i class="fas fa-check"></i>';
	completed.classList.add('completed-btn');
	todoDiv.appendChild(completed);

	const trash = document.createElement('button');
	// Add the FontAwesome icon to the button
	trash.innerHTML = '<i class="fas fa-trash"></i>';
	trash.classList.add('trash-btn');
	todoDiv.appendChild(trash);

	// Get the div and attach it to the ul
	todoList.appendChild(todoDiv);

	// Clear value when added
	todoInput.value = '';
}

function deleteCheck(e) {
	// Grab the event - what we're clicking on in the div
	const item = e.target;

	// Delete todo
	if (item.classList[0] === 'trash-btn') {
		const todo = item.parentElement;
		// Add the animation before removing
		todo.classList.add('fall');
		removeLocalTodos(todo);
		todo.addEventListener('transitionend', function() {
			todo.remove();
		});
	}

	// Check todo
	if (item.classList[0] === 'completed-btn') {
		const todo = item.parentElement;
		todo.classList.toggle('completedTodo');
	}
}

function filterTodo(e) {
	// Grab the todo list
	const todos = todoList.childNodes;

	// Check what's being clicked
	todos.forEach(function(todo) {
		switch (e.target.value) {
			case 'all':
				// show all the todos
				todo.style.display = 'flex';
				break;
			case 'completed':
				if (todo.classList.contains('completedTodo')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;

			case 'uncompleted':
				if (!todo.classList.contains('completedTodo')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
		}
	});
}

function saveLocalTodos(todo) {
	// check if I already have todos
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	// Push the todo into the array and return it to local storage
	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
	// check if I already have todos
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	todos.forEach(function(todo) {
		const todoDiv = document.createElement('div');
		// Add class to div
		todoDiv.classList.add('todo');
		// Create li
		const newTodo = document.createElement('li');
		// todo value
		newTodo.innerText = todo;
		// add classlist to newtodo
		newTodo.classList.add('todo-item');
		//grab todo  and append the child to the todo div
		todoDiv.appendChild(newTodo);

		// add completed and delete buttons
		const completed = document.createElement('button');
		// Add the FontAwesome icon to the button
		completed.innerHTML = '<i class="fas fa-check"></i>';
		completed.classList.add('completed-btn');
		todoDiv.appendChild(completed);

		const trash = document.createElement('button');
		// Add the FontAwesome icon to the button
		trash.innerHTML = '<i class="fas fa-trash"></i>';
		trash.classList.add('trash-btn');
		todoDiv.appendChild(trash);

		// Get the div and attach it to the ul
		todoList.appendChild(todoDiv);
	});
}

function removeLocalTodos(todo) {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);

	localStorage.setItem('todos', JSON.stringify(todos));
}
