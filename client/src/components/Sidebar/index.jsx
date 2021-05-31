import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { Link } from "react-router-dom";
import "./style.css";
import { IconContext } from "react-icons";
import { removeUserSession } from "../../utils/Common";

function Sidebar(props) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const handleLogout = () => {
    removeUserSession();
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars" onClick={showSidebar}>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {/* {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })} */}
            <li className="nav-text">
              <Link to="/">
                <AiIcons.AiFillHome />
                <span>Home</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/students">
                <IoIcons.IoIosPaper />
                <span>Students</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/teachers">
                <IoIcons.IoIosPaper />
                <span>Teachers</span>
              </Link>
            </li>
            <li className="nav-text logout">
              <Link to="/login" onClick={handleLogout}>
                <IoIcons.IoIosPaper />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>

      <div>{props.children}</div>
    </>
  );
}

export default Sidebar;
