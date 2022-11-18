import { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useCreateTicket } from '../hooks/useCreateTicket';
import { useUpdateTicket } from '../hooks/useUpdateTicket';
import './NewTicketPage.css';

const NewTicketPage = () => {
  const { createTicket } = useCreateTicket();
  const { updateTicket } = useUpdateTicket();
  const { user } = useAuthContext();
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    status: 'open',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { ticketId } = useParams();

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      !ticketId
        ? await createTicket(formValues, user.token)
        : await updateTicket(ticketId, formValues, user.token);
      navigate('/tickets');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="card">
      <h5 className="card-header">Create new Ticket</h5>
      <div className="card-body">
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              className="form-control"
              id="title"
              name="title"
              onChange={handleFormChange}
              type="text"
              value={formValues.title}
            />

            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              onChange={handleFormChange}
              rows="3"
              value={formValues.description}
            />

            <label htmlFor="status" hidden={pathname === '/tickets/new'}>
              Status
            </label>
            <select
              className="form-control"
              hidden={pathname === '/tickets/new'}
              id="status"
              name="status"
              onChange={handleFormChange}
              value={formValues.status}
            >
              <option value="open">Open</option>
              <option value="pending">Pending</option>
              <option value="success">Success</option>
            </select>

            <button className="btn btn-dark mt-3" type="submit">
              {pathname === '/tickets/new' ? 'Create' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTicketPage;
