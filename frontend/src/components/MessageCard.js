// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const MessageCard = ({ message }) => {
  console.log(message.message);

  return (
    <div className="message-card">
      <p>
        <strong>{message?.username}: </strong>
        {message?.message}
      </p>
      <p>
        {formatDistanceToNow(new Date(message?.updatedAt), {
          addSuffix: true,
        })}
      </p>
    </div>
  );
};

export default MessageCard;
