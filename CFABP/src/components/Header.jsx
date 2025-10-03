import React from 'react';
// We are using a custom SVG implementation to apply the gradient correctly as a fill.
import logo from "../assets/logos/CFA_Logo.png"
import ScheduleHeaderButton from './shared/ScheduleHeaderButton';
import ArtistPageButton from './shared/ArtistPageButton';
import { Hamburger } from '../assets/customSvg';

const colorPrimaryDark = '#000000';
const colorPrimary = '#242323';
const colorTextBase = '#FFFFFF';
const colorGradientStop1 = '#E35254'; // Lighter Red/Pink
const colorGradientStop2 = '#A8272C'; // Darker Red

// PlayIconWithGradient component (unchanged, but note it's currently just an image)
const PlayIconWithGradient = ({ size }) => (
    // size prop is not used in the img tag, but kept for context/future SVG use
    <img src={logo} height={"50px"} width={"218px"} alt="CFA Logo" />
);


/**
 * Header component: Displays the logo and a conditional button/hamburger menu.
 * @param {object} props
 * @param {React.ComponentType} [props.Button=() => null] - The component to render in the desktop view. Defaults to a component that renders nothing.
 */
const Header = ({ Button = () => null }) => {
    // 💡 Improvement: Using default value in destructuring ({ Button = () => null })
    // is cleaner than an 'if' block.
    // I replaced () => {} with () => null as it's common practice for components
    // that should render nothing, though () => {} works fine too.

    return (
        <header className="w-full top-0 h-[110px] fixed z-100">

            <div
                // The class `color-primary-background` is not defined here,
                // assuming it sets the background color (likely one of the 'color-primary' variables).
                // I've kept the original class name.
                className={`
                    flex items-center px-8 py-2 
                    overflow-hidden color-primary-background 
                    justify-between
                    w-full
                `}
            >
                <div className="flex items-center space-x-4">
                    {/* Logo/Icon Container */}
                    <div className=" flex-shrink-0">
                        <PlayIconWithGradient size={60} />
                    </div>
                </div>

                {/* Mobile/Tablet View: Hamburger Icon */}
                <div className='lg:hidden md:hidden'>
                    <Hamburger />
                </div>

                {/* Desktop View: Dynamic Button Component */}
                <div className='hidden md:flex lg:flex'>
                    <Button />
                </div>
            </div>

            {/* 3. Separator Line (Matching --color-primary-dark: #000000) - Missing in original code */}
            {/* You might want to add a div here for the separator */}
            {/* <div style={{ height: '2px', backgroundColor: colorPrimaryDark }} /> */}

        </header>
    );
};

export default Header;