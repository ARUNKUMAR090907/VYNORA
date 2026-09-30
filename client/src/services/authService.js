import api from './api';

export const authService = {
  register: async ({ email, username, password, confirmPassword, name }) => {
    const res = await api.post('/api/auth/register', {
      email,
      username,
      password,
      confirmPassword,
      name,
    });
    return res.data;
  },

  login: async ({ usernameOrEmail, password }) => {
    const res = await api.post('/api/auth/login', {
      usernameOrEmail,
      password,
    });
    return res.data;
  },

  getMe: async () => {
    const res = await api.get('/api/auth/me');
    return res.data;
  },
};
