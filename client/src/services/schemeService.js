import api from './api';

export const schemeService = {
  getAllSchemes: async () => {
    const res = await api.get('/api/schemes');
    return res.data;
  },

  getSchemeById: async (idOrSlug) => {
    const res = await api.get(`/api/schemes/${idOrSlug}`);
    return res.data;
  },

  searchSchemes: async ({ query = '', category = '', state = '' } = {}) => {
    const res = await api.get('/api/schemes/search', {
      params: { query, category, state },
    });
    return res.data;
  },

  getSchemesByCategory: async (category) => {
    const res = await api.get(`/api/schemes/category/${category}`);
    return res.data;
  },
};
