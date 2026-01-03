const API_BASE_URL = 'https://core-production-5602.up.railway.app/api/v1';
//http://localhost:8080

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
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
        'Cannot connect to backend server. Please make sure the backend is running on https://core-production-5602.up.railway.app'
      );
    }
    throw error;
  }
};
