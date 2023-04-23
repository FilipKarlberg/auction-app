import { createContext, useReducer } from "react";

// this file keeps the frontend up-to-date with the backend, syncing dynamically only locally

export const MessagesContext = createContext();

export const messagesReducer = (state, action) => {
  switch (action.type) {
    case "SET_MESSAGES":
      return {
        messages: action.payload,
      };
    case "CREATE_MESSAGE":
      return {
        messages: [action.payload, ...state.messages],
      };
    default:
      return state;
  }
};

export const MessagesContextProvider = ({ children }) => {
  // use the dispatch to update the reducer
  const [state, dispatch] = useReducer(messagesReducer, {
    messages: null,
  });

  return (
    <MessagesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MessagesContext.Provider>
  );
};
