import TicketsPage from '../pages/TicketsPage';
import NewTicketPage from '../pages/NewTicketPage';

export const ticketRoutes = [
  { index: true, component: <TicketsPage /> },
  { path: 'tickets', component: <TicketsPage />, index: true },
  { path: 'tickets/new', component: <NewTicketPage /> },
  { path: 'tickets/edit/:ticketId', component: <NewTicketPage /> },
];
