// EventCard.js
import React from 'react';

import { IoLocationOutline } from "react-icons/io5";
import IconButton from './IconButton';
import ActionButton from './ActionButton';
import { AnalyticIcon, CalendarIcon, LinkIcon, SettingsIcon } from '../../assets/icons/icons';
import { IoSettingsOutline } from "react-icons/io5";

import Badge from './Badge';
const EventCard = ({ event }) => {
    return (
        <div className="bg-[var(--color-surface-background)] rounded-2xl border border-[var(--border-color)] p-6">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                    <Badge label={event.status} bgColor={event.status === 'Active' ? 'bg-[#fafafa]' : 'bg-[#262626]'} textColor={event.status === 'Active' ? 'text-black' : 'text-[#fafafa]'} />
                </div>
                <div className="flex items-center space-x-2">
                    <IconButton
                        icon={AnalyticIcon}
                        label="Analytics"
                        onClick={() => alert('Analytics clicked')}
                        hoverColor="hover:bg-gray-600"
                        bgColor="bg-[var(--color-surface-background)]"
                        border={true}
                    />
                    <IconButton
                        icon={IoSettingsOutline}
                        label="Edit"
                        onClick={() => alert('Edit clicked')}
                        hoverColor="hover:bg-gray-600"
                        bgColor="bg-[var(--color-surface-background)]"
                        border={true}
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center space-x-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <span><IoLocationOutline /></span>
                    <span>{event.location}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                <div>
                    <div className="text-gray-400 text-sm mb-1">Attendance</div>
                    <div className="text-white text-xl font-semibold">{event.attendance}</div>
                </div>
                <div>
                    <div className="text-gray-400 text-sm mb-1">Total Taps</div>
                    <div className="text-white text-xl font-semibold">{event.taps}</div>
                </div>
                <div>
                    <div className="text-gray-400 text-sm mb-1">Engagement Rate</div>
                    <div className="text-white text-xl font-semibold">{event.engagementRate}</div>
                </div>
                <div>
                    <div className="text-gray-400 text-sm mb-1">Organizer</div>
                    <div className="text-white text-sm">{event.organizer}</div>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-400 flex gap-1 items-center"><LinkIcon /> Bracelet URL:</span>
                    <ActionButton label={event.braceletUrl} onClick={() => alert('Bracelet URL clicked')} />
                </div>
                <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-400 flex gap-1 items-center"><LinkIcon /> Destination URL:</span>
                    <ActionButton label={event.destinationUrl} onClick={() => alert('Destination URL clicked')} />
                </div>
            </div>
        </div>
    );
};

export default EventCard;
