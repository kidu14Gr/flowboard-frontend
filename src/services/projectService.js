import API from './api';

export const projectService = {
  getProjects: async () => {
    const response = await API.get('/projects');
    return response.data;
  },

  createProject: async (projectData) => {
    const response = await API.post('/projects', projectData);
    return response.data;
  },

  getProjectById: async (id) => {
    const response = await API.get(`/projects/${id}`);
    return response.data;
  }
};
