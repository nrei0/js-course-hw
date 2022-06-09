const addTodo = (todoList, value) => {
  // create <li> element
  const todoItem = document.createElement("li");

  // Add classes
  todoItem.classList.add("todo-item");
  todoItem.innerText = value;

  todoItem.addEventListener("click", () => {
    editHandler(todoItem);
  });

  // Append to DOM
  todoList.appendChild(todoItem);
};

const editHandler = (todoItem) => {
  const hasInput = !!todoItem.querySelector(".todo-edit");

  if (hasInput) return;

  const value = todoItem.innerText;
  todoItem.innerText = "";

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = value;
  inputField.classList.add("todo-edit");

  const handler = () => {
    // tbd: remove event listener.
    todoItem.innerText = inputField.value;
    inputField.remove();
  };

  inputField.addEventListener("blur", handler);

  todoItem.appendChild(inputField);
  inputField.focus();
};

document.addEventListener("DOMContentLoaded", async () => {
  const todoItems = document.querySelectorAll(".todo-item");

  let loadedTodoItems = [];

  try {
    loadedTodoItems = ((await axios.get("/todos")).data || {}).todoItems;
  } catch (e) {
    console.error(e);
  }

  console.log(loadedTodoItems);

  const todoAddBtn = document.querySelector(".todo-add");
  const todoList = document.querySelector(".todo-items");

  /**
   * Fill todos from server
   */

  loadedTodoItems.forEach((todoValue) => {
    addTodo(todoList, todoValue);
  });

  /**
   * Edit todos impl.
   */

  todoItems.forEach((todoItem) => {
    todoItem.addEventListener("click", () => {
      editHandler(todoItem);
    });
  });

  // todo counter
  let i = 0;

  /**
   * Add new todos impl.
   */
  if (todoAddBtn && todoList) {
    todoAddBtn.addEventListener("click", () => {
      addTodo(todoList, i);
    });
  }
});
