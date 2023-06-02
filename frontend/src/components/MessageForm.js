import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

const MessageForm = ({ auction }) => {
  const [message, setMessage] = useState("");
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  const sendMessage = () => {
    return axios.post(
      `/api/messages/`,
      {
        message: message,
        auction_id: auction._id,
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
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries(["message-feed", auction._id]);
      toast.success("Message sent successfully! 🥳", {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      setMessage("");
    },
    onError: () => {
      queryClient.invalidateQueries(["message-feed", auction._id]);
      toast.error("Failed to send message.. 🫠", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPostMutation.mutate();
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <label>Send message</label>
      <input
        type="text"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        required
      ></input>

      <button>Send</button>
    </form>
  );
};

export default MessageForm;
