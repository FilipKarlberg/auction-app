import { useQuery } from "react-query";
import axios from "axios";

// Components
import AuctionCard from "../components/AuctionCard";

const AuctionFeed = () => {
  const { isLoading, data, isError, error } = useQuery("auction-feed", () => {
    return axios.get("/api/auctions");
  });

  if (isLoading) {
    return <h2>Loading auctions...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div className="auction-feed">
        <div className="auctions">
          {data?.data.map((auction) => (
            <AuctionCard key={auction._id} auction={auction} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AuctionFeed;
