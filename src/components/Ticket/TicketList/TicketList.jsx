import TicketItem from '../TicketItem/TicketItem';

const TicketList = ({ tickets }) => {
  return (
    <div>
      {tickets.map(({ id, title, description, status }) => (
        <TicketItem
          key={id}
          id={id}
          title={title}
          description={description}
          status={status}
        />
      ))}
    </div>
  );
};

export default TicketList;
