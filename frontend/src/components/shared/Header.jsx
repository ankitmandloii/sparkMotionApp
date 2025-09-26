import React from 'react'
import logo from "../../assets/logos/WhiteLogo.png"
import { SignoutIcon } from '../../assets/icons/icons'
import IconButton from './IconButton'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/slices/userInfoSlice'
function Header() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userInfo)

    return (
        <header className="  px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-[var(--color-primary)]  rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm"><img className="h-6" src={logo} /></span>
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-white">SparkMotion {userInfo.user.role}</h1>
                        <p className="text-sm text-gray-400">Welcome back, {userInfo.user.email}</p>
                    </div>
                </div>
                {/* <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                    <SignoutIcon className="w-4 h-4" />
                    <span className="text-sm">Sign out</span>
                </button> */}
                <IconButton
                    icon={SignoutIcon}
                    label="Sign Out"
                    onClick={() => dispatch(logout())}
                    hoverColor="hover:bg-gray-600"
                    bgColor='bg-[#2626264D]'
                    border={true}
                />
            </div>
        </header>

    )
}

export default Header