import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { registerRequest } from '../apis/auth.api';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const register = async (email, password, confirmPassword) => {
    setIsLoading(true);

    if (!email || !password || !confirmPassword) {
      throw new Error('All fields are required');
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    try {
      const response = await registerRequest(email, password);

      // save the user to local storage
      const { user } = response.data.data;
      localStorage.setItem('user', JSON.stringify(user));

      // update the auth context
      dispatch({ type: 'LOGIN', payload: user });

      // update loading state
      setIsLoading(false);
    } catch (error) {
      const { error: errorMsg } = error.response.data;
      setIsLoading(false);
      console.log('User creation encountered an error', error);
      throw new Error(errorMsg);
    }
  };

  return { register, isLoading };
};
