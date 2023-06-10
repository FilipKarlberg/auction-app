import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import React from "react";

const Navbar = () => {
  const { logout } = useLogout();
  const { state } = useAuthContext();
  const user = state.user;

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <nav className="nav-left">
          <Link className="logotype" to="/">
            <h1>Logo</h1>
          </Link>
          {user && (
            <div>
              <Link to="/" className="border-hover">
                Auctions
              </Link>

              <Link to="/create" className="border-hover">
                Create Auction
              </Link>
            </div>
          )}
        </nav>

        <nav className="nav-right">
          {user && (
            <div>
              <Link to="/profile" className="border-hover">
                <span>{user.username}</span>
              </Link>

              <Link to="/">
                <button onClick={handleLogoutClick}>Logout</button>
              </Link>
            </div>
          )}

          {!user && (
            <div>
              <Link to="/login" className="border-hover">
                Login
              </Link>
              <Link to="/signup" className="border-hover">
                Signup
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
