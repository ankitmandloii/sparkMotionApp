// import React from 'react'

// const OrganizerDashboard = () => {
//     return (
//         <div className='bg-yellow-500'>OrganizerDashboard</div>
//     )
// }

// export default OrganizerDashboard

import React, { useEffect, useState } from 'react';
import { AnalyticIcon, PlusIcon, SettingsIcon } from '../assets/icons/icons';
import IconButton from '../components/shared/IconButton';
import EventCardOrganizer from '../components/shared/EventCardOrganizer';
import { apiConnecter } from '../services/apiConnector';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { DownloadIcon } from 'lucide-react';
import { exportEventAsCSV } from '../components/shared/exportEventAsCSV';
import API_ENDPOINTS from '../data/EndPoints';


// const eventsData = [
//     {
//         title: "Summer Music Festival 2024",
//         status: "Active",
//         date: "2024-06-15",
//         location: "Austin, TX",
//         attendance: "25,000",
//         taps: "18,750",
//         engagementRate: "75.0%",
//         organizer: "organizer@event.com",
//         braceletUrl: "https://r.sparkmotion.app/smf2024",
//         destinationUrl: "https://summerfest.com/engage",
//         analyticsIcon: '', // Replace with actual icon
//     },
//     {
//         title: "Charity Gala 2024",
//         status: "Completed",
//         date: "2024-05-20",
//         location: "New York, NY",
//         attendance: "500",
//         taps: "425",
//         engagementRate: "85.0%",
//         organizer: "organizer@event.com",
//         braceletUrl: "https://r.sparkmotion.app/gala2024",
//         destinationUrl: "https://charitygala.org/donate",
//         editIcon: 'EditIcon', // Replace with actual icon
//     },
//     // Add more events here...
// ];

const OrganizerDashboard = () => {
    const [eventsData, setEventData] = useState([]);
    const userInfo = useSelector((state) => state.userInfo)
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [allEvents, setAllEvents] = useState([]);
    const [eventToUpdate, setEventToUpdate] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);
    const navigate = useNavigate();
    const getAllEventsDataHandler = async () => {
        setLoading(true);
        try {
            console.log(userInfo);

            const response = await apiConnecter("GET", `${API_ENDPOINTS.REACT_APP_GET_ORGANIZER_EVENTS_BY_ID_END_POINT}/${userInfo.user.id}`,
                null, { authorization: `Bearer ${userInfo.token}` });
            console.log("get all events api response", response);
            // setSuccess(response.data.message);
            setEventData(response.data.result);
            setFilteredEvents(response.data.result);
        } catch (err) {
            setError({ title: "Error", message: err?.response?.data?.message ?? err.message });
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getAllEventsDataHandler()
    }, [])
    function handleExportall() {
        exportEventAsCSV(eventsData)
    }
    return (
        <div className='flex flex-col w-full m-5'>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <div>
                    <h2 className="text-2xl font-semibold text-white">Your Events</h2>
                    <p className="text-gray-400 text-sm mt-1">View analytics and manage your assigned SparkMotion events</p>
                </div>
                <IconButton
                    icon={DownloadIcon}
                    label="Export All"
                    onClick={handleExportall}
                    hoverColor="hover:bg-gray-600"
                    bgColor="bg-[var(--color-surface-background)]"
                    border={true}
                // disabled={loading}
                />
            </div>

            {/* Scrollable container for event cards */}
            <div className="space-y-6 overflow-y-auto  custom-scrollbar">
                {
                    loading ? (
                        <div className="text-center py-4 bg-[var(--color-surface-background)]">
                            <div className="loader"></div>
                        </div>
                    ) : (
                        eventsData?.map((event, index) => (
                            <EventCardOrganizer key={index} event={event} userInfo={userInfo} getAllEventsDataHandler={getAllEventsDataHandler} />
                        ))
                    )
                }
                {
                    !loading && eventsData?.length == 0 && <>
                        <div className="text-center text-[var(--color-text-secondary)]   py-4 bg-[var(--color-surface-background)]">
                            <p className="">No events assigned.</p>
                        </div>
                    </>
                }


            </div>
        </div>
    );
};

export default OrganizerDashboard;

