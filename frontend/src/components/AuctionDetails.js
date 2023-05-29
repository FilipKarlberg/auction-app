import { useAuctionsContext } from "../hooks/useAuctionsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const AuctionDetails = ({ auction }) => {
  const { dispatch } = useAuctionsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/auctions/" + auction._id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_AUCTION", payload: json });
    }
  };

  return (
    <div className="auction-details">
      <h4>{auction.title}</h4>
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
        {formatDistanceToNow(new Date(auction.updatedAt), { addSuffix: true })}
      </p>
      <p>
        <strong>Ends in: </strong>
        TODO: add ends in
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default AuctionDetails;
