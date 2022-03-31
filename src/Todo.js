import React from "react";
import "./Todo.css";

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  return (
    <div className="checkbox">
      <label>
        <input
          type="checkbox"
          style={{ marginRight: "1rem" }}
          checked={todo.complete}
          onChange={handleTodoClick} //calling the function with the id of the to do
        />
        {todo.name}
      </label>
    </div>
  );
}
