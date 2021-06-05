import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/dropdown.scss"
import actions from "../../redux/user/actions";
import { useWindowDimensions } from "../../utils/width";
import { history } from "../../index";

const Header = () => {

  const { width } = useWindowDimensions();

  const isMobile = width < 640;

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const logout = () => {
    dispatch({
      type: actions.LOGOUT,
    })
  }

  return (
    user.authorized && <div className="flex justify-between items-center">
      <div className="logo" style={{ width: "64px" }}>
        {isMobile &&
        <img
          src="resources/images/black-logo.png"
          alt="logo"
          onClick={() => history.push('/')}
        />}
      </div>
      <div className="flex justify-end items-center">
        <h6 className="mr-2">
          {user.first_name} {user.last_name}
        </h6>
        <div className="dropdown">
          <img
            className="rounded-full border border-gray-900 dropbtn"
            src="resources/icons/avatar.png"
            alt="avatar"
            width="48"
            height="48"
          />
          <div className="dropdown-content">
            <a href="#" onClick={logout}>LOGOUT</a>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Header;
