import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const projectsApi = {
    getAll: async (params?: any) => {
        const response = await api.get('/projects', { params });
        return response.data;
    },
    getFilterOptions: async () => {
        const response = await api.get('/projects/metadata/filters');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await api.get(`/projects/${id}`);
        return response.data;
    },
};