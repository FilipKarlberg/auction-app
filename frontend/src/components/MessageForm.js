import { useState } from "react";
import { useMessagesContext } from "../hooks/useMessagesContext";

const MessageForm = () => {
  const { dispatch } = useMessagesContext();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = { title, author, body };

    const response = await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTitle("");
      setAuthor("");
      setBody("");
      setError(null);
      console.log("Message added", json);
      dispatch({ type: "CREATE_MESSAGE", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new message</h3>

      <label>Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      ></input>

      <label>Author</label>
      <input
        type="text"
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
      ></input>

      <label>Body</label>
      <input
        type="text"
        onChange={(e) => setBody(e.target.value)}
        value={body}
      ></input>

      <button>Add message</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default MessageForm;
