import React, { useState } from 'react';
import { Clock, MapPin, Calendar } from 'lucide-react';
import { Button } from '../components/shared/Button';
import { EventCard } from '../components/shared/EventCard';

// Reusable Button Component


// Reusable Event Card Component


// Main Event Schedule Page Component
function Events() {
    const [selectedDate, setSelectedDate] = useState('Sept 7, 2025 (Saturday)');

    const events = [
        {
            id: 1,
            artist: 'CAV EIRE',
            time: '7:00 PM - 7:45 PM',
            stage: 'Main Stage'
        },
        {
            id: 2,
            artist: 'EYEBOLT',
            time: '8:00 PM - 9:00 PM',
            stage: 'Electronic Stage'
        },
        {
            id: 3,
            artist: 'HENRY ZOELLNER',
            time: '9:00 PM - 9:45 PM',
            stage: 'Main Stage'
        },
        {
            id: 4,
            artist: 'MINGO DRIVE',
            time: '10:00 PM - 10:30 PM',
            stage: 'Acoustic Stage'
        }
    ];

    const handleRemind = (artistName) => {
        alert(`Reminder set for ${artistName}!`);
    };

    return (
        <div className="min-h-screen  text-white py-8   px-4 md:px-14 w-full">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-12">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold ">EVENT SCHEDULE</h1>
                            <p className="color-text-base text-sm italic">Plan your festival experience</p>
                        </div>
                        <div className=" use-border rounded-full px-5 py-2.5 flex items-center gap-2 color-primary-background">
                            <Calendar className="w-4 h-4 text-[var(--text-yellow)]" />
                            <span className="text-sm font-medium text-[var(--text-yellow)]">{selectedDate}</span>
                        </div>
                    </div>
                </div>

                {/* Event Cards */}
                <div className="space-y-4">
                    {events.map((event) => (
                        <EventCard
                            key={event.id}
                            artist={event.artist}
                            time={event.time}
                            stage={event.stage}
                            onRemind={() => handleRemind(event.artist)}
                        />
                    ))}
                </div>

                {/* Additional Info Section */}

            </div>
        </div>
    );
}

export default Events;