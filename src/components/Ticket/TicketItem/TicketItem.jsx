import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useTicketsContext } from '../../../hooks/useTicketsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import './TicketItem.css';
import { deleteTicketRequest } from '../../../apis/tickets.api';

const TicketItem = ({ id, title, description, status }) => {
  const { user } = useAuthContext();
  const { dispatch } = useTicketsContext();
  const navigate = useNavigate();

  const statusOptions = {
    open: '',
    success: 'bg-success',
    pending: 'bg-gradient-warning',
  };

  const handleClick = async () => {
    if (!user) {
      return;
    }
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        await deleteTicketRequest(id, user.token);
        dispatch({ type: 'DELETE_TICKET', payload: { id } });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={`info-box ${statusOptions[status]}`}>
      <span className="info-box-icon">
        <i className="far fa-flag"></i>
      </span>
      <div className="inner">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="info-box-actions">
        <button
          className="action-icon"
          onClick={() => navigate(`/tickets/edit/${id}`)}
        >
          <FontAwesomeIcon icon={faPenToSquare} size="lg" />
        </button>
        <button className="action-icon" onClick={handleClick}>
          <FontAwesomeIcon icon={faTrash} size="lg" />
        </button>
      </div>
    </div>
  );
};

export default TicketItem;
