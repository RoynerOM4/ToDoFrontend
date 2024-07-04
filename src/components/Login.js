import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../css/login.css';

const Login = ({ updateUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username === '' || password === '') {
            setError(true);
            return;
        }
        setError(false);

        try {
            const response = await axios.post('http://127.0.0.1:8000/tokenjwt/', {
                username,
                password,
            });

            if (response.data.access) {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('username', username);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
                updateUser(username);
                navigate('/tasks', { replace: true });
                console.log('Inicio exitoso!');
            } else {
                console.log('¡No se recibió ningún token de acceso!');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError(true);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2 className='montserrat-font'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Username:</label>
                        <input type="text" className="form-control custom-width" id="exampleInputEmail1" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password:</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Iniciar Sesion</button>
                </form>
                {error && <p>Todos los campos son obligatorios</p>}
                <p>¿No tienes una cuenta? <Link to="/users-create">Crear cuenta</Link></p>
            </div>
        </div>
    );
};

export default Login;
