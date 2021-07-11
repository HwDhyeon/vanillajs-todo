const todoForm = document.querySelector(".todo-form");
const todoInput = todoForm.querySelector(".todo-input");
const todolist = document.querySelector(".todolist");

let todos = [];

const readTodo = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const saveTodo = (todo) => {
  todos.push(todo);
  saveTodos();
};

const todoEditForm = (hidedElement, text) => {
  const form = document.createElement("form");
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.value = text;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = event.target.querySelector("input");
    const text = input.value;
    const div = event.target.parentNode;
    const editBtn = div.querySelector(".edit");

    if (text !== "") {
      const currentTodo = todos.find((todo) => todo.id === parseInt(div.id));
      currentTodo.text = text;
      saveTodos();
      paintTodo();
    }
    div.removeChild(form);
    hidedElement.classList.remove("hide");
    editBtn.classList.remove("hide");
  });

  form.appendChild(input);

  return [form, input];
};

const todoActionBox = () => {
  const div = document.createElement("div");
  const editBtn = document.createElement("div");
  const deleteBtn = document.createElement("div");
  const editBtnIcon = document.createElement("i");
  const deleteBtnIcon = document.createElement("i");

  div.setAttribute("class", "flex-row");

  editBtn.setAttribute("class", "pointer edit");
  deleteBtn.setAttribute("class", "pointer delete");

  editBtnIcon.setAttribute("class", "far fa-edit fa-2x");
  deleteBtnIcon.setAttribute("class", "far fa-trash-alt fa-2x");

  editBtn.appendChild(editBtnIcon);
  deleteBtn.appendChild(deleteBtnIcon);

  editBtn.addEventListener("click", (event) => {
    editBtn.classList.add("hide");
    const div = event.target.parentNode.parentNode.parentNode;
    const span = div.querySelector("span");
    span.classList.add("hide");
    const [form, input] = todoEditForm(span, span.textContent);
    div.prepend(form);
    input.focus();
  });

  deleteBtn.addEventListener("click", (event) => {
    const div = event.target.parentNode.parentNode.parentNode;
    todos = todos.filter((todo) => todo.id !== parseInt(div.id));
    div.parentNode.removeChild(div);
    saveTodos();
    paintTodo();
  });

  div.appendChild(editBtn);
  div.appendChild(deleteBtn);

  return {
    div,
    editBtn,
    deleteBtn,
  };
};

const paintTodo = () => {
  todolist.innerHTML = "";
  todos.forEach((todo) => {
    const div = document.createElement("div");
    const span = document.createElement("span");
    div.setAttribute("id", todo.id);
    div.classList.add("todo");
    div.classList.add("pointer");
    span.innerText = todo.text;
    if (todo.status == "finished") {
      span.style.textDecoration = "line-through";
    }

    const actionBox = todoActionBox();
    div.appendChild(span);
    div.appendChild(actionBox.div);

    span.addEventListener("click", (evnet) => {
      const currentTodo = todos.find(
        (todo) => todo.id === parseInt(evnet.target.parentNode.id)
      );
      if (currentTodo.status === "finished") {
        currentTodo.status = "progressing";
      } else if (currentTodo.status === "progressing") {
        currentTodo.status = "finished";
      }
      saveTodos();
      paintTodo();
    });

    todolist.appendChild(div);
  });
};

const handleTodoFormSubmit = (event) => {
  event.preventDefault();

  const text = todoInput.value;
  if (text === "") return;
  const todo = {
    id: Date.now(),
    text,
    status: "progressing",
  };

  saveTodo(todo);
  todoInput.value = "";
  paintTodo();
};

(() => {
  todos = readTodo();
  paintTodo();
  todoInput.focus();
})();

todoForm.addEventListener("submit", handleTodoFormSubmit);
