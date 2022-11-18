import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';
import TicketList from '../components/Ticket/TicketList/TicketList';
import { getAllTicketsRequest } from '../apis/tickets.api';
import { useTicketsContext } from '../hooks/useTicketsContext';
import { useAuthContext } from '../hooks/useAuthContext';

import './TicketsPage.css';

const TicketsPage = () => {
  const { tickets, dispatch } = useTicketsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const getAllTickets = async () => {
      const response = await getAllTicketsRequest(user.token);
      const { tickets } = response.data.data;
      if (response.data.success) {
        dispatch({ type: 'GET_TICKETS', payload: tickets });
      }
    };

    if (user) {
      getAllTickets();
    }
  }, [dispatch, user]);

  return (
    <div className="tickets-container">
      <div className="tickets-container__header">
        <h1 className="title">Tickets</h1>
        <Link to="/tickets/new">
          <Button text="Create new ticket" />
        </Link>
      </div>

      {tickets && tickets.length ? (
        <TicketList tickets={tickets} />
      ) : (
        <p> You still don't have any ticket, create a new one. </p>
      )}
    </div>
  );
};

export default TicketsPage;
