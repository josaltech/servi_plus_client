import { createContext, useReducer } from 'react';

export const TicketsContext = createContext();

export const ticketsReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TICKETS':
      return {
        tickets: action.payload,
      };
    case 'CREATE_TICKET':
      return {
        tickets: [action.payload, ...state.tickets],
      };
    case 'UPDATE_TICKET':
      return {
        tickets: [
          action.payload,
          ...state.tickets.filter((ticket) => ticket.id !== action.payload.id),
        ],
      };
    case 'DELETE_TICKET':
      return {
        tickets: state.tickets.filter(
          (ticket) => ticket.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export const TicketsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ticketsReducer, {
    tickets: null,
  });

  console.log('Tickets Context State', state);

  return (
    <TicketsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TicketsContext.Provider>
  );
};
