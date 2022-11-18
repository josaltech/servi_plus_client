import { useAuthContext } from './useAuthContext';
import { useTicketsContext } from './useTicketsContext';
import { createTicketRequest } from '../apis/tickets.api';

export const useCreateTicket = () => {
  const { user } = useAuthContext();
  const { dispatch } = useTicketsContext();

  const createTicket = async (ticketData) => {
    const { title, description } = ticketData;
    if (!title || !description) {
      throw new Error('Please fill all the fields');
    }

    try {
      const response = await createTicketRequest(ticketData, user.token);
      const { ticket } = response.data.data;
      dispatch({ type: 'CREATE_TICKET', payload: ticket });
    } catch (error) {
      const { error: errorMsg } = error.response.data;
      if (errorMsg.startsWith('Ticket validation failed')) {
        throw new Error('Please fill all the fields');
      }
      throw new Error(errorMsg);
    }
  };

  return { createTicket };
};
