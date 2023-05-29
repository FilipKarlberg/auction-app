import { createContext, useReducer } from "react";

// this file keeps the frontend up-to-date with the backend, syncing dynamically only locally

export const AuctionsContext = createContext();

export const auctionsReducer = (state, action) => {
  switch (action.type) {
    case "SET_AUCTIONS":
      return {
        auctions: action.payload,
      };
    case "CREATE_AUCTION":
      return {
        auctions: [action.payload, ...state.auctions],
      };
    case "DELETE_AUCTION":
      return {
        // keep the auctions that are not getting deleted
        auctions: state.auctions.filter((a) => a._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const AuctionsContextProvider = ({ children }) => {
  // use the dispatch to update the reducer
  const [state, dispatch] = useReducer(auctionsReducer, {
    auctions: null,
  });

  return (
    <AuctionsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuctionsContext.Provider>
  );
};
