import { MessagesContext } from "../context/MessageContext";
import { useContext } from "react";

// every time we want to use the messages data, use the useMessagesContext hook to get
// the context value back

export const useMessagesContext = () => {
  const context = useContext(MessagesContext);

  if (!context) {
    throw Error(
      "useMessagesContext must be used inside a MessagesContextProvider"
    );
  }

  return context;
};
