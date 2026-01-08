const API_BASE_URL = 
  process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';

const getAuthHeaders = (endpoint: string): Record<string, string> => {
  if (endpoint.includes('/auth/login') || endpoint.includes('/auth/registration')) {
    return {};
  }
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(endpoint),
  };

  if (options.headers) {
    Object.assign(headers, options.headers as Record<string, string>);
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Можно добавить логику разлогина, если токен протух
        // localStorage.removeItem('token');
        // window.location.href = '#/login';
      }
      const errorText = await response.text();
      throw new Error(`${response.status} ${errorText}`);
    }

    return response;
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(
        `Cannot connect to backend server. Please make sure the backend is running on ${API_BASE_URL}`
      );
    }
    throw error;
  }
};
