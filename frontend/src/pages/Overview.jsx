import React, { useState, useEffect } from 'react';
import { CalendarIcon, PeopleIcon, AnalyticIcon } from '../assets/icons/icons';
import StatCard from '../components/shared/StatsCard';
import Badge from '../components/shared/Badge';
import { apiConnecter } from '../services/apiConnector';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import SearchBox from '../components/shared/SearchBox';
import { handleAnalyticsClick } from '../components/shared/AnalyticNavigatefunc';
import API_ENDPOINTS from '../data/EndPoints';
import IconButton from '../components/shared/IconButton';

const MAX_HEIGHT_CALC = 'max-h-[calc(100vh-380px)]';

const Overview = () => {
    const userInfo = useSelector((state) => state.userInfo);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [allEvents, setAllEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);
    const navigate = useNavigate();
    const [activeOrganizers, setActiveOrganizers] = useState(0);

    const getAllEventsHandler = async () => {
        setLoading(true);
        try {
            const response = await apiConnecter(
                'GET',
                API_ENDPOINTS.REACT_APP_GET_ALL_EVENTS_END_POINT,
                null,
                { authorization: `Bearer ${userInfo.token}` }
            );
            console.log('get all events api response', response);
            const events = response.data.result.map(event => ({
                id: event?._id || `event-${Math.random().toString(36).substr(2, 9)}`,
                event: event.eventName || 'Unnamed Event',
                date: event.eventStartDate
                    ? new Date(event.eventStartDate).toISOString().split('T')[0]
                    : 'N/A',
                status: event.status || 'Unknown',
                attendance: event.expectedAttendees || '0',
                taps: event.clickCount?.toLocaleString() || '0',
                // engagement: event.expectedAttendees > 0
                //     ? ((event.clickCount / event.expectedAttendees) * 100).toFixed(1) + '%'
                //     : '0.0%',
                engagement: event?.expectedAttendees
                    ? ((event.clickCount / event.expectedAttendees) * 100).toFixed(2)
                    : '0.00',
                location: event.location || 'N/A',
                braceletUrl: event.baseUrl || 'https://bracelet.example.com/default',
                destinationUrl: event.destinationUrl || 'https://example.com/default',
                postClick: event?.postEventClickCount
            }));

            setAllEvents(events);
            setFilteredEvents(events);

            // Calculate active organizers from the organizers array across all events
            const allOrganizers = response.data.result.flatMap(event => event.organizers || []);
            const uniqueActiveOrganizers = new Set(allOrganizers.map(org => org._id)).size;
            setActiveOrganizers(uniqueActiveOrganizers);
        } catch (err) {
            setError({ title: 'Error', message: err?.response?.data?.message ?? err.message });
        } finally {
            setLoading(false);
        }
    };

    // Handle search functionality
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredEvents(allEvents);
        } else {
            const filtered = allEvents.filter(event =>
                event.event.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredEvents(filtered);
        }
    }, [searchTerm, allEvents]);

    const totalAttendance = filteredEvents.reduce(
        (sum, event) => sum + parseInt(event.attendance || 0),
        0
    );
    const totalTaps = filteredEvents.reduce(
        (sum, event) => sum + parseInt(event.taps.replace(/,/g, '') || 0),
        0
    );
    const totalEngagement = totalAttendance > 0
        ? ((totalTaps / totalAttendance) * 100).toFixed(1) + '%'
        : '0.0%';

    // const handleAnalyticsClick = (eventId, taps, engagement) => {
    //     navigate(`/analytics/${eventId}`, {
    //         state: {
    //             totalTaps: taps,
    //             engagementRate: engagement
    //         }
    //     });
    // };
    // const handleAnalyticsClick = (eventId, taps, engagement, postClick, attendance) => {
    //     // console.log("-----Analyytaps", taps);
    //     // console.log("-----Analyytaps2", engagement);
    //     console.log("-----Analyytaps3", postClick);
    //     console.log("-----Analyytaps4", attendance);

    //     const tapsNum = Number(taps) || 0;
    //     const postClickNum = Number(postClick) || 0;
    //     // const engagementNum = Number(engagement) || 0;
    //     // const attendanceNum = Number(attendance) || 0;

    //     // rate in %
    //     // const postClickRate = tapsNum > 0 ? (postClickNum / tapsNum) * 100 : 0;
    //     // const postClickRate = tapsNum > 0 ? (tapsNum / postClickNum) * 100 : 0;
    //     const postClickRate = attendance > 0 ? ((postClickNum / attendance) * 100).toFixed(2) : 0;

    //     console.log("---------postRate", postClickRate);

    //     navigate(`/analytics/${eventId}`, {
    //         state: {
    //             totalTaps: tapsNum,
    //             engagementRate: engagement,
    //             postClickRate: `${postClickRate} % `, // e.g., 42.86
    //             // postClickCount: postClickNum,
    //             attendance: attendance,
    //         }
    //     });
    // };
    // handleAnalyticsClick(eventId, taps, engagement, postClick, attendance);
    useEffect(() => {
        getAllEventsHandler();
    }, []);

    return (
        <div className="text-white m-4 w-full">
            <main>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="md:text-2xl font-semibold text-white   text-xl ">Overview</h2>
                        <p className="text-[var(--color-grey)] text-sm mt-1">
                            Get a detailed summary of the event's performance and key metrics.
                        </p>
                    </div>
                    {/* <IconButton
                        icon={HiOutlineRefresh}
                        label="Refresh"
                        onClick={() => {

                        }}
                        hoverColor="hover:bg-orange-600"
                    /> */}
                </div>
                {/* <h2 className="text-2xl font-semibold text-white">Overview</h2>
                <p className="text-[var(--color-grey)] text-sm mt-1 mb-6">
                    Get a detailed summary of the event's performance and key metrics.
                </p> */}

                {/* Search Bar */}


                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard
                        title="Total Events"
                        value={filteredEvents.length.toString()}
                        icon={CalendarIcon}
                        description={`${filteredEvents.filter(event => event.status === 'Active').length} active`}
                    />
                    <StatCard
                        title="Total Attendance"
                        value={totalAttendance.toLocaleString()}
                        icon={PeopleIcon}
                        description="Across all events"
                    />
                    <StatCard
                        title="Total Taps"
                        value={totalTaps.toLocaleString()}
                        icon={AnalyticIcon}
                        description={`${totalEngagement} engagement rate`}
                    />
                    <StatCard
                        title="Active Organizers"
                        value={activeOrganizers.toString()}
                        icon={PeopleIcon}
                        description="Registered organizers"
                    />
                </div>

                {/* Recent Events */}
                <div className="space-y-4">
                    {/* Mobile / Tablet Cards */}
                    <div className="flex flex-col space-y-4 lg:hidden">
                        {loading ? (
                            // <div className="text-center text-gray-300">Loading...</div>
                            <div className='flex items-center justify-center w-full p-2 bg-[var(--color-surface-background)]'>
                                <div className="loader"></div>
                            </div>
                        ) : error ? (
                            <div className="text-center text-red-500">{error.message}</div>
                        ) : filteredEvents.length === 0 ? (
                            <div className="text-center text-gray-300">No events found</div>
                        ) : (
                            filteredEvents.slice(0, 3).map(event => (
                                <div
                                    key={event.id}
                                    className="bg-[var(--color-surface-background)] rounded-2xl border border-[var(--border-color)] p-4 shadow-md flex flex-col space-y-2"
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold truncate">{event.event}</h3>
                                        <Badge
                                            label={event.status}
                                            bgColor={
                                                event.status === 'Active'
                                                    ? 'bg-[#fafafa]'
                                                    : event.status === 'Completed'
                                                        ? 'bg-[#262626]'
                                                        : 'bg-transparent'
                                            }
                                            textColor={event.status === 'Active' ? 'text-black' : 'text-white'}
                                            borderColor={event.status === 'Upcoming' ? 'border-gray-700' : ''}
                                        />
                                    </div>

                                    <div className="text-gray-400 text-sm flex justify-between">
                                        <span>{event.date}</span>
                                        <span>{event.location}</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-white text-sm">
                                        <div>
                                            <div className="text-gray-400 text-xs">Attendance</div>
                                            <div className="font-semibold">{event.attendance}</div>
                                        </div>
                                        <div>
                                            <div className="text-gray-400 text-xs">Taps</div>
                                            <div className="font-semibold">{event.taps}</div>
                                        </div>
                                        <div>
                                            <div className="text-gray-400 text-xs">Engagement</div>
                                            <div className="font-semibold">{event.engagement + "%"}</div>
                                        </div>
                                        <div>
                                            <div className="text-gray-400 text-xs">Actions</div>
                                            <button
                                                className="text-[var(--color-primary-dark)] hover:text-orange-300 text-xs cursor-pointer"
                                                onClick={() =>
                                                    handleAnalyticsClick(event.id, event.taps, event.engagement, event?.postClick, event?.attendance, navigate)
                                                }
                                            >
                                                View Analytics
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col space-y-1 text-gray-400 text-xs mt-2 gap-2 flex-wrap">
                                        <span className='flex flex-wrap gap-2  items-center justify-start  xs:flex-col'>
                                            Bracelet URL:{' '}
                                            <a
                                                href={event.braceletUrl}
                                                target='_blank'
                                                className="bg-[var(--grey-button)] hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-xl text-xs cursor-pointer"
                                            >
                                                {event?.braceletUrl?.slice(0, 50) + "..."}
                                            </a>
                                        </span>
                                        <span className='flex flex-wrap gap-2 items-center justify-start  xs:flex-col'>
                                            Destination URL:{' '}
                                            <a
                                                href={event.destinationUrl}
                                                target='_blank'
                                                className="bg-[var(--grey-button)] hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-xl text-xs cursor-pointer"
                                            >
                                                {event.destinationUrl}
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Desktop / Large Table */}
                    <div
                        className={`hidden lg:block bg-[var(--color-surface-background)] rounded-2xl border border-[var(--border-color)] p-5 overflow-x-auto max-h-[290px] custom-scrollbar ${MAX_HEIGHT_CALC}`}
                    >
                        <h3 className="text-md text-white mb-1">Recent Events</h3>
                        <p className="text-[var(--color-grey)] text-sm mb-3">
                            Latest SparkMotion events and their performance
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full table-fixed border-collapse">
                                <thead className="bg-[var(--color-surface-background)] sticky top-0 ">
                                    <tr className='border-b border-[var(--border-color)] hover:bg-gray-750"'>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-active)] w-1/4">
                                            Event
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-active)] w-1/6">
                                            Date
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-active)] w-1/6">
                                            Status
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-active)] w-1/6">
                                            Attendance
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-active)] w-1/6">
                                            Taps
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-active)] w-1/6">
                                            Engagement
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-active)] w-1/6">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="overflow-y-auto">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="7" className="py-4 px-6 text-center text-gray-300">
                                                <div className="loader"></div>
                                            </td>
                                        </tr>
                                    ) : error ? (
                                        <tr>
                                            <td colSpan="7" className="py-4 px-6 text-center text-red-500">
                                                {error.message}
                                            </td>
                                        </tr>
                                    ) : filteredEvents.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="py-4 px-6 text-center text-gray-300">
                                                No events found
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredEvents.slice(0, 3).map(event => (
                                            <tr
                                                key={event.id}
                                                className="border-b border-[var(--border-color)] hover:bg-gray-750"
                                            >
                                                <td className="py-4 px-4 text-white font-medium">{event.event}</td>
                                                <td className="py-4 px-4 text-gray-300">{event.date}</td>
                                                <td className="py-4 px-4">
                                                    <Badge
                                                        label={event.status}
                                                        bgColor={
                                                            event.status === 'Active'
                                                                ? 'bg-[#fafafa]'
                                                                : event.status === 'Completed'
                                                                    ? 'bg-[#262626]'
                                                                    : 'bg-transparent'
                                                        }
                                                        textColor={event.status === 'Active' ? 'text-black' : 'text-white'}
                                                        borderColor={event.status === 'Upcoming' ? 'border-gray-700' : ''}
                                                    />
                                                </td>
                                                <td className="py-4 px-4 text-gray-300">{event.attendance}</td>
                                                <td className="py-4 px-4 text-gray-300">{event.taps}</td>
                                                <td className="py-4 px-4 text-gray-300">{`${event.engagement}%`}</td>

                                                <td className="py-4 px-4 ">
                                                    <button
                                                        className="text-[var(--color-primary-dark)] hover:text-orange-300 text-sm cursor-pointer"
                                                        onClick={() =>
                                                            handleAnalyticsClick(event.id, event.taps, event.engagement, event?.postClick, event?.attendance, navigate)
                                                        }
                                                    >
                                                        View Analytics
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Overview;