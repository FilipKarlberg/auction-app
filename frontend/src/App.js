import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateAuction from "./pages/CreateAuction";
import AuctionPage from "./pages/AuctionPage";

// toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyAuctions from "./pages/MyAuctions";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route
                path="/create"
                element={user ? <CreateAuction /> : <Navigate to="/login" />}
              />
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
              <Route path="/auctions/:auctionId" element={<AuctionPage />} />

              <Route
                path="/profile"
                element={user ? <MyAuctions /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
