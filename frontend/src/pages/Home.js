import { useEffect } from "react";
import { useMessagesContext } from "../hooks/useMessagesContext";

// components
import MessageDetails from "../components/MessageDetails";
import MessageForm from "../components/MessageForm";

const Home = () => {
  const { messages, dispatch } = useMessagesContext();

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch("/api/messages");
      const json = await response.json();

      if (response.ok) {
        // using the dispatch from the useMessagesContext to update the data locally
        // (global context instead of local state)
        dispatch({ type: "SET_MESSAGES", payload: json });
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="home">
      <div className="messages">
        {messages &&
          messages.map((message) => (
            <MessageDetails key={message._id} message={message} />
          ))}
      </div>
      <MessageForm />
    </div>
  );
};

export default Home;
