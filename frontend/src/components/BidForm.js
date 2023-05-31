import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const BidForm = ({ auction }) => {
  const [bid, setBid] = useState("");
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const response = await fetch(`/api/auctions/${auction._id}`, {
      method: "PATCH",
      body: JSON.stringify({ current_bid: bid, bidder: user._id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      console.log("Bid placed", json);
    }
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
      {error && <div className="error">{error}</div>}
    </>
  );
};

export default BidForm;
