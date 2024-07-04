import React, { useEffect, useState } from "react";
import { getAllTask } from '../api/task.api';
import { getAllCategorys } from '../api/task.api';
//import formatDate from '../components/FormDate'
import { TaskCard } from "./TaskCard";

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


    return (
        <div>
            <h1>Task List</h1>
            <ul>
                {Array.isArray(tasks) && tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        getCategoryNameById={getCategoryNameById}
                        formatDate={formatDate}
                        ></TaskCard>
                ))}
            </ul>
        </div>
    );
}
