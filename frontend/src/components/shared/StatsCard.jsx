import React from 'react';

const StatCard = ({ title, value, icon: Icon, description }) => {
    return (
        <div className="bg-[var(--color-surface-background)] rounded-2xl p-3 border border-[var(--border-color)]">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
                {Icon && <Icon className="w-6 h-6" />}
            </div>
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            <p className="text-gray-400 text-sm">{description}</p>
        </div>
    );
};

export default StatCard;
