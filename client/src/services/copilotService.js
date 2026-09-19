import api from './api.js';

export const copilotService = {
  askCopilot: (message) => api.post('/api/copilot/ask', { message }),
};
