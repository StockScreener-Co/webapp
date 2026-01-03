import { apiFetch } from './apiClient';

export interface AuthResponse {
  token: string;
  email: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  repeatPassword: string;
  fullName: string;
}

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await apiFetch('/auth/registration', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return response.json();
};

export const loginApi = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  return response.json();
};
