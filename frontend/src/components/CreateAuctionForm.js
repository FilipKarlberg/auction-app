import { useState } from "react";
import { useAuctionsContext } from "../hooks/useAuctionsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const CreateAuctionForm = () => {
  const { dispatch } = useAuctionsContext();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [minBid, setMinBid] = useState("");
  const [buyoutPrice, setBuyoutPrice] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    let min_bid = minBid;
    let buyout_price = buyoutPrice;
    let ending_date = endingDate;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("min_bid", min_bid);
    formData.append("buyout_price", buyout_price);
    formData.append("ending_date", ending_date);
    formData.append("image", imageFile);

    try {
      const response = await fetch("/api/auctions", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      } else {
        setTitle("");
        setBody("");
        setMinBid("");
        setBuyoutPrice("");
        setEndingDate("");
        setImageFile(null);
        setError(null);
        setEmptyFields([]);
        console.log("Auction Created", json);
        dispatch({ type: "CREATE_AUCTION", payload: json });
      }
    } catch (error) {
      console.log("Error creating auction:", error);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() + 1); // Add 1 day
    return minDate.toISOString().split("T")[0];
  };

  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 31); // Add 7 days
    return maxDate.toISOString().split("T")[0];
  };

  return (
    <form className="createAuction" onSubmit={handleSubmit}>
      <h3>Create an auction</h3>

      <label>Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        name="title"
        className={emptyFields?.includes("title") ? "error" : ""}
        placeholder="Name of item"
      ></input>

      <label>Body</label>
      <textarea
        type="text"
        onChange={(e) => setBody(e.target.value)}
        value={body}
        name="body"
        className={emptyFields?.includes("body") ? "error" : ""}
        placeholder="Everything there is to know about the item"
      ></textarea>

      <label>Minimum bid</label>
      <input
        type="number"
        onChange={(e) => setMinBid(e.target.value)}
        value={minBid}
        name="min_bid"
      ></input>

      <label>Buyout price</label>
      <input
        type="number"
        onChange={(e) => setBuyoutPrice(e.target.value)}
        value={buyoutPrice}
        name="buyout_price"
      ></input>

      <label>Auction end</label>
      <input
        type="date"
        onChange={(e) => setEndingDate(e.target.value)}
        value={endingDate}
        name="ending_date"
        className={emptyFields?.includes("ending_date") ? "error" : ""}
        min={getMinDate()}
        max={getMaxDate()}
      ></input>

      <label>Image</label>
      <input
        type="file"
        name="image"
        onChange={(e) => setImageFile(e.target.files[0])}
      ></input>

      <button>Create Auction</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default CreateAuctionForm;
