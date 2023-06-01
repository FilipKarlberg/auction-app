import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const BidForm = ({ auction }) => {
  const [bid, setBid] = useState("");
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  const sendBid = () => {
    return axios.patch(
      `/api/auctions/${auction._id}`,
      {
        current_bid: bid,
        min_bid: parseInt(bid) + 1,
        bidder: user._id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
  };

  const createPostMutation = useMutation({
    mutationFn: sendBid,
    onSuccess: () => {
      queryClient.invalidateQueries(["auction", auction._id]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPostMutation.mutate();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Make bid</label>
        <input
          type="number"
          onChange={(e) => setBid(e.target.value)}
          value={bid}
          placeholder={`Enter your bid here`}
          min={auction.min_bid}
          max={auction.buyout_price}
          name="min_bid"
        ></input>
      </form>
    </>
  );
};

export default BidForm;
