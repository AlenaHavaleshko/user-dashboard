import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } from './usersSlice';
import { usersAPI } from '../../services/api';

export const useFetchUsers = (limit = 30, skip = 0) => {
  const dispatch = useAppDispatch();
  const { users, isLoading, error, total } = useAppSelector((state) => state.users);

  const fetchUsers = useCallback(async () => {
    try {
      dispatch(fetchUsersStart());
      const response = await usersAPI.getUsers(limit, skip);
      dispatch(fetchUsersSuccess({ users: response.users, total: response.total }));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to fetch users. Please try again.';
      dispatch(fetchUsersFailure(errorMessage));
    }
  }, [dispatch, limit, skip]);

  useEffect(() => {

    if (users.length === 0 && !isLoading && !error) {
      fetchUsers();
    }
  }, [users.length, isLoading, error, fetchUsers]);

  return {
    users,
    isLoading,
    error,
    total,
    refetch: fetchUsers,
  };
};
