import API from './api';

export const userService = {
  getUsers: async () => {
    const response = await API.get('/users');
    return response.data;
  },

  updateUserRole: async (id, role) => {
    const response = await API.put(`/users/${id}/role`, { role });
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await API.put('/users/profile', profileData);
    return response.data;
  }
};
