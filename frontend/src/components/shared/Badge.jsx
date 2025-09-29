// Badge.js
import React from 'react';

const Badge = ({ label, bgColor, textColor, borderColor }) => {
    const badgeStyles = `px-2 py-1 rounded text-xs font-medium ${borderColor ? `border ${borderColor}` : ''} ${bgColor} ${textColor} `;

    return <span className={badgeStyles}>{label}</span>;
};

export default Badge;
