import React, { useState } from 'react';
import { Home, Calendar, Users, MapPin, Info } from 'lucide-react';

// Data for the navigation items
const navItems = [
    { name: 'Home', icon: Home, key: 'home' },
    { name: 'Schedule', icon: Calendar, key: 'schedule' },
    { name: 'Artist', icon: Users, key: 'artist' },
    { name: 'Map', icon: MapPin, key: 'map' },
    { name: 'Info', icon: Info, key: 'info' },
];

/**
 * Renders a single navigation item, responsive to show Icon (Mobile) or Text (Desktop).
 * @param {{ item: object, isActive: boolean, onClick: function }} props
 */
const NavItem = ({ item, isActive, onClick }) => {
    const IconComponent = item.icon;

    // Bolder text for active state on desktop
    const activeClasses = isActive
        ? 'font-extrabold text-white'
        : 'font-medium text-gray-400';

    return (
        <div
            onClick={onClick}
            // Container layout remains flexible and centered for both states
            className="flex items-center justify-center cursor-pointer relative h-full w-full py-2 group transition-colors duration-200"
            aria-current={isActive ? 'page' : undefined}
        >
            {/* Icon: Visible on Mobile (< sm), Hidden on Desktop (sm+) */}
            <IconComponent
                className={`
                    w-6 h-6 transition-colors duration-200
                    sm:hidden // Hide icon on desktop
                    ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white/80'}
                `}
            />

            {/* Text Label: Hidden on Mobile (< sm), Visible on Desktop (sm+) */}
            <span className={`
                text-sm sm:text-lg tracking-wide
                hidden sm:block // Show text on desktop
                ${activeClasses} group-hover:text-white/90
            `}>
                {item.name}
            </span>

            {/* Active Indicator (The white underline/strip) */}
            {isActive && (
                <div
                    className={`
                            rounded-b-none
                        absolute h-[4px] bg-white rounded-full shadow-lg transition-all duration-300
                        
                        // Mobile (Icon Only): Smaller width, positioned closer to the icon's center
                        w-8 -bottom-2 
                        
                        // Desktop (sm+): Larger width, positioned slightly further down for the text view
                        sm:w-16 sm:-bottom-2
                        
                        // Center the indicator
                        left-1/2 transform -translate-x-1/2
                    `}
                />
            )}
        </div>
    );
};

// Main App Component containing the Footer
const Footer = ({ currentTab, onTabChange }) => {
    return (
        <div
            // This container ensures the footer component itself is centered for the demo
            className={`
                        w-full  mx-auto p-4 flex justify-center 
                       
                        h-[110px]
                    `}
        >
            <footer
                className={`
                            w-full 
                            // Setting max-width for the actual footer component
                            max-w-full sm:max-w-[800px] 
                            
                            // Layout (Horizontal Flow)
                            flex items-start justify-between 
                            
                            // Spacing 
                            py-6 sm:py-2 
                            px-4 sm:px-8
                            gap-x-2 sm:gap-x-4
                            
                            // Design (Radius 24px, Border 2px, Color)
                            bg-neutral-900 border-2 border-white/10 rounded-[24px] 
                            shadow-2xl shadow-black/50 transition-all duration-300
                        `}
            >
                {navItems.map((item) => (
                    <NavItem
                        key={item.key}
                        item={item}
                        isActive={currentTab === item.key}
                        onClick={() => onTabChange(item.key)}
                    />
                ))}
            </footer>
        </div>
    );
};

export default Footer;
