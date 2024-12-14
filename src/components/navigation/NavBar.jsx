import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshAccessToken } from "../../redux/slices/authSlice";
import NavBarItems from './NavBarItems';

const NavBar = () => {
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshAccessToken());
  }, [dispatch]);

  return (
    <div className="bg-gradient-to-r from-teal-900 via-teal-700 to-teal-500 sticky top-0 z-[20] mx-auto flex w-full items-center justify-between p-8 h-full shadow-lg">
      <NavBarItems />
    </div>
  );
};

export default NavBar;
