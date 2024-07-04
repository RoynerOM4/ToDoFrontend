import React, { useEffect, useState } from "react";
import { getAllTask } from '../api/task.api';
import { getAllCategorys } from '../api/task.api';
import { TaskCard } from "./TaskCard";
import '../css/TaskCard.css';

export function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function loadTasks() {
            try {
                const resTasks = await getAllTask();
                const resCategories = await getAllCategorys();

                setTasks(resTasks.data.results);
                setCategories(resCategories.data.results);
            } catch (error) {
                console.error('Error fetching tasks or categories:', error);
            }
        }
        loadTasks();
    }, []);

    const getCategoryNameById = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.category_name : 'Sin categoría';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    const completedTasks = tasks.filter(task => task.completed);
    const pendingTasks = tasks.filter(task => !task.completed);

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, paddingRight: '10px' }}>
                <h2 className="fuenteb">Tareas Completadas</h2>
                <ul>
                    {completedTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            getCategoryNameById={getCategoryNameById}
                            formatDate={formatDate}
                        />
                    ))}
                </ul>
            </div>
            <div style={{ flex: 1, paddingLeft: '10px' }}>
                <h2 className="fuenteb">Tareas Pendientes</h2>
                <ul>
                    {pendingTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            getCategoryNameById={getCategoryNameById}
                            formatDate={formatDate}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}
