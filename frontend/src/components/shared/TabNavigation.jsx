import React, { useState } from 'react';

const tabs = [
    { name: 'Overview', href: 'Admin/Overview' }, //admin/Overview 
    { name: 'Events', href: '#' },
    { name: 'Organizations', href: '#' },
    { name: 'Settings', href: '#' },

];

const TabNavigation = ({ currentTab, onTabChange, navigate }) => {
    return (
        <div className="relative flex justify-between items-center bg-[var(--border-color)]  rounded-full p-1 w-full transition-all duration-200 cursor-pointer">
            {tabs.map((tab, index) => (
                <button
                    key={index} // <-- CHANGED FROM tab.key TO index
                    onClick={() => {
                        onTabChange(tab.name)
                    }}
                    className={`z-10 relative cursor-pointer w-1/3 text-sm font-medium transition-colors duration-200 rounded-full ${currentTab === tab.name
                        ? 'text-white'
                        : 'text-[var(--color-text-secondary)]'
                        }`}
                >
                    {tab.name}
                </button>
            ))}

            {/* Sliding background indicator */}
            <div
                className="absolute cursor-pointer top-0 left-0 h-full bg-[var(--color-primary-dark)] rounded-full transition-all duration-300"
                style={{
                    width: `${100 / tabs.length}%`,
                    transform: `translateX(${tabs.findIndex(tab => tab.name === currentTab) * 100}%)`
                }}
            />
        </div>
    );
};

export default TabNavigation;