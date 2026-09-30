import api from './api';

export const eligibilityService = {
  getEligibleSchemes: async () => {
    const res = await api.get('/api/eligibility/schemes');
    return res.data;
  },

  getEligibilitySummary: async () => {
    const res = await api.get('/api/eligibility/summary');
    return res.data;
  },
};
