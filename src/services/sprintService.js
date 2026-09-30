import API from './api';

export const sprintService = {
  getSprints: async (projectId) => {
    const response = await API.get('/sprints', { params: { projectId } });
    return response.data;
  },

  createSprint: async (sprintData) => {
    const response = await API.post('/sprints', sprintData);
    return response.data;
  },

  startSprint: async (id, dates) => {
    const response = await API.put(`/sprints/${id}/start`, dates);
    return response.data;
  },

  completeSprint: async (id) => {
    const response = await API.put(`/sprints/${id}/complete`);
    return response.data;
  }
};
