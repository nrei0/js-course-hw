const todoItems = {};

const editHandler = (todoItem) => {
  const hasInput = !!todoItem.querySelector(".todo-edit");

  if (hasInput) return;

  const value = todoItem.innerText;
  todoItem.innerText = "";

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = value;
  inputField.classList.add("todo-edit");

  const inputBlurEditHandler = async () => {
    // tbd: remove event listener.

    try {
      await axios.patch("/todo/" + todoItem.id, {
        value: inputField.value,
      });

      todoItem.innerText = inputField.value;
      inputField.remove();
    } catch (e) {
      console.error("We have an error");
      console.error(e);
    }
  };

  inputField.addEventListener("blur", inputBlurEditHandler);

  todoItem.appendChild(inputField);
  inputField.focus();
};

const removeHandler = async (todoItem) => {
  try {
    await axios.delete("/todo/" + todoItem.id); // /todo/1

    todoItem.remove();
  } catch (e) {
    console.error("We have an error");
    console.error(e);
  }
};

// CRUD
// Create-Read-Update-Delete
// PUT-GET-PATCH-DELETE
// GET - to get something
// POST - to calculate something
// PATCH - to update resource
// DELETE - to delete resource
// PUT - add something

const addTodo = (todoList, id, value) => {
  // create <li> element
  const todoItem = document.createElement("li");

  // Add classes
  todoItem.classList.add("todo-item");
  todoItem.id = id;
  todoItem.innerText = value;

  todoItem.addEventListener("click", () => {
    editHandler(todoItem);
  });

  const imgRemoveBtn = document.createElement("img");
  imgRemoveBtn.src = "./remove-icon.png";
  imgRemoveBtn.classList.add("todo-item-remove");

  imgRemoveBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    removeHandler(todoItem);
  });

  todoItem.appendChild(imgRemoveBtn);

  // Append to DOM
  todoList.appendChild(todoItem);
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

  loadedTodoItems.forEach((todoItem) => {
    const { id, value } = todoItem;
    addTodo(todoList, id, value);
  });

  /**
   * Edit todos impl.
   */

  todoItems.forEach((todoItem) => {
    todoItem.addEventListener("click", () => {
      editHandler(todoItem);
    });
  });

  /**
   * Add new todos impl.
   */
  if (todoAddBtn && todoList) {
    todoAddBtn.addEventListener("click", async () => {
      try {
        const { id, value } = (await axios.post("/todo")).data;

        addTodo(todoList, id, value);
      } catch (e) {
        console.error("We have an error");
        console.error(e);
      }
    });
  }
});
