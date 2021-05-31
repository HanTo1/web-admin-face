import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Teachers",
    path: "/teachers",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Students",
    path: "/students",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },

  {
    title: "Logout",
    path: "/login",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text logout",
  },
];
