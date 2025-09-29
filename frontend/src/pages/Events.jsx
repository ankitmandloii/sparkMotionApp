// import React, { useEffect, useState } from 'react';
// import EventCard from '../components/shared/EventCard';
// import { AnalyticIcon, PlusIcon, SettingsIcon } from '../assets/icons/icons';
// import IconButton from '../components/shared/IconButton';
// import { useNavigate } from 'react-router';
// import CreateEventForm from '../components/forms/CreateEventForm';
// import { apiConnecter } from '../services/apiConnector';
// import { useSelector } from 'react-redux';
// import Modal from '../components/shared/ErrorModal';
// import SearchBox from '../components/shared/SearchBox';


// const MAX_HEIGHT_CALC = 'max-h-[calc(100vh-330px)]';
// const Events = () => {
//     const userInfo = useSelector((state) => state.userInfo)
//     const [showForm, setShowForm] = useState(false);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [fieldErrors, setFieldErrors] = useState({});
//     const [allEvents, setAllEvents] = useState([]);
//     const [eventToUpdate, setEventToUpdate] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filteredEvents, setFilteredEvents] = useState([]);
//     const navigate = useNavigate();

//     const getAllEventsHandler = async () => {
//         setLoading(true);
//         try {
//             const response = await apiConnecter("GET", process.env.REACT_APP_GET_ALL_EVENTS_END_POINT,
//                 null, { authorization: `Bearer ${userInfo.token}` });
//             console.log("get all events api response", response);
//             // setSuccess(response.data.message);
//             setAllEvents(response.data.result);
//             setFilteredEvents(response.data.result);
//         } catch (err) {
//             setError({ title: "Error", message: err?.response?.data?.message ?? err.message });
//         } finally {
//             setLoading(false);
//         }
//     };
//     useEffect(() => {
//         getAllEventsHandler()
//     }, [])
//     useEffect(() => {
//         if (error) {
//             Modal({
//                 title: error.title || "Error",
//                 message: error.message,
//             });
//         }
//         if (success) {
//             Modal({
//                 title: success.title || "Success",
//                 message: success.message,
//             });

//         }

//         setTimeout(() => {
//             setSuccess('');
//             setError('');
//         }, 3000);
//     }, [error, success,]);

//     useEffect(() => {
//         if (searchTerm.trim() === '') {
//             setFilteredEvents(allEvents);
//         } else {
//             const lowerSearch = searchTerm.toLowerCase();

//             const filtered = allEvents.filter(event => {
//                 // Organizer matching (for multiple organizers)
//                 const organizerMatch = event.organizers?.some(org =>
//                     org.userName?.toLowerCase().includes(lowerSearch) ||
//                     org.email?.toLowerCase().includes(lowerSearch)
//                 );

//                 // Field matching
//                 const matchEventName = event.eventName?.toLowerCase().includes(lowerSearch);
//                 const matchLocation = event.location?.toLowerCase().includes(lowerSearch);
//                 const matchStatus = event.status?.toLowerCase().includes(lowerSearch); // ✅ added status

//                 // Return true if any match
//                 return matchEventName || organizerMatch || matchLocation || matchStatus;
//             });

//             setFilteredEvents(filtered);
//         }
//     }, [searchTerm, allEvents]);


//     return (
//         <div className='flex flex-col w-full m-5'>
//             <div className="flex items-center justify-between mb-6">
//                 <div className='pr-4 '>
//                     <h2 className="text-2xl font-semibold text-white">Events</h2>
//                     <p className="text-gray-400 text-sm mt-1">Manage SparkMotion events and bracelet configurations</p>
//                 </div>
//                 <IconButton
//                     icon={PlusIcon}
//                     label="Create Event"
//                     onClick={() => {
//                         setShowForm(true)
//                         setEventToUpdate(null);
//                     }}
//                     hoverColor="hover:bg-orange-600"
//                 />
//             </div>
//             <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search by name, location, status, or organizer..." />
//             {/* Scrollable container for event cards */}
//             <div className={`space-y-6 overflow-y-auto ${MAX_HEIGHT_CALC} custom-scrollbar pr-2`}>
//                 {filteredEvents?.map((event, index) => (
//                     <EventCard key={index} event={event} onEdit={() => {
//                         setEventToUpdate(event);
//                         setShowForm(true);
//                     }} />
//                 ))}
//                 {filteredEvents?.length === 0 && !loading && <p className='text-[var(--color-text-secondary)]  text-center p-5 bg-[var(--color-surface-background)] rounded-md '>No events found. Please create an event.</p>}
//                 {loading && <div className=" text-center py-4 bg-[var(--color-surface-background)] rounded-md">
//                     <div className="loader"></div> {/* Add your loader component here */}
//                 </div>}
//             </div>
//             {showForm && <CreateEventForm setShowForm={setShowForm} eventToUpdate={eventToUpdate} onCancel={() => setShowForm(false)} setSuccess={setSuccess} setError={setError} setAllEvents={setAllEvents} />}
//         </div>
//     );
// };

// export default Events;
import React, { useEffect, useState } from 'react';
import EventCard from '../components/shared/EventCard';
import { AnalyticIcon, PlusIcon, SettingsIcon } from '../assets/icons/icons';
import IconButton from '../components/shared/IconButton';
import { useNavigate } from 'react-router';
import CreateEventForm from '../components/forms/CreateEventForm';
import { apiConnecter } from '../services/apiConnector';
import { useSelector } from 'react-redux';
import Modal from '../components/shared/ErrorModal';
import SearchBox from '../components/shared/SearchBox';
import InfiniteScroll from 'react-infinite-scroll-component';

const MAX_HEIGHT_CALC = 'max-h-[calc(100vh-280px)]';
const Events = () => {
    const userInfo = useSelector((state) => state.userInfo);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [allEvents, setAllEvents] = useState([]);
    const [eventToUpdate, setEventToUpdate] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();

    const getAllEventsHandler = async (pageNum = 1, append = false) => {
        setLoading(true);
        try {
            const response = await apiConnecter("GET", `${process.env.REACT_APP_GET_ALL_EVENTS_END_POINT}?page=${pageNum}&limit=2`,
                null, { authorization: `Bearer ${userInfo.token}` });
            console.log("get all events api response", response);
            const newEvents = response.data.result;
            if (append) {
                setAllEvents(prev => [...prev, ...newEvents]);
                setFilteredEvents(prev => [...prev, ...newEvents]);
            } else {
                setAllEvents(newEvents);
                setFilteredEvents(newEvents);
            }
            setHasMore(newEvents.length === 2); // If we get full page (2 items), there might be more
        } catch (err) {
            setError({ title: "Error", message: err?.response?.data?.message ?? err.message });
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    const loadMoreEvents = () => {
        setPage(prev => {
            const nextPage = prev + 1;
            getAllEventsHandler(nextPage, true);
            return nextPage;
        });
    };

    useEffect(() => {
        getAllEventsHandler();
    }, []);

    useEffect(() => {
        if (error) {
            Modal({
                title: error.title || "Error",
                message: error.message,
            });
        }
        if (success) {
            Modal({
                title: success.title || "Success",
                message: success.message,
            });
        }

        setTimeout(() => {
            setSuccess('');
            setError('');
        }, 3000);
    }, [error, success]);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredEvents(allEvents);
        } else {
            const lowerSearch = searchTerm.toLowerCase();

            const filtered = allEvents.filter(event => {
                // Organizer matching (for multiple organizers)
                const organizerMatch = event.organizers?.some(org =>
                    org.userName?.toLowerCase().includes(lowerSearch) ||
                    org.email?.toLowerCase().includes(lowerSearch)
                );

                // Field matching
                const matchEventName = event.eventName?.toLowerCase().includes(lowerSearch);
                const matchLocation = event.location?.toLowerCase().includes(lowerSearch);
                const matchStatus = event.status?.toLowerCase().includes(lowerSearch); // ✅ added status

                // Return true if any match
                return matchEventName || organizerMatch || matchLocation || matchStatus;
            });

            setFilteredEvents(filtered);
        }
    }, [searchTerm, allEvents]);

    return (
        <div className='flex flex-col w-full m-5'>
            <div className="flex items-center justify-between mb-6">
                <div className='pr-4 '>
                    <h2 className="text-2xl font-semibold text-white">Events</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage SparkMotion events and bracelet configurations</p>
                </div>
                <IconButton
                    icon={PlusIcon}
                    label="Create Event"
                    onClick={() => {
                        setShowForm(true);
                        setEventToUpdate(null);
                    }}
                    hoverColor="hover:bg-orange-600"
                />
            </div>
            {/* <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search by name, location, status, or organizer..." /> */}
            <div id="scrollableDiv" className={`overflow-y-auto ${MAX_HEIGHT_CALC} custom-scrollbar pr-2`}>
                {loading && filteredEvents.length === 0 && (
                    <div className="text-center py-4 bg-[var(--color-surface-background)] rounded-md">
                        <div className="loader"></div>
                    </div>
                )}
                <InfiniteScroll
                    dataLength={filteredEvents.length}
                    next={loadMoreEvents}
                    hasMore={hasMore}
                    loader={<div className="text-center py-4 bg-[var(--color-surface-background)] rounded-md">
                        <div className="loader"></div>
                    </div>}
                    scrollableTarget="scrollableDiv"
                >
                    {filteredEvents?.map((event, index) => (
                        <EventCard key={index} event={event} onEdit={() => {
                            setEventToUpdate(event);
                            setShowForm(true);
                        }} />
                    ))}
                    {filteredEvents?.length === 0 && !loading && (
                        <p className='text-[var(--color-text-secondary)] text-center p-5 bg-[var(--color-surface-background)] rounded-md'>
                            No events found. Please create an event.
                        </p>
                    )}
                </InfiniteScroll>
            </div>
            {showForm && <CreateEventForm setShowForm={setShowForm} eventToUpdate={eventToUpdate} onCancel={() => setShowForm(false)} setSuccess={setSuccess} setError={setError} setAllEvents={setAllEvents} />}
        </div>
    );
};

export default Events;