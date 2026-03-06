import axios from 'axios';

// Auto-detect environment: use env var, or smart hostname-based fallback
const BASE_URL = import.meta.env.VITE_API_URL
    || (window.location.hostname === 'localhost'
        ? 'http://localhost:5000/api'
        : 'https://dental-backend-m8eh.onrender.com/api');

const API = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 60000, // 60s — Render free tier needs up to 60s to wake from sleep
});

// Attach token for admin calls
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Auto-retry once on timeout/network error (to handle Render cold start)
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error.config;
        if (!config._retried && (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK')) {
            config._retried = true;
            console.log('⏳ Server cold start detected, retrying in 10s...');
            await new Promise(resolve => setTimeout(resolve, 10000));
            return API(config);
        }
        return Promise.reject(error);
    }
);

export const bookAppointment = (data) => API.post('/appointments', data);
export const getAppointments = () => API.get('/appointments');
export const deleteAppointment = (id) => API.delete(`/appointments/${id}`);
export const updateAppointmentStatus = (id, status) => API.patch(`/appointments/${id}/status`, { status });

export const sendContact = (data) => API.post('/contact', data);
export const getContacts = () => API.get('/contact');
export const deleteContact = (id) => API.delete(`/contact/${id}`);

export const getBlogs = () => API.get('/blog');
export const getBlog = (slug) => API.get(`/blog/${slug}`);
export const createBlog = (data) => API.post('/blog', data);
export const deleteBlog = (id) => API.delete(`/blog/${id}`);

export const adminLogin = (data) => API.post('/admin/login', data);
export const verifyAdmin = () => API.get('/admin/verify');

export default API;
