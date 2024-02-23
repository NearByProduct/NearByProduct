import React, { Fragment } from "react";
import {
  FaUser,
  FaShoppingCart,
  FaInbox,
  FaTruck,
  FaMapMarkerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePageMenu = ({ active, setActive }) => {
  const navigate = useNavigate();

  const handlelogout = async () => {
    try {
      localStorage.removeItem("user");

      const { data } = await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        { withCredentials: true }
      );
      console.log(data);
      if (data.success) {
        console.log("logged out successfully");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <div className="user">
        <div onClick={(e) => setActive(1)} className="profilepagemenu">
          <FaUser />
          Profile
        </div>

        <div onClick={(e) => setActive(2)} className="profilepagemenu">
          <FaShoppingCart />
          Orders
        </div>

        <div onClick={(e) => setActive(3)} className="profilepagemenu">
          <FaInbox />
          Inbox
        </div>
        <div className="profilepagemenu" onClick={handlelogout}>
          <FaSignOutAlt />
          Logout
        </div>
      </div>
    </Fragment>
  );
};

export default ProfilePageMenu;
