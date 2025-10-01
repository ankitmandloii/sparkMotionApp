// src/components/shared/NoDataFound.jsx
import React from 'react';
import { BarChart3, Clock, Zap } from 'lucide-react'; // Example icons

const NoDataFound = ({ title, icon: IconComponent = Zap, message, height = 'h-64' }) => {
    return (
        <div className={`${height} flex flex-col items-center justify-center p-4 text-center bg-[var(--color-surface-background)] border border-[var(--border-color)] transition-all duration-300`}>
            <div className="p-3 mb-4 rounded-full bg-gray-700/70 text-orange-400 animate-pulse-slow">
                <IconComponent className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">{title}</h4>
            <p className="text-gray-400 text-sm max-w-sm">{message}</p>
        </div>
    );
};

export default NoDataFound;