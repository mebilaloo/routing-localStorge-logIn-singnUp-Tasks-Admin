import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Admin = () => {
  const [allTodos, setAllTodos] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users"));
    const allUserTodos = [];

    if (users) {
      users.forEach((user) => {
        const userTodos = JSON.parse(localStorage.getItem(`userId_${user.id}`));

        if (userTodos) {
          const todosWithUsername = userTodos.map((todo, index) => ({
            ...todo,
            username: user.username,
          }));

          allUserTodos.push(...todosWithUsername);
        }
      });

      setAllTodos(allUserTodos);
    }
  }, []);

const handleRemoveUser=(id)=>{
localStorage.removeItem(`userId_${id}`)
setAllTodos(allTodos.filter((todo)=>todo.id!==id))
}
  const handleLogOut = () => {
    localStorage.removeItem("loginUser");
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome Admin</h1>
      <h2>All Users Todos</h2>
      <ul>
        {Array.from(new Set(allTodos.map(todo => todo.username))).map(username => (
          <React.Fragment key={username}>
            <h2>{username}</h2>
            {allTodos.filter(todo => todo.username === username).map(todo => (
              <React.Fragment key={todo.id}>
              <li key={todo.id}>{todo.text}</li>
              <button onClick={()=>handleRemoveUser(todo.id)}>Remove User From Database</button>
             </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
};


export default Admin;

