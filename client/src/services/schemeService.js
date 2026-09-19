import api from './api.js';

export const schemeService = {
  getAllSchemes: () => api.get('/api/schemes'),
  
  getSchemeById: (id) => api.get(`/api/schemes/${id}`),
  
  searchSchemes: (query) => api.get('/api/schemes/search', { params: { query } }),
  
  getSchemesByCategory: (category) => api.get(`/api/schemes/category/${category}`),
};
