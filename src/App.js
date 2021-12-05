import React, { useState } from 'react';
import './styles.css';

/*function ID() {
 let id = 0;
 return function () {
   id++;
   return id;
 };
} */

//const getNextId = ID();

function ListItem(props) {
  const { children, onModify, onDelete } = props;

  const [isEditMode, setIsEditMode] = useState(false);
  console.log({ isEditMode });
  const [tempTask, setTempTask] = useState(children);

  return isEditMode ? (
    <>

      <textarea
        className="editTask"
        onChange={function (event) {
          setTempTask(event.target.value);
        }}
        value={tempTask}
      ></textarea>
      <button
        className="saveTask"
        type="button"
        disabled={tempTask === ''}
        onClick={function () {
          console.log('save click', tempTask);
          if (tempTask !== '') {
            onModify(tempTask);
            setIsEditMode(false);
          }
        }}
      >
        Save Task
      </button>
    </>
  ) : (
    <>
      <li className="list" key={children}>
        {children}
      </li>
     
      <button
        className="edit"
        type="button"
        onClick={function () {
          setIsEditMode(true);
        }}
      >
        Edit Task
      </button> 
      <button
        className="delete"
        type="button"
        onClick={function () {
          onDelete();
        }}
      >
        Delete
      </button>
    </>
  );
}

function App() {
  const [task, setTask] = useState('');
  const [todoList, setTodoList] = useState([]);

  function onModify(givenTask, givenI) {
    console.log({ givenTask, givenI });
    const newList = todoList.map(function (task, i) {
      if (givenI === i) {
        return givenTask;
      }
      return task;
    });
    // console.log(newList === todoList);
    setTodoList(newList);
  }

  function onDelete(givenI) {
    const newList = todoList.filter(function (el, i) {
      return i !== givenI;
    });
    setTodoList(newList);
  }

  return (

    <div id="main">
      <h1>Todo Lists</h1>
      <textarea
        id="task"
        onChange={function (event) {
          setTask(event.target.value);
        }}
        value={task}
      ></textarea>
      <button className="AddTask"
        id="btn"
        type="button"
        onClick={function () {
          if (task !== '') {
            setTodoList([...todoList, task]);
            setTask('');
          }
        }}
      >
        Add Task
      </button>
      <cal />

      <ul>
        {todoList.map((task, i) => {
          return (
            <ListItem
              onModify={(newTask) => {
                onModify(newTask, i);
              }}
              onDelete={() => onDelete(i)}
            >
              {task}
            </ListItem>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
