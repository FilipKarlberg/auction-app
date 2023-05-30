import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

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
              <Link className="border-hover">My Bids</Link>
              <Link to="/create" className="border-hover">
                Create Auction
              </Link>
            </div>
          )}
        </nav>

        <nav className="nav-right">
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleLogoutClick}>Logout</button>
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
