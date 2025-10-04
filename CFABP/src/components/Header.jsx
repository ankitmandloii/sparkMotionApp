import React from 'react';
import logo from "../assets/logos/CFA_Logo.png"; // Import the logo
import { Hamburger } from '../assets/customSvg'; // Assuming this is your custom SVG for the hamburger
import ScheduleHeaderButton from './shared/ScheduleHeaderButton';
import ArtistPageButton from './shared/ArtistPageButton';
import { useNavigate } from 'react-router';

const colorPrimaryDark = '#000000';
const colorPrimary = '#242323';
const colorTextBase = '#FFFFFF';
const colorGradientStop1 = '#E35254'; // Lighter Red/Pink
const colorGradientStop2 = '#A8272C'; // Darker Red

// PlayIconWithGradient component (unchanged, but note it's currently just an image)
const PlayIconWithGradient = ({ size }) => (
    <img src={logo} className='w-[144px] md:w-[218px]' alt="CFA Logo" />
);

/**
 * Header component: Displays the logo and a conditional button/hamburger menu.
 * @param {object} props
 * @param {React.ComponentType} [props.Button=() => null] - The component to render in the desktop view. Defaults to a component that renders nothing.
 */
const Header = ({ Button = () => null }) => {

    return (
        <header className="w-full top-0 color-primary-background flex items-center justify-center  h-[70px] md:h-[110px] fixed z-100 ">
            <div
                className={`
                        flex items-center px-8 md:px-14  py-2
                        overflow-hidden color-primary-background
                         justify-between
                        w-full
        `}
            >
                <div className="flex items-center space-x-4">
                    {/* Logo/Icon Container */}
                    <div className="flex-shrink-0">
                        <PlayIconWithGradient size={60} />
                    </div>
                </div>

                {/* Mobile/Tablet View: Hamburger Icon */}
                <div className="lg:hidden w-[24px] h-[24px] md:hidden">
                    <Hamburger />
                </div>
                {/* Desktop View: Dynamic Button Component */}
                <div className="hidden md:flex lg:flex">
                    <Button />
                </div>
            </div>
        </header>
    );
};

export default Header;
