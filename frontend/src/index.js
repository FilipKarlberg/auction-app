import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MessagesContextProvider } from "./context/MessageContext";
import { AuthContextProvider } from "./context/AuthContext";
import { AuctionsContextProvider } from "./context/AuctionContext";

// react-query
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MessagesContextProvider>
        <AuctionsContextProvider>
          <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </AuctionsContextProvider>
      </MessagesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
