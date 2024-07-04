import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../api/task.api';
import { deleteCategory, updateCategory, getCategory } from '../api/task.api';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/TaskForm.css';  

export function CategoryFormPage() {
    const { setValue } = useForm();
    const [newCategory, setNewCategory] = useState({ category_name: '', description: '' });
    const navigate = useNavigate();
    const params = useParams();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory({ ...newCategory, [name]: value });
    };

    useEffect(() => {
        async function loadCategory() {
            if (params.id) {
                try {
                    const respuesta = await getCategory(params.id);
                    console.log('Respuesta de getCategory:', respuesta);
                    setValue('category_name', respuesta.data.category_name);
                    setValue('description', respuesta.data.description);
                    console.log('Datos cargados en los campos del formulario');
                } catch (error) {
                    console.error('Error al cargar la categoria', error);
                }
            }
        }
        loadCategory();
    }, [params.id, setValue]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (params.id) {
                await updateCategory(params.id, newCategory);
                console.log('Actualizando categoría con ID:', params.id);
                console.log('Datos de la categoría actualizados:', newCategory);
            } else {
                const response = await axiosInstance.post('categorys/', newCategory);
                alert("Categoría creada :)");
                console.log('Categoría creada:', response.data);
                setNewCategory({ category_name: '', description: '' });
            }
            navigate("/categorys");
        } catch (error) {
            console.error('Error al crear/actualizar la categoría', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className='fuente'>Crear Categoría</h1>
                <form onSubmit={handleSubmit}>
                    <div className="login-formon">
                        <div className="mb-3">
                            <label htmlFor="category_name" className="form-label">Nombre de la Categoría</label>
                            <input
                                type="text"
                                id="category_name"
                                name="category_name"
                                className="form-control"
                                value={newCategory.category_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Descripción</label>
                            <textarea
                                rows="3"
                                id="description"
                                name="description"
                                className="form-control"
                                value={newCategory.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Crear</button>
                    </div>
                </form>
                {params.id && (
                    <button
                        onClick={async () => {
                            const accepted = window.confirm("¿Esta seguro de eliminar esta categoría?");
                            if (accepted) {
                                await deleteCategory(params.id);
                                navigate("/categorys");
                            }
                        }}
                        className="btn btn-danger mt-3"
                    >
                        Eliminar
                    </button>
                )}
            </div>
        </div>
    );
}
