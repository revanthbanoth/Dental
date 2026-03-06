import axios from 'axios';

// Use explicit backend URL to avoid Vite proxy issues
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const API = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000, // 10 second timeout
});

// Attach token for admin calls
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

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
