import React, { useState, useEffect } from 'react';
import { TaskList } from '../components/TaskList';
import { Navigation } from '../components/Navigation';
import '../css/TaskPage.css';

export function TaskPage() {
    const [user, setUser] = useState(() => {
        const storedUsername = localStorage.getItem('username');
        return storedUsername || '';
    });

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            handleLogout();
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('username');
        window.location.replace('/login'); 
    };

    return (
        <div className="body">
            <h1 className='text'>Bienvenido, {user}</h1>
            <TaskList />
        </div>
    );
}

export const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    window.location.replace('/login');
};
