import api from '../api';

export const fetchInstitutions = async ({ search, is_active, page, page_size }) => {
  const params = new URLSearchParams();
  
  if (search) {
    params.append('search', search);
  }
  
  if (is_active !== undefined) {
    params.append('is_active', is_active);
  }
  
  if (page) {
    params.append('page', page);
  }

  if (page_size) {
    params.append('page_size', page_size);
  }
  
  const response = await api.get(`/institutions/institutions/?${params.toString()}`);
  return {
    results: response.data.results,
    count: response.data.count,
    next: response.data.next,
    previous: response.data.previous
  };
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

export const fetchUserStats = async () => {
  try {
    const response = await api.get('/users/users/stats/');
    return response.data;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error;
  }
};

export const fetchUsers = async (page, searchTerm, userType, status) => {
  try {
    const response = await api.get('/users/users/', {
      params: { page, search: searchTerm, user_type: userType, status },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// export const updateUserAction = async (userId, action) => {
//   try {
//     const response = await api.post(`/users/users/${userId}/action/`, { action });
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating user ${action}:`, error);
//     throw error;
//   }
// };
export const updateUserAction = async (userId, action) => {
    try {
      const response = await api.post(`/users/users/${userId}/action/`, { action });
      // Log the response to debug
      console.log('API Response:', response);
      
      // Return standardized response format
      return {
        status: 'success',
        is_active: response.data.is_active,
        is_verified: response.data.is_verified
      };
    } catch (error) {
      console.error(`Error updating user ${action}:`, error);
      throw error;
    }
  };
