import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Style from './body.module.css';
import Todo from './todo/Todo';

const Body = () => {
  const todoText = useRef(null);
  const selectBtn = useRef(null);
  const [todos, settodos] = useState([]);

  const click = () => {
    const text = todoText.current.value;
    const select = selectBtn.current.value;

    if (text === '') {
      alert('Please add a todo text.');
      return;
    }

    const todo = {
      id: uuidv4(),
      text,
      select,
    };

    settodos([...todos, todo]);
    todoText.current.value = '';
  };

  //gate todos from local stroge
  useEffect(() => {
    const todosLocal = localStorage.getItem('todos');
    if (todosLocal) {
      settodos([...JSON.parse(todosLocal)]);
    }
    return () => {
      console.log('exit0');
    };
  }, []);

  //update todos with local stroge
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const deleteTodo = (id) => {
    const newTodos = [];
    todos.filter((todo) => {
      if (todo.id !== id) {
        return newTodos.push(todo);
      } else {
        return null;
      }
    });
    settodos([...newTodos]);
  };

  const updateTodo = (id, checked) => {
    const newTodos = [];
    todos.filter((todo) => {
      if (todo.id === id) {
        if (checked) {
          todo.select = 'complet';
        }else{
          todo.select = 'runing';
        }
      }
      newTodos.push(todo);
      return null;
    });
    settodos([...newTodos]);
  };

  return (
    <div className={Style.body}>
      <div className={Style.container}>
        <div className={Style.form}>
          <div className={Style.from1}>
            <input
              ref={todoText}
              placeholder="Add Todo.."
              type="text"
              required
            />
            <select ref={selectBtn} defaultValue={'runing'}>
              <option value="complet">Complet</option>
              <option value="runing">Runing</option>
            </select>
          </div>
          <div className={Style.from2}>
            <button onClick={click}>Add</button>
          </div>
        </div>

        <div className={Style.todos}>
          {todos.map((todo) => {
            return (
              <Todo
                updatetodo={updateTodo}
                deleteTodo={deleteTodo}
                key={todo.id}
                todo={todo}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Body;
