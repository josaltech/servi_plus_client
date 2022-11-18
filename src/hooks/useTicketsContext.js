import { useContext } from 'react';
import { TicketsContext } from '../context/TicketsContext';

export const useTicketsContext = () => {
  const context = useContext(TicketsContext);

  if (!context) {
    throw Error(
      'useTicketsContext must be used inside an TicketsContextProvider'
    );
  }

  return context;
};
