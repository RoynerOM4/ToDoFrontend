import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    config =>{
        const token = localStorage.getItem('access_token');
        if(token){
            config.headers['Authorization']=`Bearer ${token}`;
        }
        return config;
    },
    error =>{
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                try {
                    const response = await axios.post('http://127.0.0.1:8000/tokenjwt/refresh/', {
                        refresh: refreshToken,
                    });
                    const newAccessToken = response.data.access;
                    localStorage.setItem('access_token', newAccessToken);
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    console.error('Error refreshing token:', refreshError);
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export const getAllTask = () => {
    return axiosInstance.get('task/');
};

export const getAllCategorys = () => {
    return axiosInstance.get('categorys/');
};

export const deleteTask = (id) => axiosInstance.delete(`task/${id}`)
export const updateTask = (id,task) => axiosInstance.put(`task/${id}/`,task)
export const getTask = (id) => axiosInstance.get(`task/${id}/`)

export const deleteCategory = (id) => axiosInstance.delete(`categorys/${id}`)
export const updateCategory = (id,category) => axiosInstance.put(`categorys/${id}/`,category)
export const getCategory = (id) => axiosInstance.get(`categorys/${id}/`)

export default axiosInstance;
