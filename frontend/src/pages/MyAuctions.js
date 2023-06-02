import { useQuery } from "react-query";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

// Components
import AuctionCard from "../components/AuctionCard";

const MyAuctions = () => {
  const { user } = useAuthContext();

  const { isLoading, data, isError, error } = useQuery(
    "my-auction-feed",
    () => {
      return axios.get(`/api/auctions/user/${user._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
    }
  );

  if (isLoading) {
    return <h2>Loading auctions...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      {data?.data?.length === 0 ? (
        <>
          <h2>You have no auctions</h2>
          <p>
            You can create auctions <Link to="/create">here</Link>
          </p>
        </>
      ) : (
        <>
          <h2>Your Auctions</h2>
          <div className="auction-feed">
            <div className="auctions">
              {data?.data.map((auction) => (
                <AuctionCard key={auction._id} auction={auction} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyAuctions;
