import { AuctionsContext } from "../context/AuctionContext";
import { useContext } from "react";

// every time we want to use the auctions data, use the useAuctionsContext hook to get
// the context value back

export const useAuctionsContext = () => {
  const context = useContext(AuctionsContext);

  if (!context) {
    throw Error(
      "useAuctionsContext must be used inside a AuctionsContextProvider"
    );
  }

  return context;
};
