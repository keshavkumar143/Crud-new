import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import './List.css'; 
import axios from 'axios';
import { baseUrl } from '../utils/constant';

function List({ id, task, setUpdateUI, updateMode }) {
    const removeTask = () => {
        axios.delete(`${baseUrl}/delete/${id}`).then((res) => {
            console.log(res);
            setUpdateUI((prevState) => !prevState);
        });
    }

    return (
        <li className="list-item">
            <span className="task">{task}</span>
            <div className="icon-handle">
                <AiOutlineEdit
                    className="edit-icon"
                    onClick={() => updateMode(id, task)}
                    title="Update Task"
                />
                <FaTrashAlt className="delete-icon" onClick={removeTask}/>
            </div>
        </li>
    );
}

export default List;

