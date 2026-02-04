import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loginStart, loginSuccess, loginFailure } from './authSlice';
import { authAPI } from '../../services/api';
import type { LoginCredentials } from '../../services/api';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch(loginStart());
      const userData = await authAPI.login(credentials);
      
      // Save user data to Redux store
      dispatch(loginSuccess(userData));
      
      // Save token to localStorage
      localStorage.setItem('token', userData.token);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Login failed. Please try again.';
      dispatch(loginFailure(errorMessage));
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
  };
};
