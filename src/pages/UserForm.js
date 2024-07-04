import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../css/login.css';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
});

export function UserFormPage() {
    const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password } = newUser;
        if (username === '' || email === '' || password === '') {
            setError(true);
            return;
        }
        setError(false);

        try {
            const response = await api.post('users-create/', newUser, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            alert("Usuario Creado :) Ingresa con tus datos");
            setNewUser({ username: '', email: '', password: '' });
            navigate("/login");
        } catch (error) {
            if (error.response) {
                const data = error.response.data;
                if (data.username) {
                    alert(`Error: ${data.username[0]}`);
                } else if (data.email) {
                    alert(`Error: ${data.email[0]}`);
                } else {
                    alert('Error creating user. Please check the console for more details.');
                }
                console.error('Response data:', error.response.data);
            } else if (error.request) {
                console.error('Request data:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2 className='montserrat-font'>Crea tu usuario</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input
                            type="text"
                            className="form-control custom-width"
                            id="username"
                            name="username"
                            value={newUser.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input
                            type="email"
                            className="form-control custom-width"
                            id="email"
                            name="email"
                            value={newUser.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            type="password"
                            className="form-control custom-width"
                            id="password"
                            name="password"
                            value={newUser.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary custom-button">Crear Cuenta</button>
                </form>
                {error && <p className="error-message">Todos los campos son obligatorios</p>}
                <p>¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link></p>
            </div>
        </div>
    );
}
