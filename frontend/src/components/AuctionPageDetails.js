import placeholderImage from "../images/placeholder.jpg";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useParams } from "react-router-dom";

// hooks
import useDeleteAuction from "../hooks/useDeleteAuction";
import { useAuthContext } from "../hooks/useAuthContext";
import { useAuctionData } from "../hooks/useAuctionData";

// components
import BidForm from "./BidForm";

const AuctionPageDetails = () => {
  const { auctionId } = useParams();
  const { isLoading, data, isError, error } = useAuctionData(auctionId);

  //const auction = useFetchAuction(props.auctionId);
  const { deleteAuction } = useDeleteAuction(data.data);
  const { user } = useAuthContext();

  const isCreator = user && data.data.user_id === user._id;

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div className="auction-card">
        <h4>{data?.data.title}</h4>
        <img
          src={`/api/images/${data?.data.image}`}
          alt={"placeholder"}
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite fallback loop
            e.target.src = placeholderImage;
          }}
        />
        <p>
          <strong>Body: </strong>
          {data?.data.body}
        </p>
        <p>
          <strong>Minimum bid: </strong>
          {data?.data.min_bid}
        </p>
        <p>
          <strong>Current bid: </strong>
          {data?.data.current_bid}
        </p>
        <p>
          <strong>Buyout: </strong>
          {data?.data.buyout_price}
        </p>
        <p>
          <strong>Last active: </strong>
          {formatDistanceToNow(new Date(data?.data.updatedAt), {
            addSuffix: true,
          })}
        </p>
        <p>
          <strong>Ends: </strong>
          {data?.data.ending_date}
        </p>
        {isCreator && (
          <span className="material-symbols-outlined" onClick={deleteAuction}>
            delete
          </span>
        )}
      </div>
    </>
  );
};

export default AuctionPageDetails;
