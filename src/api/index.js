import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// Add authorization header to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('profile');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth APIs
export const signIn = (formData) => API.post('/api/users/signin', formData);
export const signUp = (formData) => API.post('/api/users/signup', formData);

// Property APIs
export const fetchProperties = (query) => API.get(`/api/properties${query || ''}`);
export const fetchProperty = (id) => API.get(`/api/properties/${id}`);
export const createProperty = (newProperty) => API.post('/api/properties', newProperty);
export const favoriteProperty = (id) => API.patch(`/api/properties/${id}/favorite`);

export default API;
