const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");

// Load saved todos, or start with an empty array
let todos = JSON.parse(localStorage.getItem("todos")) ?? [];

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function render() {
  list.innerHTML = "";
  for (const todo of todos) {
    const li = document.createElement("li");
    li.className = todo.done ? "done" : "";

    const text = document.createElement("span");
    text.textContent = todo.text; // textContent, not innerHTML, to avoid HTML injection
    text.addEventListener("click", () => {
      todo.done = !todo.done;
      save();
      render();
    });

    const del = document.createElement("button");
    del.textContent = "✕";
    del.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      save();
      render();
    });

    li.append(text, del);
    list.append(li);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading
  todos.push({ id: Date.now(), text: input.value.trim(), done: false });
  input.value = "";
  save();
  render();
});

render();
