import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useState } from "react";
import { ReactComponent as Hamburger } from "./assets/icons/hamburger.svg";
import WishListModal from "./Modals/WishList";

const Navbar = ({ user, setUser }) => {
  const [showNav, setShowNav] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const toggleNavItems = () => {
    setShowNav(!showNav);
  };
const navigate = useNavigate()
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <div>
            <img width="80px" src="logoo.png" />
          </div>
        </div>
        <div className="menu-icon" onClick={toggleNavItems}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNav && "active"}`}>
          <ul>
            <li>
              <NavLink onClick={toggleNavItems} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink onClick={toggleNavItems} to="/subscriptions">
                Subscriptions
              </NavLink>
            </li>
            <li
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpenCart(true);
                toggleNavItems();
              }}
            >
              Wishlist
            </li>
            {user ? (
              <li
                style={{ cursor: "pointer" }}
                onClick={() => {
                  localStorage.setItem("user", null);
                  setUser(null);
                  toggleNavItems()
                  navigate("/login");
                }}
              >
                Logout
              </li>
            ) : (
              <li>
                <NavLink onClick={toggleNavItems} to="/login">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
      <WishListModal
        user={user}
        setOpenCart={setOpenCart}
        openCart={openCart}
      />
    </nav>
  );
};

export default Navbar;
