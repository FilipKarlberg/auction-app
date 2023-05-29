import { useEffect } from "react";
import { useAuctionsContext } from "../hooks/useAuctionsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// Components
import AuctionDetails from "./AuctionDetails";

const AuctionFeed = () => {
  const { auctions, dispatch } = useAuctionsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchAuctions = async () => {
      const response = await fetch("/api/auctions", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        // using the dispatch from the useAuctionsContext to update the data locally
        // (global context instead of local state)
        dispatch({ type: "SET_AUCTIONS", payload: json });
      }
    };

    if (user) {
      fetchAuctions();
    }
  }, [dispatch, user]);

  return (
    <div className="auction-feed">
      <div className="auctions">
        {auctions &&
          auctions.map((auction) => (
            <AuctionDetails key={auction._id} auction={auction} />
          ))}
      </div>
    </div>
  );
};

export default AuctionFeed;
