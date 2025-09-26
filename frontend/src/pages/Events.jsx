import React from 'react';
import EventCard from '../components/shared/EventCard';
import { AnalyticIcon, PlusIcon, SettingsIcon } from '../assets/icons/icons';
import IconButton from '../components/shared/IconButton';
import { useNavigate } from 'react-router';

const eventsData = [
    {
        title: "Summer Music Festival 2024",
        status: "Active",
        date: "2024-06-15",
        location: "Austin, TX",
        attendance: "25,000",
        taps: "18,750",
        engagementRate: "75.0%",
        organizer: "organizer@event.com",
        braceletUrl: "https://r.sparkmotion.app/smf2024",
        destinationUrl: "https://summerfest.com/engage",
        analyticsIcon: '', // Replace with actual icon
    },
    {
        title: "Charity Gala 2024",
        status: "Completed",
        date: "2024-05-20",
        location: "New York, NY",
        attendance: "500",
        taps: "425",
        engagementRate: "85.0%",
        organizer: "organizer@event.com",
        braceletUrl: "https://r.sparkmotion.app/gala2024",
        destinationUrl: "https://charitygala.org/donate",
        editIcon: 'EditIcon', // Replace with actual icon
    },
    // Add more events here...
];

const Events = () => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col w-full m-5'>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-semibold text-white">Events</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage SparkMotion events and bracelet configurations</p>
                </div>
                <IconButton
                    icon={PlusIcon}
                    label="Create Event"
                    onClick={() => navigate("/events/createEvent")}
                    hoverColor="hover:bg-orange-600"
                />
            </div>

            {/* Scrollable container for event cards */}
            <div className="space-y-6 overflow-y-auto max-h-[420px] no-scrollbar">
                {eventsData.map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
            </div>
        </div>
    );
};

export default Events;
