import api from './api';

export const copilotService = {
  askCopilot: async ({ message, profile, targetLanguage, activeSchemeSlug, history, mode }) => {
    const res = await api.post('/api/copilot/chat', {
      message,
      profile,
      targetLanguage,
      activeSchemeSlug,
      history,
      mode,
    });
    return res.data;
  },

  verifyLink: async (url) => {
    const res = await api.post('/api/copilot/verify-link', { url });
    return res.data;
  },

  auditDocument: async ({ imageBase64, documentType }) => {
    const res = await api.post('/api/copilot/audit-document', {
      imageBase64,
      documentType,
    });
    return res.data;
  },
};
