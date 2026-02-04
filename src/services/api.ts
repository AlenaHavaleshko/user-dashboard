import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
}

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },
};

export interface UsersResponse {
  users: Array<{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phone: string;
    image: string;
    age: number;
    gender: string;
  }>;
  total: number;
  skip: number;
  limit: number;
}

export const usersAPI = {
  getUsers: async (limit = 30, skip = 0): Promise<UsersResponse> => {
    const response = await api.get<UsersResponse>(`/users?limit=${limit}&skip=${skip}`);
    return response.data;
  },
};
