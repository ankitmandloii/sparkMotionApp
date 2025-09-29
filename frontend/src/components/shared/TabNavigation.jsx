import React from "react";
import { Home, Calendar, Building2, Settings } from "lucide-react";

const tabs = [
  { name: "Overview", href: "Admin/Overview", icon: Home },
  { name: "Events", href: "#", icon: Calendar },
  { name: "Organizations", href: "#", icon: Building2 },
  { name: "Settings", href: "#", icon: Settings },
];

const TabNavigation = ({ currentTab, onTabChange }) => {
  return (
    <div className="relative flex justify-between items-center bg-[var(--border-color)] rounded-full p-1 w-full transition-all duration-200 cursor-pointer">
      {tabs.map((tab, index) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.name;

        return (
          <button
            key={index}
            onClick={() => onTabChange(tab.name)}
            className={`relative cursor-pointer  z-10 flex flex-col md:flex-row items-center justify-center gap-1 text-sm font-medium w-1/4 py-2 transition-all duration-200 rounded-full
              ${isActive ? "text-white" : "text-[var(--color-text-secondary)]"}`}
          >
            {/* ✅ Mobile view */}
            <span className="md:hidden">
              {isActive ? (
                // Show text if active
                <span className="text-xs font-medium">{tab.name}</span>
              ) : (
                // Otherwise show icon
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? "scale-110" : "scale-100"
                  }`}
                />
              )}
            </span>

            {/* ✅ Desktop view (always show icon + text) */}
            <span className="hidden md:flex items-center gap-1 cursor-pointer ">
              <Icon
                className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? "scale-110" : "scale-100"
                }`}
              />
              <span>{tab.name}</span>
            </span>
          </button>
        );
      })}

      {/* Sliding background indicator */}
      <div
        className="absolute cursor-pointer  top-0 left-0 h-full bg-[var(--color-primary-dark)] rounded-full transition-all duration-300"
        style={{
          width: `${100 / tabs.length}%`,
          transform: `translateX(${tabs.findIndex((tab) => tab.name === currentTab) * 100}%)`,
        }}
      />
    </div>
  );
};

export default TabNavigation;
