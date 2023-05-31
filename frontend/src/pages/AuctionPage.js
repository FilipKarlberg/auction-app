import { useParams } from "react-router-dom";

// Components
import AuctionPageDetails from "../components/AuctionPageDetails";

const AuctionPage = () => {
  const { id } = useParams();

  return (
    <div className="auction-page">
      {!id ? <h1>Auction not found</h1> : <AuctionPageDetails auctionId={id} />}
    </div>
  );
};

export default AuctionPage;
