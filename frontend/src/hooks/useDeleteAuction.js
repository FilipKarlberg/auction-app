import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

const useDeleteAuction = (auction) => {
  const { user } = useAuthContext();
  const [auctionStatus, setAuctionStatus] = useState("active");

  const deleteAuction = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch("/api/auctions/" + auction._id, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (response.ok) {
        setAuctionStatus("deleted");
      } else {
        throw new Error("Failed to delete auction");
      }
    } catch (error) {
      console.error("Error deleting auction:", error);
    }
  };

  return { auctionStatus, deleteAuction };
};

export default useDeleteAuction;
