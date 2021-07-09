const todoForm = document.querySelector('.todo-form');

const handleTodoFormSubmit = (event) => {
  event.preventDefault();
};

todoForm.addEventListener('submit', handleTodoFormSubmit);
