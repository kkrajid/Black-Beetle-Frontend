import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1'; // Adjust this if your API has a different base URL

 const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// // Add a request interceptor to include the auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

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

export default api;