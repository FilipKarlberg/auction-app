import { useMessagesContext } from "../hooks/useMessagesContext";

const MessageDetails = ({ message }) => {
  const { dispatch } = useMessagesContext();

  const handleClick = async () => {
    const response = await fetch("/api/messages/" + message._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_MESSAGE", payload: json });
    }
  };

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
      <span onClick={handleClick}>delete</span>
    </div>
  );
};

export default MessageDetails;
