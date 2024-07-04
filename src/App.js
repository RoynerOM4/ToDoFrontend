import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TaskPage } from './pages/TaskPage';
import { TaskFormPage } from './pages/TaskFormPage';
import { Navigation } from './components/Navigation';
import Login from './components/Login';
import axios from 'axios';
import { CategoryList } from './components/CategoryList';
import { CategoryFormPage } from './pages/CategoryForm';
import { UserFormPage } from './pages/UserForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/TaskPage.css';  

function App() {
  const [user, setUser] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('access_token');
    if (storedUser && storedToken) {
      setUser(storedUser);
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
  }, []);

  const updateUser = (username) => {
    setUser(username);
  };

  return (
    <div className='body'> {/* Cambiamos la clase aquí */}
      <Router>
        <Navigation />
        <Routes>
          <Route path="/login" element={user === '' ? <Login updateUser={updateUser} /> : <Navigate to="/login" replace />} />
          <Route path='/users-create' element={user === '' ? <UserFormPage /> : <Navigate to="/tasks" replace />} />

          <Route path='/tasks/:id' element={user !== '' ? <TaskFormPage /> : <Navigate to="/login" replace />} />
          <Route path='/categorys/:id' element={user !== '' ? <CategoryFormPage /> : <Navigate to="/login" replace />} />
          <Route path="/tasks" element={user !== '' ? <TaskPage user={user} setUser={setUser} /> : <Navigate to="/login" replace />} />
          <Route path="/categorys" element={user !== '' ? <CategoryList /> : <Navigate to="/login" replace />} />
          <Route path="/task-create" element={user !== '' ? <TaskFormPage /> : <Navigate to="/login" replace />} />
          <Route path="/category-create" element={user !== '' ? <CategoryFormPage /> : <Navigate to="/login" replace />} />

          <Route path="*" element={<Navigate to="/tasks" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
