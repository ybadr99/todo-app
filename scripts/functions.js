const getSavedTodo = () => {
  const todosJSON = localStorage.getItem("todos");
  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    return [];
  }
};

const savedTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const removeTodo = (id) => {
  const indexTodo = todos.findIndex((todo) => todo.id === id);

  if (indexTodo > -1) {
    todos.splice(indexTodo, 1);
  }
};

const renderTodos = (todos, filters) => {
  let filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(filters.searchText)
  );

  filteredTodos = filteredTodos.filter(
    (todo) => !filters.hideCompeleted || !todo.completed
  );

  document.querySelector("#todos").innerHTML = "";

  document.querySelector("#todos").appendChild(getSummary());

  filteredTodos.forEach((todo) => {
    document.querySelector("#todos").appendChild(generateTodoDom(todo));
  });
};

const generateTodoDom = (todo) => {
  const todoEl = document.createElement("div");
  const todoText = document.createElement("a");
  const checkbox = document.createElement("input");
  const btn = document.createElement("button");

  // setup todo checkbox
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  todoEl.appendChild(checkbox);
  checkbox.addEventListener("change", (e) => {
    todo.completed = e.target.checked;
    savedTodos();
    renderTodos(todos, filters);
  });

  //setup todo text
  todoText.textContent = todo.text;
  todoEl.appendChild(todoText);

  //setup todo button
  btn.textContent = "x";
  todoEl.appendChild(btn);
  btn.addEventListener("click", (e) => {
    removeTodo(todo.id);
    savedTodos();
    renderTodos(todos, filters);
  });

  return todoEl;
};

const getSummary = () => {
  const leftTodos = todos.filter((todo) => !todo.completed);
  const summary = document.createElement("h2");
  summary.textContent = `You have ${leftTodos.length} left`;
  return summary;
};
