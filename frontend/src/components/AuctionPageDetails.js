import placeholderImage from "../images/placeholder.jpg";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

// hooks
import { useFetchAuction } from "../hooks/useFetchAuction";
import useDeleteAuction from "../hooks/useDeleteAuction";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import BidForm from "./BidForm";

const AuctionPageDetails = (props) => {
  const auction = useFetchAuction(props.auctionId);
  const { auctionStatus, deleteAuction } = useDeleteAuction(auction);
  const { user } = useAuthContext();

  const isCreator = auction && user && auction.user_id === user._id;

  return (
    <>
      {auction && auctionStatus === "active" ? (
        <>
          <div className="auction-card">
            <h4>{auction.title}</h4>
            <img
              src={`/api/images/${auction.image}`}
              alt={"placeholder"}
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite fallback loop
                e.target.src = placeholderImage;
              }}
            />
            <p>
              <strong>Body: </strong>
              {auction.body}
            </p>
            <p>
              <strong>Minimum bid: </strong>
              {auction.min_bid}
            </p>
            <p>
              <strong>Current bid: </strong>
              {auction.current_bid}
            </p>
            <p>
              <strong>Buyout: </strong>
              {auction.buyout_price}
            </p>
            <p>
              <strong>Last active: </strong>
              {formatDistanceToNow(new Date(auction.updatedAt), {
                addSuffix: true,
              })}
            </p>
            <p>
              <strong>Ends: </strong>
              {auction.ending_date}
            </p>
            {isCreator && (
              <span
                className="material-symbols-outlined"
                onClick={deleteAuction}
              >
                delete
              </span>
            )}
          </div>
          <BidForm auction={auction} />
        </>
      ) : auctionStatus === "deleted" ? (
        <p>Auction deleted.</p>
      ) : (
        <p>No auction with such id.</p>
      )}
    </>
  );
};

export default AuctionPageDetails;
