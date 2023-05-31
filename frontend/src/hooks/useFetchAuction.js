import { useEffect, useState } from "react";

// Custom hook for fetching auction data
export const useFetchAuction = (auctionId, user) => {
  const [auctionData, setAuctionData] = useState(null);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const response = await fetch(`/api/auctions/${auctionId}`);

        if (response.ok) {
          const json = await response.json();
          setAuctionData(json.auction);
        } else {
          throw new Error("Failed to fetch auction data");
        }
      } catch (error) {
        console.error("Error fetching auction data:", error);
      }
    };

    fetchAuction();
  }, [auctionId, user]);

  return auctionData;
};
