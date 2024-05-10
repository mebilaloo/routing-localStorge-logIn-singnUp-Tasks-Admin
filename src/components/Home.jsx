import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditTodo, setIsEditTodo] = useState(null);
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  useEffect(() => {
    const storedTodos = JSON.parse(
      localStorage.getItem(`userId_${loggedInUser.id}`)
    );
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);
  const handleAddTodo = () => {
    if (todo === "") {
      alert("Please don't keep the input empty");
      return;
    } else if (todo && !toggleSubmit) {
      setTodos(
        todos.map((item) => {
          if (item.id === isEditTodo) {
            return { ...item, text: todo };
          }
          return item;
        })
      );
      setTodo("");
      setToggleSubmit(true);
      setIsEditTodo(null);
    } else {
      const newTodo = {
        id: Date.now(),
        // userId: loggedInUser.id,
        text: todo,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      localStorage.setItem(
        `userId_${loggedInUser.id}`,
        JSON.stringify(updatedTodos)
      );
      setTodo("");
    }
  };
  const handleRemoveTodo = (id) => {
    const updatedTodos = todos.filter((todo) => id !== todo.id);
    setTodos(updatedTodos);
    localStorage.setItem(
      `userId_${loggedInUser.id}`,
      JSON.stringify(updatedTodos)
    );
  };
  const handleEditTodo = (id) => {
    const editTodo = todos.find((todo) => todo.id === id);
    setTodo(editTodo.text);
    setToggleSubmit(false);
    setIsEditTodo(id);
  };
  const handleLogOut = () => {
    localStorage.removeItem("loginUser");
    navigate("/login");
  };
  return (
    <div>
      <h1>Home</h1>
      <h2>Welcome {loggedInUser.username}</h2>
      <div>
        <input
          type="text"
          placeholder="Add todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        {toggleSubmit ? (
          <>
            <button onClick={handleAddTodo}>Add</button>
          </>
        ) : (
          <>
            <button onClick={handleAddTodo}>confirm</button>
          </>
        )}
      </div>
      <div>
        <ul>
          {todos && todos.length > 0 ? (
            todos.map((todo) => (
              <li key={todo.id}>
                <h2>{todo.text}</h2>
                <button onClick={() => handleRemoveTodo(todo.id)}>
                  Remove
                </button>
                <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
              </li>
            ))
          ) : (
            <li> No tasks to show</li>
          )}
        </ul>
      </div>
      <div>
        <button onClick={handleLogOut}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
