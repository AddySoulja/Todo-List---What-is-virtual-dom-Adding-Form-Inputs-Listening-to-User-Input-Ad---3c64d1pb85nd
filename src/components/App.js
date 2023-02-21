import React, { useState } from "react";
import "./../styles/App.css";

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [editText, setEditText] = useState("");

  const getPos = (list, currTask) => {
    let pos = list.findIndex(function (item) {
      return item.task === currTask.task;
    });
    return pos;
  };

  const saveTask = (currTask) => {
    if (editTask !== "") {
      let list = taskList;
      let pos = getPos(list, currTask);
      list[pos].task = editText;
      list[pos].open = !list[pos].open;
      setTaskList([...list]);
      setEditText("");
    }
  };

  const editTask = (currTask) => {
    let list = taskList;
    let pos = getPos(list, currTask);
    setEditText(currTask.task);
    list[pos].open = !list[pos].open;
    setTaskList([...list]);
  };

  const deleteTask = (currTask) => {
    let list = taskList;
    let pos = list.findIndex(function (item) {
      return item.task === currTask;
    });
    list.splice(pos, 1);
    setTaskList([...list]);
  };
  const addToList = () => {
    if (task !== "") {
      setTaskList([...taskList, { task: task, open: false }]);
      setTask("");
    }
  };
  return (
    <>
      <div id="main">
        <textarea
          id="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        >
          Add a task...
        </textarea>
        <button id="btn" onClick={addToList}>
          Add
        </button>
      </div>
      <div>
        <ol>
          {taskList.map((item, index) => (
            <li className="list" key={index}>
              {item.open ? (
                <>
                  <textarea
                    className="editTask"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  ></textarea>
                  {editText !== "" ? (
                    <button className="saveTask" onClick={() => saveTask(item)}>
                      Save
                    </button>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <div>{item.task}</div>
              )}

              {!item.open ? (
                <>
                  <button className="edit" onClick={() => editTask(item)}>
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => deleteTask(item.task)}
                  >
                    Delete
                  </button>
                </>
              ) : (
                ""
              )}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default App;
