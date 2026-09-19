import api from './api.js';

export const userService = {
  getProfile: () => api.get('/api/users/profile'),
  
  updateProfile: (profileData) => api.put('/api/users/profile', profileData),
};
