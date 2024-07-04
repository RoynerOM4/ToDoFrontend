import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/TaskCard.css';

export function TaskCard({ task, getCategoryNameById, formatDate }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/tasks/${task.id}`);
    };

    return (
        <div className="list-group list">
            <a href="#" className="list-group-item p montserrat-font" aria-current="true" onClick={handleClick}>
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{task.name}</h5>
                    <small>{formatDate(task.fecha_inicio)}</small>
                </div>
                <p className="mb-1">{task.description}</p>
                <p>{getCategoryNameById(task.category)}</p>
            </a>
        </div>
    );
}
