import api from './api.js';

export const eligibilityService = {
  getEligibleSchemes: () => api.get('/api/eligibility/schemes'),
  
  getEligibilitySummary: () => api.get('/api/eligibility/summary'),
};
