import React from "react";
import Logout from "./Logout";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div
      className="py-1"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"

    >
      <Link
        to={"/profile"}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      >
        Account
      </Link>
      <Link
        to={"/wallet"}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      >
        Wallet
      </Link>
      <Logout />
    </div>
  );
};

export default Menu;
