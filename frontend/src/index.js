import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MessagesContextProvider } from "./context/MessageContext";
import { AuthContextProvider } from "./context/AuthContext";

// react-query
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MessagesContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </MessagesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
