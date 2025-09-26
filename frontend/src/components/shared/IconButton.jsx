// // IconButton.js
// // IconButton.js
// import React from 'react';

// const IconButton = ({
//     icon: Icon,
//     label,
//     onClick,
//     bgColor = 'bg-orange-500',  // Default background color
//     hoverColor = 'hover:bg-orange-600',  // Default hover color
// }) => {
//     return (
//         <button
//             className={` text-white px-4 py-2 rounded-lg flex items-center space-x-2 cursor-pointer ${bgColor} ${hoverColor}`}
//             onClick={onClick}
//         >
//             {Icon && <Icon className="w-4 h-4" />}
//             <span className="text-sm font-medium">{label}</span>
//         </button>
//     );
// };

// export default IconButton;

// IconButton.js
import React from 'react';

const IconButton = ({
    icon: Icon,
    label,
    onClick,
    bgColor = 'bg-orange-500',  // Default background color
    hoverColor = 'hover:bg-orange-600',  // Default hover color
    border = false,  // Border prop defaults to false
    color = '', // Default color is empty if no color prop is passed
}) => {
    return (
        <button
            className={`text-white px-4 py-2 rounded-lg flex items-center space-x-2 cursor-pointer ${bgColor} ${hoverColor} ${border ? 'border border-[#262626]' : ''}`}
            onClick={onClick}
        >
            {Icon && <Icon className="w-4 h-4" />}
            <span className={`text-sm font-medium ${color ? color : ''}`}>{label}</span>
        </button>
    );
};

export default IconButton;

