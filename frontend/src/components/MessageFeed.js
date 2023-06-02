import { useQuery } from "react-query";
import axios from "axios";

// Components
import MessageCard from "../components/MessageCard";

const MessageFeed = ({ auction }) => {
  console.log(auction);

  const { isLoading, data, isError, error } = useQuery(
    ["message-feed", auction._id],
    () => {
      return axios.get(`/api/messages/auction/${auction._id}`);
    }
  );

  if (isLoading) {
    return <h2>Loading messages...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div className="message-feed">
        <div className="auctions">
          {data?.data.map((message) => (
            <MessageCard key={message._id} message={message} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MessageFeed;
