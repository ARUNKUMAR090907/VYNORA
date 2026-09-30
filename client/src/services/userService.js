import api from './api';

export const userService = {
  getProfile: async () => {
    const res = await api.get('/api/users/profile');
    return res.data;
  },

  updateProfile: async (canonicalProfileData) => {
    const res = await api.put('/api/users/profile', canonicalProfileData);
    return res.data;
  },
};
