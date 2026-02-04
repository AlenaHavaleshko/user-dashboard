export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone: string;
  image: string;
  age: number;
  gender: string;
}

export interface UsersState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  total: number;
}
