import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-query";

import placeholderImage from "../images/placeholder.jpg";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import axios from "axios";

// hooks
import useDeleteAuction from "../hooks/useDeleteAuction";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import BidForm from "../components/BidForm";
import MessageForm from "../components/MessageForm";
import MessageFeed from "../components/MessageFeed";

const AuctionPage = () => {
  const [isCreator, setIsCreator] = useState(false);
  const { auctionId } = useParams();
  const { user } = useAuthContext();

  const onSuccess = (auction) => {
    if (user._id === auction.user_id) {
      // if logged in user matches creator of auction
      setIsCreator(true);
    }
  };

  const fetchAuction = (auctionId) => {
    return axios.get(`/api/auctions/${auctionId}`);
  };

  const { isLoading, data, isError, error } = useQuery(
    ["auction", auctionId],
    () => fetchAuction(auctionId),
    {
      onSuccess: (data) => onSuccess(data.data.auction),
      onError: (error) => console.log(error.message),
    }
  );

  const auction = data?.data.auction;
  const { deleteAuction } = useDeleteAuction(auction);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return (
      <>
        <h2>{error.message}</h2>
        <p>Could not find auction with id {auctionId}</p>
      </>
    );
  }

  return (
    <>
      <div className="auction-card">
        {isCreator && (
          <span
            className="material-symbols-outlined"
            onClick={() => {
              deleteAuction();
            }}
          >
            delete
          </span>
        )}
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
          <strong>Info: </strong>
          {auction.body}
        </p>

        {!auction.current_bid ? (
          <p>
            <strong>Start bid: </strong>
            {auction.min_bid} €
          </p>
        ) : auction.is_sold ? (
          <>
            <p>
              <strong>Sold for: </strong>
              {auction.current_bid} €
            </p>
            <p>
              <strong>Buyer: </strong>
              {auction.bidder_username}
            </p>
          </>
        ) : (
          <>
            <p>
              <strong>Current bid: </strong>
              {auction.current_bid} €
            </p>
            <p>
              <strong>Bidder: </strong>
              {auction.bidder_username ? auction.bidder_username : "-"}
            </p>
          </>
        )}

        {!auction.is_sold && (
          <p>
            <strong>Buyout: </strong>
            {auction.buyout_price ? auction.buyout_price + " €" : "-"}
          </p>
        )}

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

        {!auction.is_sold && <BidForm auction={auction} />}
      </div>
      <MessageFeed auction={auction} />
      <MessageForm auction={auction} />
    </>
  );
};

export default AuctionPage;
