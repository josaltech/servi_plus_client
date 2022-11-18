import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { loginRequest } from '../apis/auth.api';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password, confirmPassword) => {
    setIsLoading(true);

    if (!email || !password) {
      throw new Error('All fields are required');
    }

    try {
      const response = await loginRequest(email, password);

      // save the user to local storage
      const { user } = response.data.data;
      console.log(user);
      localStorage.setItem('user', JSON.stringify(user));

      // update the auth context
      dispatch({ type: 'LOGIN', payload: user });

      // update loading state
      setIsLoading(false);
    } catch (error) {
      const { error: errorMsg } = error.response.data;
      setIsLoading(false);
      console.log('User login encountered an error', error);
      throw new Error(errorMsg);
    }
  };

  return { login, isLoading };
};
