import React, { useState, useEffect } from "react";
import axios from "axios";
import editIcon from './img/edit.svg'
import deleteIcon from './img/delete.svg'
import saveIcon from './img/ok.svg'
import ReactSVG from 'react-svg';
import "./App.scss";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [sessionId, setId] = useState(null);
  const [editText, setEditText] = useState("");
  const [flag,setFlag] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/allTasks").then((res) => {
      setTasks(res.data.data);
    });
  });

  const addNewTask = async () => {
    await axios
      .post("http://localhost:8000/createTask", {
        text,
        isCheck: false,
      })
      .then((res) => {
        setText("");
        setTasks(res.data.data);
      });
  };

  const deleteClick = async (id) => {
    await axios
      .delete(`http://localhost:8000/deleteTask?id=${id}`)
      .then((res) => {
        setTasks(res.data.data);
      });
  };

  const editClick = (id) => {
      setId(id)  
  }

  const save = async (id) => {
    setId(null)
    await axios
    .patch(`http://localhost:8000/updateTask?id=${id}`,{
      id,
      text:editText,
      
    })
    .then((res) => {
      setTasks(res.data.data);
    });
    
} 

const onChange = async (id,isCheck) => {
  await axios
    .patch(`http://localhost:8000/updateTask?id=${id}`,{
      id,
      isCheck:!isCheck,
      
    })
    .then((res) => {
      setTasks(res.data.data);
    });
}
  
  return (
    <div className="App">
      <header className="header">
        <h1>To-do List</h1>
        <input
          className="addInput"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="addButton"onClick={() =>text?addNewTask():alert('ПОЛЕ ПУСТОЕ')}>Add new</button>
      </header>
      <div className="content">
        {
        tasks.map((task, index) =>
          <div key={`task-${index}`}>
            {
              sessionId === task.id ? (
                <div className="editTask">
                  <input className="editInput" onChange={(e)=>setEditText(e.target.value)}/>
                  <img src={saveIcon} className = "button" onClick={() =>editText? save(task.id) :alert('ПОЛЕ ПУСТОЕ')}/>
                </div>
              ) : (
              <div className="task">
                <input type="checkbox" checked={task.isCheck} onChange={() => onChange(task.id,task.isCheck)}/>
                <span>{task.text}</span>
                <img src={editIcon}  className = "button" onClick={() => editClick(task.id)}/>
                <img src={deleteIcon}  className = "button" onClick={()=>deleteClick(task.id)}/>
               
              </div>
              )
            }
          </div>
        )
        }
      </div>
    </div>
  );
}

export default App;
