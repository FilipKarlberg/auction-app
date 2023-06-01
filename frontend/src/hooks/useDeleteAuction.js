import { useAuthContext } from "../hooks/useAuthContext";

const useDeleteAuction = (auction) => {
  const { user } = useAuthContext();

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
        console.log("Removed Auction: ", auction._id);
      } else {
        throw new Error("Failed to delete auction");
      }
    } catch (error) {
      console.error("Error deleting auction:", error);
    }
  };

  return { deleteAuction };
};

export default useDeleteAuction;
