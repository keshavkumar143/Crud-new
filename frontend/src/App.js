import React, { useEffect, useState } from 'react';
import List from './Components/List';
import './App.css';
import axios from "axios"
import { baseUrl } from './utils/constant';

function App() {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [updateUI , setUpdateUI] = useState(false);
    const [updateId, setUpdateId] = useState(null);

    useEffect(() => {
        axios.get(`${baseUrl}/get`)
            .then((res) => {
                console.log(res.data);
                setTasks(res.data);
            });
    }, [updateUI]);

    const addTask = () => {
        axios.post(`${baseUrl}/save`, { task: input })
            .then((res) => {
                console.log(res.data);
                setInput("");
                setUpdateUI((prevState) => !prevState);
            });
    }

    const updateMode = (id, text) => {
        console.log(text); 
        setInput(text); 
        setUpdateId(id);
        setUpdateUI(true); // Set update UI to true
    };

    const updateTask = () => {
        axios.put(`${baseUrl}/update/${updateId}`, { task: input })
            .then((res) => {
                console.log(res.data);
                setUpdateUI((prevState) => !prevState);
                setUpdateId(null);
                setInput('');
            })
            .catch((error) => {
                console.error('Error updating task:', error);
            });
    };

    return (
        <main className="main-container">
            <h1 className='title'>To-Do List</h1>
            <div className="input-holder">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                <button type='submit' onClick={updateId ? updateTask : addTask}>
                    {updateId ? "Update Task" : "Add Task"}
                </button>
            </div>

            <ul>
                {tasks.map ((task) => (
                    <List
                        key={task.id}
                        id={task._id}
                        task={task.task}
                        setUpdateUI={setUpdateUI}
                        updateMode={updateMode}
                    />
                ))}
            </ul>
        </main>
    );
}

export default App;
