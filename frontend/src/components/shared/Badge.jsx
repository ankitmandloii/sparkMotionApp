// // Badge.js
// import React from 'react';

// const Badge = ({ label, bgColor, textColor, borderColor }) => {
//     const badgeStyles = `px-2 py-1 rounded text-xs font-medium ${borderColor ? `border ${borderColor}` : ''} ${bgColor} ${textColor} `;

//     return <span className={badgeStyles}>{label}</span>;
// };

// export default Badge;
import React from 'react';


const Badge = ({ label, bgColor, textColor, borderColor }) => {

    const capitalizeFirstLetter = (label) => {
        if (!label) return 'N/A';
        return label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
    };
    const Badgelabel = capitalizeFirstLetter(label);

    const badgeStyles = `px-2 py-1 rounded text-xs font-medium w-20 h-6 flex items-center justify-center ${borderColor ? `border ${borderColor}` : ''} ${bgColor} ${textColor}`;

    return <span className={badgeStyles}>{Badgelabel}</span>;
};

export default Badge;