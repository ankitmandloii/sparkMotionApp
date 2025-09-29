import React from "react";
import logo from "../../assets/logos/WhiteLogo.png";
import { SignoutIcon } from "../../assets/icons/icons";
import IconButton from "./IconButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/userInfoSlice";

function Header() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);

  return (
    <header className="px-4 md:px-6 py-3 md:py-4   top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Left Section — Logo + App Info */}
        <div className="flex items-center space-x-3">
          {/* Logo */}
          <div className="w-9 h-9 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
            <img className="h-6" src={logo} alt="SparkMotion Logo" />
          </div>

          {/* App Name + User Info (hidden on mobile) */}
          <div className="hidden sm:block">
            <h1 className="text-xl font-semibold text-white">
              SparkMotion {userInfo.user.role}
            </h1>
            <p className="text-sm text-gray-400">
              Welcome back, {userInfo.user.email}
            </p>
          </div>
        </div>

        {/* Right Section — Sign Out Button */}
        {/* Full button on desktop, icon-only on mobile */}
        <div>
          <div className="hidden md:block">
            <IconButton
              icon={SignoutIcon}
              label="Sign Out"
              onClick={() => dispatch(logout())}
              hoverColor="hover:bg-gray-600"
              bgColor="bg-[#2626264D]"
              border={true}
            />
          </div>

          <button
            onClick={() => dispatch(logout())}
            className="md:hidden p-2 rounded-full bg-[#2626264D] hover:bg-gray-600 transition-colors duration-200"
          >
            <SignoutIcon className="text-white w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
