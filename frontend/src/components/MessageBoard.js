import { useEffect } from "react";
import { useMessagesContext } from "../hooks/useMessagesContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import MessageDetails from "./MessageDetails";
import MessageForm from "./MessageForm";

const MessageBoard = () => {
  const { messages, dispatch } = useMessagesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch("/api/messages", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        // using the dispatch from the useMessagesContext to update the data locally
        // (global context instead of local state)
        dispatch({ type: "SET_MESSAGES", payload: json });
      }
    };

    if (user) {
      fetchMessages();
    }
  }, [dispatch, user]);

  return (
    <div className="message-board">
      <MessageForm />
      <div className="messages">
        {messages &&
          messages.map((message) => (
            <MessageDetails key={message._id} message={message} />
          ))}
      </div>
    </div>
  );
};

export default MessageBoard;
