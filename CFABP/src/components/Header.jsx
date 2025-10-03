import React from 'react';
// We are using a custom SVG implementation to apply the gradient correctly as a fill.
import logo from "../assets/logos/CFA_Logo.png"
const colorPrimaryDark = '#000000';
const colorPrimary = '#242323';
const colorTextBase = '#FFFFFF';
const colorGradientStop1 = '#E35254'; // Lighter Red/Pink
const colorGradientStop2 = '#A8272C'; // Darker Red

/**
 * Custom SVG component to apply the linear gradient defined in the CSS variables
 * to the play circle icon, matching the visual style perfectly.
 */
const PlayIconWithGradient = ({ size }) => (
    // <svg
    //     width={size}
    //     height={size}
    //     viewBox="0 0 24 24"
    //     fill="none"
    //     xmlns="http://www.w3.org/2000/svg"
    //     className="drop-shadow-lg"
    // >
    //     {/* Define the linear gradient using the provided colors */}
    //     <defs>
    //         <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
    //             <stop offset="0%" style={{ stopColor: colorGradientStop1, stopOpacity: 1 }} />
    //             <stop offset="100%" style={{ stopColor: colorGradientStop2, stopOpacity: 1 }} />
    //         </linearGradient>
    //     </defs>

    //     {/* Use the gradient for the fill of the main circle */}
    //     <circle cx="12" cy="12" r="11" fill="url(#iconGradient)" />

    //     {/* White triangle for the 'play' indicator */}
    //     <polygon points="10 8 16 12 10 16 10 8" fill="#FFFFFF" />
    // </svg>
    <img src={logo} height={"50px"} width={"218px"} >
    </img>
);


const Header = () => {
    return (
        <header className="w-full top-0 h-[110px] fixed">

            <div
                className={`
                    flex items-center  px-2 py-2 
                     overflow-hidden color-primary-background 
                      w-full
                `}
            >
                <div className="flex items-center space-x-4">
                    {/* Logo/Icon Container */}
                    <div className="flex-shrink-0">
                        <PlayIconWithGradient size={60} />
                    </div>
                </div>
            </div>

            {/* 3. Separator Line (Matching --color-primary-dark: #000000) */}

        </header>
    );
};

export default Header;
