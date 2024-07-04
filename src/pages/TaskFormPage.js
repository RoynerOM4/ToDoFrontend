import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance, { getAllCategorys } from '../api/task.api';
import { getAllTask, deleteTask, updateTask, getTask } from '../api/task.api';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/TaskForm.css';

export function TaskFormPage() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [newTask, setNewTask] = useState({
        category: '',
        name: '',
        description: '',
        fecha_inicio: '',
        fecha_final: '',
        completed: false,
        priority: ''
    });
    const navigate = useNavigate();
    const params = useParams();
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewTask({ ...newTask, [name]: type === 'checkbox' ? checked : value });
    };

    const [categorys, setCategorys] = useState([]);

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                try {
                    const respuesta = await getTask(params.id);
                    console.log('Respuesta de getTask:', respuesta);
                    setValue('name', respuesta.data.name);
                    setValue('description', respuesta.data.description);
                    setValue('completed', respuesta.data.completed);
                    setValue('priority', respuesta.data.priority);
                    console.log('Datos cargados en los campos del formulario');
                } catch (error) {
                    console.error('Error al cargar la tarea', error);
                }
            }
        }

        async function loadCategorys() {
            try {
                const res = await getAllCategorys();
                setCategorys(res.data.results);
                console.log('Categorías cargadas:', res.data.results);
            } catch (error) {
                console.error('Error al mostrar categorias', error);
            }
        }

        loadTask();
        loadCategorys();
    }, [params.id]);

    const onSubmit = async () => {
        try {
            if (!newTask.description.trim()) {
                alert("El campo de descripción no puede estar vacío.");
                return;
            }
            const localDate = new Date(newTask.fecha_inicio);
            const utcDate = new Date(localDate).toISOString();
            console.log(utcDate);
            const tasksResponse = await getAllTask();
            const tasks = tasksResponse.data.results;
            const minimumTimeDifference = 60 * 60 * 1000;
            const currentTime = new Date().getTime();
            const taskDates = tasks.map(task => new Date(task.fecha_inicio).getTime());

            const isMinimumDifferenceValid = taskDates.every(date => Math.abs(currentTime - date) >= minimumTimeDifference);

            if (!isMinimumDifferenceValid) {
                alert("No se puede crear la tarea. Debe haber al menos una hora de diferencia con las tareas existentes.");
                return;
            }

            const taskData = {
                ...newTask,
                category: newTask.category === '' ? null : newTask.category,
                repeat: newTask.repeat ? newTask.repeat : false,
                time_repeat: newTask.repeat ? newTask.time_repeat : 0,
                fecha_inicio: utcDate,
            };

            if (params.id) {
                await updateTask(params.id, taskData);
                console.log('Actualizando tarea con ID:', params.id);
                console.log('Datos de la tarea actualizados:', taskData);
            } else {
                await axiosInstance.post('task/', taskData);
                alert("Tarea creada :)");
            }
            navigate("/");

            setNewTask({
                category: '',
                name: '',
                description: '',
                fecha_inicio: '',
                fecha_final: '',
                completed: false,
                priority: ''
            });
        } catch (error) {
            console.error('Error al crear la tarea', error);
            if (error.response) {
                console.error(error.response);
                console.error(error.response.data);
            }
        }
    };

    return (
        <div>
            <div className="login-container">
                <div className="login-form">
                    <h1 className='fuente'>Crear Tareas</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="login-formon">
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Categoría</label>
                                <select
                                    id="category"
                                    name="category"
                                    className="form-control"
                                    value={newTask.category}
                                    {...register("category", { required: true })}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Seleccione una categoría</option>
                                    {Array.isArray(categorys) && categorys.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.category_name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <span>Este campo es requerido</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Título</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    value={newTask.name}
                                    {...register("name", { required: true })}
                                    onChange={handleInputChange}
                                />
                                {errors.name && <span>Este campo es requerido</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Descripción</label>
                                <textarea
                                    rows="3"
                                    id="description"
                                    name="description"
                                    className="form-control"
                                    value={newTask.description}
                                    {...register("description")}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="fecha_inicio" className="form-label">Fecha de inicio</label>
                                <input
                                    type="datetime-local"
                                    id="fecha_inicio"
                                    name="fecha_inicio"
                                    className="form-control"
                                    value={newTask.fecha_inicio}
                                    {...register("fecha_inicio", { required: true })}
                                    onChange={handleInputChange}
                                />
                                {errors.fecha_inicio && <span>Este campo es requerido</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="fecha_final" className="form-label">Fecha de finalización</label>
                                <input
                                    type="datetime-local"
                                    id="fecha_final"
                                    name="fecha_final"
                                    className="form-control"
                                    value={newTask.fecha_final}
                                    {...register("fecha_final")}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3 checkbox-container">
                                <input
                                    type="checkbox"
                                    id="completed"
                                    name="completed"
                                    className="form-check-input"
                                    checked={newTask.completed}
                                    {...register("completed")}
                                    onChange={handleInputChange}
                                />
                                <label className="form-check-label" htmlFor="completed">Completada</label>
                            </div>
                            <div className="mb-3 priority-container">
                                <label htmlFor="priority" className="form-label">Prioridad</label>
                                <input
                                    type="number"
                                    id="priority"
                                    name="priority"
                                    className="form-control"
                                    value={newTask.priority}
                                    {...register("priority", { required: true })}
                                    onChange={handleInputChange}
                                />
                                {errors.priority && <span>Este campo es requerido</span>}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Crear</button>
                    </form>
                    {params.id && (
                        <button
                            onClick={async () => {
                                const accepted = window.confirm("¿Está seguro de eliminar esta tarea?");
                                if (accepted) {
                                    await deleteTask(params.id);
                                    navigate("/tasks");
                                }
                            }}
                            className="btn btn-danger mt-3"
                        >
                            Eliminar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
