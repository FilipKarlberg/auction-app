import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useDeleteAuction = (auction) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const deleteAuction = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch("/api/auctions/" + auction._id, {
        method: "DELETE",
        body: JSON.stringify({
          user_id: auction.user_id,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        toast.success("Auction deleted! 👋", {
          position: "top-center",
          autoClose: 10000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.log("Removed Auction: ", auction._id);
        navigate("/");
      } else {
        toast.error("Failed to delete auction.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        throw new Error("Failed to delete auction");
      }
    } catch (error) {
      console.error("Error deleting auction:", error);
    }
  };

  return { deleteAuction };
};

export default useDeleteAuction;
