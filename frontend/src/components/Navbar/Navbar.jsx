import React, { useContext, useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { assets } from '../../assets/frontend_assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setshowlogin }) => {
  const [menu, setMenu] = useState("Home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility
  const dropdownRef = useRef(null); // Reference for the dropdown

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the dropdown
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='navbar'>
      <Link to="/">
       <h1>FOODY</h1>
      </Link>
      <ul className='navbar-menu'>
        <Link to='/' className={menu === "Home" ? "active" : ""} onClick={() => setMenu("Home")}>Home</Link>
        <a href="#explore-menu" className={menu === "Menu" ? "active" : ""} onClick={() => setMenu("Menu")}>Menu</a>
        <a href="#app_download" className={menu === "Mobile-app" ? "active" : ""} onClick={() => setMenu("Mobile-app")}>Mobile-app</a>
        <a href="#footer" className={menu === "Contactus" ? "active" : ""} onClick={() => setMenu("Contactus")}>Contact Us</a>
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt="Search Icon" />
        <div className='navbar-search-icon'>
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="Cart Icon" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? 
          <button onClick={() => setshowlogin(true)}>Sign in</button>
          :
          <div className='navbar-profile' onClick={() => setDropdownVisible(prev => !prev)}>
            <img src={assets.profile_icon} alt="Profile" />
            {dropdownVisible && (
              <ul className="nav-profile-dropdown" ref={dropdownRef}>
                <li>
                  <img src={assets.bag_icon} alt="Orders Icon" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="Logout Icon" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default Navbar;
