import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isLoginPage = location.pathname === "/login";
  const isOrderConfPage = location.pathname === "/order/orderPlaced";
  const navigate=useNavigate();
  // const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const logout=()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  return (
    <div className="navbar">
      {isLoginPage ? (
        <div className="centered-logo">
          <Link to="/">
            <img src={assets.logo} alt="" className="logo" />
          </Link>
        </div>
      ) : (
        <Link to="/">
          <img src={assets.logo} alt="" className="logo" />
        </Link>
      )}
      {!isHomePage && !isLoginPage && !isOrderConfPage && (
        <ul className="navbar-menu">
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            Menu
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            Contact Us
          </a>
        </ul>
      )}

      <div className="navbar-right">
        {!isLoginPage && !isOrderConfPage && (
          <>
            <div className="navbar-search-icon">
              <Link to="/cart">
                {/* <img src={assets.basket_icon} alt="" /> */}
                <lord-icon
                  src="https://cdn.lordicon.com/taymdfsf.json"
                  trigger="hover"
                ></lord-icon>
                <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
              </Link>
            </div>
            {!token?<button onClick={() => setShowLogin(true)}>Sign In</button>
            :  
            <div className='navbar-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
            </div>
          }
          </>
        )}

        {/* {isAuthenticated ? (
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </button>
        ) : (
          <button onClick={() => loginWithRedirect()}>Log In</button>
        )} */}
      </div>
    </div>
  );
};

export default Navbar;
