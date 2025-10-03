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
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="mb-12">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">EVENT SCHEDULE</h1>
                            <p className="text-gray-400 text-sm italic">Plan your festival experience</p>
                        </div>
                        <div className="bg-gradient-to-r from-amber-900/30 to-amber-800/30 border border-amber-700/50 rounded-full px-5 py-2.5 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-amber-500" />
                            <span className="text-sm font-medium">{selectedDate}</span>
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
                <div className="mt-12 bg-gradient-to-r from-red-950/30 to-gray-900/30 border border-red-900/30 rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-2 text-red-400">Event Information</h3>
                    <p className="text-gray-300 text-sm">
                        All times are local. Schedule subject to change. Check back regularly for updates.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Events;