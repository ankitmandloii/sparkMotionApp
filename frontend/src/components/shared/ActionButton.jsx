// ActionButton.js
import React from 'react';

const ActionButton = ({ label, onClick, type = 'edit' }) => {
    return (
        <button
            className={`bg-[var(--grey-button)] hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-xl text-xs cursor-pointer
                }`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default ActionButton;
