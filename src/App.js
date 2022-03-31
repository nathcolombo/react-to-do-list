import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
//uuid to create a function which generates a random id

const LOCAL_STORAGE_KEY = "todoApp.todos";

//wrap both inside an empty element so it can return more than one
//default state is an empty array []
function App() {
  const [todos, setTodos] = useState([]); //object destructuring
  //todos is every one inside the useState and setTodos we call to update them
  const todoNameRef = useRef(); //access what you type

  //this is to load of all the to do's
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  //every time something in this array changes, it runs useEffect (in this case, the todo's)
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  //function to check the boxes of the to do's using copy of the to do's
  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value; //whatever element we are referring
    if (name === "") return;
    setTodos((prevTodos) => {
      //show the previous to do's and add a new one
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    console.log(name);
    todoNameRef.current.value = null; //if we type something and hit to do it will clear the input
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <div>
        <h1>To-do List &#128221;</h1>
      </div>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add to-do</button>
      {/*add a new one to do*/}
      <button onClick={handleClearTodos}>Clear the complete</button>
      <div>
        You have{" "}
        <strong>{todos.filter((todo) => !todo.complete).length}</strong> left
        to-do.
      </div>
      {/*filter all the ones that are not checked*/}
    </>
  );
}

export default App;
