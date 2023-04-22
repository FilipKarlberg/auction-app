const MessageDetails = ({ message }) => {
  return (
    <div className="message-details">
      <h4>{message.title}</h4>
      <p>
        <strong>Author: </strong>
        {message.author}
      </p>
      <p>
        <strong>Body: </strong>
        {message.body}
      </p>
      <p>{message.createdAt}</p>
    </div>
  );
};

export default MessageDetails;
