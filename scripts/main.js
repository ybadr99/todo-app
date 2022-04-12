const todos = getSavedTodo();

const filters = {
  searchText: "",
  hideCompeleted: false,
};

renderTodos(todos, filters);

document.querySelector("#Search").addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector("#hideCompeleted").addEventListener("change", (e) => {
  filters.hideCompeleted = e.target.checked;
  renderTodos(todos, filters);
});

document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  todos.push({
    id: uuidv4(),
    text: e.target.text.value,
    completed: false,
  });

  savedTodos();
  renderTodos(todos, filters);
  e.target.text.value = "";
});
