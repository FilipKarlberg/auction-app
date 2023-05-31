import { Link } from "react-router-dom";
import placeholderImage from "../images/placeholder.jpg";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const AuctionCard = ({ auction }) => {
  return (
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
        {formatDistanceToNow(new Date(auction.updatedAt), { addSuffix: true })}
      </p>
      <p>
        <strong>Ends: </strong>
        {auction.ending_date}
      </p>
      <Link to={`/auctions/${auction._id}`}>
        <button className="border-hover">View Auction</button>
      </Link>
    </div>
  );
};

export default AuctionCard;
