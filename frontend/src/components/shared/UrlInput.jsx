// ActionButton.js
import React from 'react';

const UrlInput = ({ label, onClick, type = 'edit' }) => {
    return (
        <button
            className={`bg-[var(--grey-button)]  text-gray-300    text-sm  rounded p-2 text-start w-full
                }`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default UrlInput;
