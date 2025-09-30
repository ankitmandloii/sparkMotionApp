import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import logo from '../../assets/logos/sparkMotionLogo.png'
import Modal from '../../components/shared/ErrorModal';
import { apiConnecter } from '../../services/apiConnector';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import API_ENDPOINTS from '../../data/EndPoints';

// A simple placeholder logo component. You can replace this with your actual logo.
const SparkMotionLogo = () => (
    <img src={logo} className='mb-3 w-[160px] h-[50px]'></img>
);


const CreateEventForm = ({ setShowForm, eventToUpdate = null, onCancel, setSuccess, setError, setAllEvents, getAllEventsHandler }) => {
    // State for all form fields
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.userInfo)
    const [organizersList, setOrganizersList] = useState([]);
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [expectAttendance, setExpectAttendance] = useState('');
    const [location, setLocation] = useState('');
    const [baseUrl, setBaseUrl] = useState(process.env.REACT_APP_CLICK_BASE_URL_END_POINT);
    const [destinationUrl, setDestinationUrl] = useState('');
    const [organizer, setOrganizer] = useState('');
    const [utmSource, setUtmSource] = useState('');
    const [utmMedium, setUtmMedium] = useState('');
    const [utmCampaign, setUtmCampaign] = useState('');
    const [utmTerm, setUtmTerm] = useState('');
    const [utmContent, setUtmContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedOrganizer, setSelectedOrganizer] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOrganizers, setFilteredOrganizers] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isDropdownVisibleStatus, setIsDropdownVisibleStatus] = useState(false)
    const [fieldErrors, setFieldErrors] = useState({});
    const organizerInputRef = useRef(null);
    const eventNameRef = useRef(null);
    const eventDateRef = useRef(null);
    const expectAttendanceRef = useRef(null);
    const locationRef = useRef(null);
    const baseUrlRef = useRef(null);
    const destinationUrlRef = useRef(null);
    const organizerRef = useRef(null);
    const statusRef = useRef(null)
    const eventEndDateRef = useRef(null);
    const allStatus = ["Active", "Completed", "Upcoming"]
    const [status, setStatus] = useState(eventToUpdate?.status ?? "Upcoming"); // Default to 'active'


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (organizerInputRef.current && !organizerInputRef.current.contains(event.target)) {
                setIsDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelectOrganizer = (organizer) => {
        setSelectedOrganizer(organizer);
        setSearchTerm(organizer.name); // Set the input value to the selected name
        setIsDropdownVisible(false); // Hide the dropdown
        setFieldErrors({ ...fieldErrors, organizer: null }); // Clear any errors
    };

    const handleInputChange = (e) => {
        // setFilteredOrganizers(organizersList.filter((o) => o?.userName?.startsWith(e.target.value)))
        setFilteredOrganizers(organizersList.filter((o) => {
            const regex = new RegExp(e.target.value, 'i'); // 'i' for case-insensitive match
            return regex.test(o?.userName);
        }));
        setSearchTerm(e.target.value);
        setIsDropdownVisible(true);
        setOrganizer(e.target.value)
        setSelectedOrganizer(null); // Clear selected organizer when typing
    };

    const handleInputFocus = () => {
        setIsDropdownVisible(true);
    };
    const createEventHandler = async (data) => {
        delete data.status;

        setLoading(true);
        // Simulate an API call with a delay
        try {
            const response = await apiConnecter("POST", API_ENDPOINTS.REACT_APP_CREATE_EVENTS_END_POINT, data, { authorization: `Bearer ${userInfo.token}` });
            console.log("data from server", response.data)
            setSuccess({ title: "Success", message: response.data.message });
            getAllEventsHandler();
            // setAllEvents(prevEvents => [...prevEvents, response.data.result]); // Append the new event to the existing list
            onCancel();
        } catch (err) {
            setError({ title: "Error", message: err?.response?.data?.message ?? err.message });
        } finally {
            setLoading(false);
        }
    };
    const updateEventHandler = async (data) => {

        setLoading(true);
        delete data.baseUrl;
        // Simulate an API call with a delay
        try {
            const response = await apiConnecter("PUT", `${API_ENDPOINTS.REACT_APP_UPDATE_EVENTS_END_POINT}/${eventToUpdate._id}`, data, { authorization: `Bearer ${userInfo.token}` });
            console.log("data from server", response.data)
            setSuccess({ title: "Success", message: response.data.message });
            setAllEvents(prevEvents => prevEvents.map(event => event._id === eventToUpdate._id ? response.data.result : event)); // Update the event in the list
            onCancel();
        } catch (err) {
            setError({ title: "Error", message: err?.response?.data?.message ?? err.message });
        } finally {
            setLoading(false);
        }
    };

    const handleModalClose = () => {
        setError('');
        setSuccess('');
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        let isValid = true;
        const newFieldErrors = {};

        // Event Name
        if (!eventName.trim()) {
            newFieldErrors.eventName = 'Event Name is required.';
            isValid = false;
        }

        // Event Dates
        if (!eventDate.trim()) {
            newFieldErrors.eventDate = 'Event Date is required.';
            isValid = false;
        }
        if (!eventEndDate.trim()) {
            newFieldErrors.eventEndDate = 'Event End Date is required.';
            isValid = false;
        }

        // Check if eventEndDate is after eventDate
        if (eventDate && eventEndDate) {
            const start = new Date(eventDate);
            const end = new Date(eventEndDate);
            if (end < start) {
                newFieldErrors.eventEndDate = 'Event End Date must be after Event Date.';
                isValid = false;
            }
        }

        // Expected Attendance
        if (!String(expectAttendance).trim()) {
            newFieldErrors.expectAttendance = 'Expected Attendance is required.';
            isValid = false;
        } else if (isNaN(expectAttendance) || Number(expectAttendance) <= 0) {
            newFieldErrors.expectAttendance = 'Expected Attendance must be a positive number.';
            isValid = false;
        }

        // Location
        if (!location.trim()) {
            newFieldErrors.location = 'Location is required.';
            isValid = false;
        }


        // Destination URL
        if (destinationUrl && (!/^https?:\/\/.+\..+/.test(destinationUrl))) {
            newFieldErrors.destinationUrl = 'Destination URL must be a valid URL.';
            isValid = false;
        }

        // Organizer
        if (typeof selectedOrganizer !== "object" || !selectedOrganizer?._id.trim()) {
            newFieldErrors.organizer = 'Organizer is required.';
            isValid = false;
        }

        setFieldErrors(newFieldErrors);

        if (!isValid) {
            // Scroll to first error field
            if (newFieldErrors.eventName) eventNameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            else if (newFieldErrors.eventDate) eventDateRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            else if (newFieldErrors.eventEndDate) eventEndDateRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            else if (newFieldErrors.expectAttendance) expectAttendanceRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            else if (newFieldErrors.location) locationRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            else if (newFieldErrors.baseUrl) baseUrlRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            else if (newFieldErrors.destinationUrl) destinationUrlRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            else if (newFieldErrors.organizer) organizerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        // Payload
        const payload = {
            eventName,
            eventStartDate: eventDate,
            eventEndDate,
            utmParams: {
                utm_source: utmSource,
                utm_medium: utmMedium,
                utm_campaign: utmCampaign,
                utm_term: utmTerm,
                utm_content: utmContent
            },
            expectedAttendees: expectAttendance,
            location,
            baseUrl,
            destinationUrl,
            organizerIds: [selectedOrganizer?._id],
            status
        };
        if (!destinationUrl) {
            delete payload.destinationUrl
        }
        console.log("payload", payload);
        if (eventToUpdate) updateEventHandler(payload);
        else createEventHandler(payload);
    };


    const getInputBorderClass = (fieldName) => {
        return fieldErrors[fieldName] ? "border-orange-600 focus:border-orange-600" : "border-transparent focus:border-[var(--color-primary)]";
    };
    async function getOrganizersList() {
        // Only attempt to fetch if a token exists
        if (!userInfo.token) {
            console.log("No token available. Skipping API call.");
            return;
        }
        setError('');
        try {
            // Your existing API call
            const res = await apiConnecter(
                "GET",
                API_ENDPOINTS.REACT_APP_GET_ACTIVE_ORGANIZER_LIST_END_POINT,
                "",
                {
                    authorization: `Bearer ${userInfo.token}`
                }
            );
            setOrganizersList(res.data?.result ?? [])
            setFilteredOrganizers(res?.data?.result ?? [])
            console.log("Organizers List:", res.data);

        } catch (err) {
            console.error("API Error:", err);
            setError(err?.response?.data?.message ?? err.message);
        } finally {
            // setLoading(false);
        }
    }

    // 3. Use useEffect with the correct dependency array
    useEffect(() => {
        getOrganizersList()
        console.log("eventToUpdate", eventToUpdate)
        if (eventToUpdate) {
            setEventName(eventToUpdate.eventName || '');
            setEventDate(eventToUpdate.eventStartDate ? eventToUpdate.eventStartDate.split('T')[0] : '');
            setEventEndDate(eventToUpdate.eventEndDate ? eventToUpdate.eventEndDate.split('T')[0] : '');
            setExpectAttendance(eventToUpdate.expectedAttendees || '');
            setLocation(eventToUpdate.location || '');
            setBaseUrl(eventToUpdate.baseUrl || '');
            setDestinationUrl(eventToUpdate.destinationUrl || '');
            if (eventToUpdate?.organizers?.length > 0) {
                setOrganizer(eventToUpdate.organizers[0].userName || '');
                setSelectedOrganizer(eventToUpdate.organizers[0] || null);
            }
            setUtmSource(eventToUpdate.utmParams?.utm_source || '');
            setUtmMedium(eventToUpdate.utmParams?.utm_medium || '');
            setUtmCampaign(eventToUpdate.utmParams?.utm_campaign || '');
            setUtmTerm(eventToUpdate.utmParams?.utm_term || '');
            setUtmContent(eventToUpdate.utmParams?.utm_content || '');
        }
    }, [userInfo.token]);
    const today = new Date().toISOString().split('T')[0]; // Format as yyyy-mm-dd
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Add 1 day
    const tomorrowDate = tomorrow.toISOString().split('T')[0];

    return (
        <div className=" absolute inset-0 backdrop-blur-xs z-50  min-h-screen font-[Inter] w-full flex justify-center items-center p-4 text-gray-200">
            <div className="flex  flex-col  justify-center items-center p-4 w-full max-w-[517px]">
                {/* <SparkMotionLogo /> */}
                <div className="flex  absolute top-1/2 transform -translate-y-1/2 bg-[var(--color-surface-background)] rounded-[12px] border-[#454343] border pb-4 shadow-2xl  mx-auto flex-col justify-center items-center">

                    <div className=" p-[20px] max-h-[500px] overflow-y-auto custom-scrollbar">
                        <div className="w-full mb-2  ">
                            <h2 className="text-start text-[23px] font-bold tracking-tight text-[var(--color-text-base)]" style={{ lineHeight: "32px" }}>
                                {eventToUpdate ? 'Edit Event' : 'Create New Event'}
                            </h2>
                            <p className="mt-1 text-start text-[14px] font-medium text-[var(--color-text-secondary)] leading-[20px]">
                                {eventToUpdate ? 'Edit your existing SparkMotion event with NFC bracelet tracking.' : 'Set up a new SparkMotion event with NFC bracelet tracking.'}
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Event Name */}
                            <div>
                                <label htmlFor="eventName" className="block text-sm font-bold text-[var(--color-text-base)]">
                                    Event Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        ref={eventNameRef}
                                        id="eventName"
                                        type="text"
                                        value={eventName}

                                        onChange={(e) => setEventName(e.target.value)}
                                        placeholder="Enter event name"
                                        className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('eventName')}`}
                                    />
                                    {fieldErrors.eventName && (
                                        <p className="mt-1 text-xs text-orange-600">{fieldErrors.eventName}</p>
                                    )}
                                </div>
                            </div>

                            {/* Event Dates */}
                            <div className="flex  space-x-4">
                                <div className="w-1/2">
                                    <label htmlFor="eventDate" className="block text-sm font-bold text-[var(--color-text-base)]">
                                        Event Date
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            ref={eventDateRef}
                                            id="eventDate"
                                            type="date"
                                            min={today}
                                            value={eventDate}
                                            onChange={(e) => setEventDate(e.target.value)}
                                            placeholder="dd/mm/yyyy"
                                            className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 custom-date-icon ${getInputBorderClass('eventDate')}`}
                                        />
                                        {fieldErrors.eventDate && (
                                            <p className="mt-1 text-xs text-orange-600">{fieldErrors.eventDate}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <label htmlFor="eventEndDate" className="block text-sm font-bold text-[var(--color-text-base)]">
                                        Event End Date
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            ref={eventEndDateRef}
                                            id="eventEndDate"
                                            type="date"
                                            min={tomorrowDate}
                                            value={eventEndDate}
                                            onChange={(e) => setEventEndDate(e.target.value)}
                                            placeholder="dd/mm/yyyy"
                                            // className="block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border border-transparent transition-colors duration-200 focus:border-[var(--color-primary)]"
                                            className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200  custom-date-icon ${getInputBorderClass('eventEndDate')}`}
                                        />
                                    </div>
                                    {fieldErrors.eventEndDate && (
                                        <p className="mt-1 text-xs text-orange-600">{fieldErrors.eventEndDate}</p>
                                    )}
                                </div>
                            </div>

                            {/* Expected Attendance */}
                            <div>
                                <label htmlFor="expectAttendance" className="block text-sm font-bold text-[var(--color-text-base)]">
                                    Expect Attendance
                                </label>
                                <div className="mt-2">
                                    <input
                                        ref={expectAttendanceRef}
                                        id="expectAttendance"
                                        type="text"
                                        value={expectAttendance}
                                        onChange={(e) => setExpectAttendance(e.target.value)}
                                        placeholder="2000"
                                        className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('expectAttendance')}`}
                                    />
                                    {fieldErrors.expectAttendance && (
                                        <p className="mt-1 text-xs text-orange-600">{fieldErrors.expectAttendance}</p>
                                    )}
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <label htmlFor="location" className="block text-sm font-bold text-[var(--color-text-base)]">
                                    Location
                                </label>
                                <div className="mt-2">
                                    <input
                                        ref={locationRef}
                                        id="location"
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="City, State"
                                        className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('location')}`}
                                    />
                                    {fieldErrors.location && (
                                        <p className="mt-1 text-xs text-orange-600">{fieldErrors.location}</p>
                                    )}
                                </div>
                            </div>

                            {/* Base URL */}
                            <div>
                                <label htmlFor="baseUrl" className="block text-sm font-bold text-[var(--color-text-base)]">
                                    Base URL
                                </label>
                                <div className="mt-2">
                                    <input
                                        ref={baseUrlRef}
                                        id="baseUrl"
                                        type="text"
                                        disabled={true}
                                        value={baseUrl}
                                        onChange={(e) => setBaseUrl(e.target.value)}
                                        placeholder="https://r.sparkmotion.app/eventcodes"
                                        className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-secondary)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('baseUrl')}`}
                                    />
                                    <p className="mt-1 text-xs text-[var(--color-text-secondary)]">Short URL for NFC bracelet redirects</p>
                                    {fieldErrors.baseUrl && (
                                        <p className="mt-1 text-xs text-orange-600">{fieldErrors.baseUrl}</p>
                                    )}
                                </div>
                            </div>

                            {/* Destination URL */}
                            <div>
                                <label htmlFor="destinationUrl" className="block text-sm font-bold text-[var(--color-text-base)]">
                                    Destination URL
                                </label>
                                <div className="mt-2">
                                    <input
                                        ref={destinationUrlRef}
                                        id="destinationUrl"
                                        type="text"
                                        value={destinationUrl}
                                        onChange={(e) => setDestinationUrl(e.target.value)}
                                        placeholder="https://example.com/landing-page"
                                        className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('destinationUrl')}`}
                                    />
                                    <p className="mt-1 text-xs text-[var(--color-text-secondary)]">Where users will be redirected after tapping the bracelet</p>
                                    {fieldErrors.destinationUrl && (
                                        <p className="mt-1 text-xs text-orange-600">{fieldErrors.destinationUrl}</p>
                                    )}
                                </div>
                            </div>

                            {/* Assign Organizer */}
                            <div className="relative" ref={organizerInputRef}>
                                <label htmlFor="organizer" className="block text-sm font-bold text-[var(--color-text-base)]">
                                    Assign Organizer
                                </label>
                                <div className="mt-2">
                                    <input
                                        ref={organizerRef}
                                        id="organizer"
                                        type="text"
                                        value={organizer}
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                        placeholder="Select organizer"
                                        className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('organizer')}`}
                                    />
                                    {fieldErrors.organizer && (
                                        <p className="mt-1 text-xs text-orange-600">{fieldErrors.organizer}</p>
                                    )}
                                </div>
                                {(isDropdownVisible && filteredOrganizers?.length > 0) ? (
                                    <ul className="absolute z-10 w-full mt-1 bg-[var(--color-surface-background)] border border-[var(--color-border-base)] rounded-md shadow-lg max-h-60 overflow-y-auto custom-scrollbar">
                                        {filteredOrganizers?.map(organizer => (
                                            <li
                                                key={organizer._id}
                                                onClick={() => {
                                                    setOrganizer(organizer.userName)
                                                    setSelectedOrganizer(organizer)
                                                    setIsDropdownVisible(false)
                                                }}
                                                className="px-4 py-2 text-sm text-[var(--color-text-base)] cursor-pointer hover:bg-[var(--color-bg-hover)] transition-colors duration-200"
                                            >
                                                {organizer.userName}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    isDropdownVisible &&
                                    <ul className=" z-10 w-full mt-1 bg-[var(--color-surface)] border border-[var(--color-border-base)] rounded-md shadow-lg max-h-60 overflow-y-auto custom-scrollbar">
                                        {[{ _id: "00", userName: "No Active Organizer Found. " }].map(organizer => (
                                            <li
                                                key={organizer._id}
                                                className="px-4 py-2 text-sm text-[var(--color-text-base)] cursor-pointer hover:bg-[var(--color-bg-hover)] transition-colors duration-200"
                                            >
                                                {organizer.userName}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-[var(--color-text-base)] mb-1">UTM Parameters</h3>
                                <p className="text-xs text-[var(--color-text-secondary)]">Add UTM parameters for campaign tracking and analytics</p>

                                <div className="mt-4 flex space-x-4">
                                    {/* UTM Source */}
                                    <div className="w-1/2">
                                        <label htmlFor="utmSource" className="block text-sm font-bold text-[var(--color-text-base)]">
                                            UTM Source
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="utmSource"
                                                type="text"
                                                value={utmSource}
                                                onChange={(e) => setUtmSource(e.target.value)}
                                                placeholder="e.g., google, facebook..."
                                                className="block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border border-transparent transition-colors duration-200 focus:border-[var(--color-primary)]"
                                            />
                                            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">Traffic source (where visitors come from)</p>
                                        </div>
                                    </div>
                                    {/* UTM Medium */}
                                    <div className="w-1/2">
                                        <label htmlFor="utmMedium" className="block text-sm font-bold text-[var(--color-text-base)]">
                                            UTM Medium
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="utmMedium"
                                                type="text"
                                                value={utmMedium}
                                                onChange={(e) => setUtmMedium(e.target.value)}
                                                placeholder="e.g., cpc, social, email"
                                                className="block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border border-transparent transition-colors duration-200 focus:border-[var(--color-primary)]"
                                            />
                                            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">Marketing medium or channel</p>
                                        </div>
                                    </div>
                                </div>

                                {/* UTM Campaign */}
                                <div className="mt-4">
                                    <label htmlFor="utmCampaign" className="block text-sm font-bold text-[var(--color-text-base)]">
                                        UTM Campaign
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="utmCampaign"
                                            type="text"
                                            value={utmCampaign}
                                            onChange={(e) => setUtmCampaign(e.target.value)}
                                            placeholder="e.g., summer_festival_2024, vip_launch"
                                            className="block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border border-transparent transition-colors duration-200 focus:border-[var(--color-primary)]"
                                        />
                                        <p className="mt-1 text-xs text-[var(--color-text-secondary)]">Campaign name for tracking specific marketing efforts</p>
                                    </div>
                                </div>

                                <div className="mt-4 flex space-x-4">
                                    {/* UTM Term */}
                                    <div className="w-1/2">
                                        <label htmlFor="utmTerm" className="block text-sm font-bold text-[var(--color-text-base)]">
                                            UTM Term
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="utmTerm"
                                                type="text"
                                                value={utmTerm}
                                                onChange={(e) => setUtmTerm(e.target.value)}
                                                placeholder="e.g., live event, festival"
                                                className="block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border border-transparent transition-colors duration-200 focus:border-[var(--color-primary)]"
                                            />
                                            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">Keywords</p>
                                        </div>
                                    </div>
                                    {/* UTM Content */}
                                    <div className="w-1/2">
                                        <label htmlFor="utmContent" className="block text-sm font-bold text-[var(--color-text-base)]">
                                            UTM Content
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="utmContent"
                                                type="text"
                                                value={utmContent}
                                                onChange={(e) => setUtmContent(e.target.value)}
                                                placeholder="e.g., banner, ad"
                                                className="block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border border-transparent transition-colors duration-200 focus:border-[var(--color-primary)]"
                                            />
                                            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">Content variation</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                eventToUpdate &&
                                <div ref={statusRef}>
                                    <label htmlFor="status" className="block text-sm font-bold text-[var(--color-text-base)]">
                                        Status
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="status"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            onFocus={() => setIsDropdownVisibleStatus(true)}
                                            className="block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none  transition-colors duration-200 focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                        >
                                            {/* <option value="active">Active</option>
                                        <option value="inactive">Inactive</option> */}
                                        </input>
                                    </div>{
                                        isDropdownVisibleStatus &&
                                        <ul className=" z-10 w-full mt-1 bg-[var(--color-surface)] border border-[var(--color-border-base)] rounded-md shadow-lg max-h-60 overflow-y-auto">
                                            {allStatus.map((status, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => {
                                                        setStatus(status)
                                                        // setOrganizer(organizer.userName)
                                                        // setSelectedOrganizer(organizer)
                                                        setIsDropdownVisibleStatus(false)
                                                    }}
                                                    className="px-4 py-2 text-sm text-[var(--color-text-base)] cursor-pointer hover:bg-[var(--color-primary-dark)] transition-colors duration-200 hover:"
                                                >
                                                    {status}
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                </div>
                            }


                            {/* Buttons */}
                        </form>
                    </div>
                    <div className="mt-8 flex justify-end space-x-4 px-8 w-full">
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className={`px-6 py-2 text-sm cursor-pointer  font-semibold rounded-md border border-[#454343] text-[var(--color-text-base)]  transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed ' : 'hover:bg-[#333333]'}`}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className={`px-6 py-2 text-sm cursor-pointer font-semibold rounded-md bg-[var(--color-primary)] text-white shadow-sm transition-opacity duration-200  ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}`}

                        >
                            {
                                eventToUpdate ? loading ? 'Updating Event...' : 'Update Event' : loading ? "Creating Event..." : "Create Event"
                            }


                        </button>
                    </div>
                </div>
            </div>
            {/* {error && <Modal title={eventToUpdate ? "Event Update Failed" : "Event Creation Failed"} message={error} onClose={handleModalClose} />}
            {success && <Modal title={eventToUpdate ? "Event Updated Successfully" : "Event Created Successfully"} message={success} onClose={handleModalClose} />} */}
        </div>
    );
};

export default CreateEventForm;

