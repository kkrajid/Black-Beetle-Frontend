import api from '../api';

export const fetchInstitutions = async (params) => {
  const response = await api.get('/institutions/institutions/', { params });
  return response.data;
};

export const fetchInstitutionStats = async () => {
  const response = await api.get('/institutions/institutions/stats/');
  return response.data;
};

export const fetchInstitutionUsers = async (institutionId, params) => {
    try {
      const response = await api.get(`/institutions/institutions/${institutionId}/users/`, { params });
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching institution users:', error);
      throw error;
    }
  };
export const fetchInstitutionDetails = async (id) => {
  const response = await api.get(`/institutions/institutions/${id}/`);
  return response.data;
};

