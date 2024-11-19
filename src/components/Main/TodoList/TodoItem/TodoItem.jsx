import React from "react";
import './TodoItem.css';

const TodoItem = ({data, remove, editar}) => {
 
  return (
    <article className="todo-item">
      <h3>{data.title}</h3>
      <button onClick={remove}>Borrar</button>
      <button onClick={editar}>Editar</button>
    </article>
  )
};

export default TodoItem;