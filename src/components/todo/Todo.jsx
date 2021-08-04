import React, { useEffect, useState } from 'react';
import Style from './todo.module.css';

const Todo = (props) => {
  const [checked, setchecked] = useState(false);

  useEffect(() => {
    if (props.todo.select === 'complet') {
      setchecked(true);
    }
  }, [props.todo.select]);

  const checkedCng = ({ target }) => {
    setchecked(target.checked);
    props.updatetodo(props.todo.id, target.checked);
  };
  return (
    <div className={Style.todo}>
      <div className={Style.todosInner}>
        <div className={Style.todoBody}>
          <input onChange={checkedCng} checked={checked} type="checkbox" />
          <h1 style={{ textDecoration: checked ? 'line-through' : 'none' }}>
            {props.todo.text}
          </h1>
        </div>
        <button onClick={() => props.deleteTodo(props.todo.id)}>Delete</button>
      </div>
    </div>
  );
};

export default Todo;
