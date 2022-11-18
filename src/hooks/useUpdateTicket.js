import { useAuthContext } from './useAuthContext';
import { updateTicketRequest } from '../apis/tickets.api';
import { useTicketsContext } from './useTicketsContext';

export const useUpdateTicket = () => {
  const { user } = useAuthContext();
  const { dispatch } = useTicketsContext();

  const updateTicket = async (ticketId, ticketData) => {
    try {
      const response = await updateTicketRequest(
        ticketId,
        ticketData,
        user.token
      );
      console.log('Update response', response);
      const { ticket } = response.data.data;
      dispatch({ type: 'UPDATE_TICKET', payload: ticket });
    } catch (error) {
      console.log('Update ticket encountered an error', error);
      const { error: errorMsg } = error.response.data;
      throw new Error(errorMsg);
    }
  };

  return { updateTicket };
};
