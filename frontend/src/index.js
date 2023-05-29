import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MessagesContextProvider } from "./context/MessageContext";
import { AuthContextProvider } from "./context/AuthContext";
import { AuctionsContextProvider } from "./context/AuctionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MessagesContextProvider>
        <AuctionsContextProvider>
          <App />
        </AuctionsContextProvider>
      </MessagesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
