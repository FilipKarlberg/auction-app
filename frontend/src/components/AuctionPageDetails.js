import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import placeholderImage from "../images/placeholder.jpg";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useFetchAuction } from "../hooks/useFetchAuction";

const AuctionPageDetails = (props) => {
  const { user } = useAuthContext();
  const [auctionStatus, setAuctionStatus] = useState("active");
  const auctionData = useFetchAuction(props.auctionId, user);

  const handleClick = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch("/api/auctions/" + auctionData._id, {
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

  return (
    <div className="auction-card">
      {auctionData && auctionStatus === "active" ? (
        <>
          <h4>{auctionData.title}</h4>
          {auctionData.image ? (
            <img
              src={`/api/images/${auctionData.image}`}
              alt={auctionData.image}
            />
          ) : (
            <img src={placeholderImage} alt="placeholder" />
          )}
          <p>
            <strong>Body: </strong>
            {auctionData.body}
          </p>
          <p>
            <strong>Minimum bid: </strong>
            {auctionData.min_bid}
          </p>
          <p>
            <strong>Current bid: </strong>
            {auctionData.current_bid}
          </p>
          <p>
            <strong>Buyout: </strong>
            {auctionData.buyout_price}
          </p>
          <p>
            <strong>Last active: </strong>
            {formatDistanceToNow(new Date(auctionData.updatedAt), {
              addSuffix: true,
            })}
          </p>
          <p>
            <strong>Ends: </strong>
            {auctionData.ending_date}
          </p>
          <span className="material-symbols-outlined" onClick={handleClick}>
            delete
          </span>
        </>
      ) : auctionStatus === "deleted" ? (
        <p>Auction deleted.</p>
      ) : (
        <p>No auction with such id.</p>
      )}
    </div>
  );
};

export default AuctionPageDetails;
