import React from 'react';

// Reusable InfoCard Component
const InfoCard = ({ icon: Icon, title, description }) => (
    <div className="backdrop-blur-2xl    border-[2px] border-color rounded-2xl p-6 hover:border-red-500/50 transition-all cursor-pointer flex gap-2 items-center">
        <Icon className="w-8 h-8 text-red-500 " />
        <div>
            <h3 className="text-lg md:text-xl font-bold text-white ">{title}</h3>
            <p className="text-gray-400 text-sm">{description}</p>
        </div>

    </div>
);

export default InfoCard;
