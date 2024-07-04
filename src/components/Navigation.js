import { NavLink } from 'react-router-dom';
import React from 'react';
import '../css/navigate.css';
import { handleLogout } from '../pages/TaskPage';

export function Navigation() {
    return (
        <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/tasks">Tareas</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/categorys">Categorias</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/task-create">Crear Tarea</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/category-create">Crear Categoria</NavLink>
            </li>
            <div className="user-info">
            <button className="btn btn-link" style={{ color: '#212529' }} onClick={handleLogout}>Cerrar sesión</button>
            </div>
        </ul>
    );
}
