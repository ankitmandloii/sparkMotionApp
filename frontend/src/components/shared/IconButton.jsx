import React from 'react';

const IconButton = ({
    icon: Icon,
    label,
    onClick,
    bgColor = 'bg-[var(--color-primary-dark)]',  // Default background color
    hoverColor = 'hover:bg-orange-600',  // Default hover color
    border = false,  // Border prop defaults to false
    color = '', // Default color is empty if no color prop is passed
    disabled
}) => {
    return (
        <button
            className={`text-white px-4 py-2 rounded-lg flex items-center space-x-2 cursor-pointer ${bgColor} ${hoverColor} ${border ? 'border border-[#262626]' : ''} ${disabled  ? "opacity-[0.5] cursor-not-allowed pointer-events-none" : ""}`}

            onClick={onClick}
        >
            {/* Show icon on small screens only */}
            {Icon && (
                <Icon className="w-4 h-4 sm:hidden" />
            )}

            {/* Show label on larger screens and hide on small screens */}
            <span className="text-sm font-medium sm:block hidden">
                {label}
            </span>
        </button>
    );
};

export default IconButton;
