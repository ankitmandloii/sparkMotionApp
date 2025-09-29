import React ,{useState,useEffect}from 'react';
import { CalendarIcon, PeopleIcon, AnalyticIcon } from '../assets/icons/icons';
import StatCard from '../components/shared/StatsCard';
import Badge from '../components/shared/Badge';
import ActionButton from '../components/shared/ActionButton';
import { apiConnecter } from '../services/apiConnector';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
const MAX_HEIGHT_CALC = 'max-h-[calc(100vh-360px)]';

const tableData = [
    {
        event: "Summer Music Festival 2024",
        date: "2024-06-15",
        status: "Active",
        attendance: "25,000",
        taps: "18,750",
        engagement: "75.0%",
        location: "New York",
        braceletUrl: "https://bracelet.example.com/1",
        destinationUrl: "https://example.com/landing1"
    },
    {
        event: "Charity Gala 2024",
        date: "2024-05-20",
        status: "Completed",
        attendance: "500",
        taps: "425",
        engagement: "85.0%",
        location: "Los Angeles",
        braceletUrl: "https://bracelet.example.com/2",
        destinationUrl: "https://example.com/landing2"
    },
    {
        event: "Tech Conference 2024",
        date: "2024-07-10",
        status: "Upcoming",
        attendance: "5,000",
        taps: "0",
        engagement: "0.0%",
        location: "San Francisco",
        braceletUrl: "https://bracelet.example.com/3",
        destinationUrl: "https://example.com/landing3"
    },
    {
        event: "Tech Conference 2024",
        date: "2024-07-10",
        status: "Upcoming",
        attendance: "5,000",
        taps: "0",
        engagement: "0.0%",
        location: "San Francisco",
        braceletUrl: "https://bracelet.example.com/3",
        destinationUrl: "https://example.com/landing3"
    },
    {
        event: "Tech Conference 2024",
        date: "2024-07-10",
        status: "Upcoming",
        attendance: "5,000",
        taps: "0",
        engagement: "0.0%",
        location: "San Francisco",
        braceletUrl: "https://bracelet.example.com/3",
        destinationUrl: "https://example.com/landing3"
    },
    {
        event: "Tech Conference 2024",
        date: "2024-07-10",
        status: "Upcoming",
        attendance: "5,000",
        taps: "0",
        engagement: "0.0%",
        location: "San Francisco",
        braceletUrl: "https://bracelet.example.com/3",
        destinationUrl: "https://example.com/landing3"
    },
    {
        event: "Tech Conference 2024",
        date: "2024-07-10",
        status: "Upcoming",
        attendance: "5,000",
        taps: "0",
        engagement: "0.0%",
        location: "San Francisco",
        braceletUrl: "https://bracelet.example.com/3",
        destinationUrl: "https://example.com/landing3"
    },
    {
        event: "Tech Conference 2024",
        date: "2024-07-10",
        status: "Upcoming",
        attendance: "5,000",
        taps: "0",
        engagement: "0.0%",
        location: "San Francisco",
        braceletUrl: "https://bracelet.example.com/3",
        destinationUrl: "https://example.com/landing3"
    },
    {
        event: "Tech Conference 2024",
        date: "2024-07-10",
        status: "Upcoming",
        attendance: "5,000",
        taps: "0",
        engagement: "0.0%",
        location: "San Francisco",
        braceletUrl: "https://bracelet.example.com/3",
        destinationUrl: "https://example.com/landing3"
    },
    {
        event: "Tech Conference 2024",
        date: "2024-07-10",
        status: "Upcoming",
        attendance: "5,000",
        taps: "0",
        engagement: "0.0%",
        location: "San Francisco",
        braceletUrl: "https://bracelet.example.com/3",
        destinationUrl: "https://example.com/landing3"
    },
];
const Overview = () => {
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
    const getAllEventsHandler = async () => {
        setLoading(true);
        try {
            const response = await apiConnecter("GET", process.env.REACT_APP_GET_ALL_EVENTS_END_POINT,
                null, { authorization: `Bearer ${userInfo.token}` });
            console.log("get all events api response", response);
            // setSuccess(response.data.message);
            setAllEvents(response.data.result);
            setFilteredEvents(response.data.result);
        } catch (err) {
            setError({ title: "Error", message: err?.response?.data?.message ?? err.message });
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getAllEventsHandler()
    }, [])
    return (
        <div className="text-white m-4 w-full">
            <main>
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard title="Total Events" value="3" icon={CalendarIcon} description="1 active" />
                    <StatCard title="Total Attendance" value="30,500" icon={PeopleIcon} description="Across all events" />
                    <StatCard title="Total Taps" value="19,175" icon={AnalyticIcon} description="82.9% engagement rate" />
                    <StatCard title="Active Organizers" value="3" icon={PeopleIcon} description="Registered organizers" />
                </div>

                {/* Recent Events */}
                <div className="space-y-4">

                    {/* Mobile / Tablet Cards */}
                    <div className="flex flex-col space-y-4 lg:hidden">
                        {tableData.map((event, idx) => (
                            <div key={idx} className="bg-[var(--color-surface-background)] rounded-2xl border border-[var(--border-color)] p-4 shadow-md flex flex-col space-y-2">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold truncate">{event.event}</h3>
                                    <Badge
                                        label={event.status}
                                        bgColor={event.status === "Active" ? "bg-[#fafafa]" : event.status === "Completed" ? "bg-[#262626]" : "bg-transparent"}
                                        textColor={event.status === "Active" ? "text-black" : "text-white"}
                                        borderColor={event.status === "Upcoming" ? "border-gray-700" : ""}
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
                                        <div className="font-semibold">{event.engagement}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-xs">Actions</div>

                                        <button className="text-[var(--color-primary-dark)] hover:text-orange-300 text-xs">View Analytics</button>
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-1 text-gray-400 text-xs mt-2 gap-2">
                                    <span>Bracelet URL: <a href={event.braceletUrl} className="bg-[var(--grey-button)] hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-xl text-xs cursor-pointer">{event.braceletUrl}</a></span>
                                    <span>Destination URL: <a href={event.destinationUrl} className="bg-[var(--grey-button)] hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-xl text-xs cursor-pointer">{event.destinationUrl}</a></span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop / Large Table */}
                    <div className={`hidden lg:block bg-[var(--color-surface-background)] rounded-2xl border border-[var(--border-color)] p-3 overflow-x-auto max-h-[290px] custom-scrollbar   ${MAX_HEIGHT_CALC}`}>
                        <h3 className="text-md text-white mb-1">Recent Events</h3>
                        <p className="text-[var(--color-grey)] text-sm mb-3">Latest SparkMotion events and their performance</p>
                        <div className="overflow-x-auto">
                            <table className="w-full table-fixed border-collapse">
                                <thead className="bg-[var(--color-surface-background)] sticky top-0">
                                    <tr>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-active)] w-1/4">Event</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-active)] w-1/6">Date</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-active)] w-1/6">Status</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-active)] w-1/6">Attendance</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-active)] w-1/6">Taps</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-active)] w-1/6">Engagement</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-active)] w-1/6">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((event, idx) => (
                                        <tr key={idx} className="border-b border-[var(--border-color)] hover:bg-gray-750">
                                            <td className="py-3 px-4 text-white font-medium">{event.event}</td>
                                            <td className="py-3 px-4 text-gray-300">{event.date}</td>
                                            <td className="py-3 px-4">
                                                <Badge
                                                    label={event.status}
                                                    bgColor={event.status === "Active" ? "bg-[#fafafa]" : event.status === "Completed" ? "bg-[#262626]" : "bg-transparent"}
                                                    textColor={event.status === "Active" ? "text-black" : "text-white"}
                                                    borderColor={event.status === "Upcoming" ? "border-gray-700" : ""}
                                                />
                                            </td>
                                            <td className="py-3 px-4 text-gray-300">{event.attendance}</td>
                                            <td className="py-3 px-4 text-gray-300">{event.taps}</td>
                                            <td className="py-3 px-4 text-gray-300">{event.engagement}</td>
                                            <td className="py-3 px-4">
                                                <button className="text-[var(--color-primary-dark)] hover:text-orange-300 text-sm">View Analytics</button>
                                            </td>
                                        </tr>
                                    ))}
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
