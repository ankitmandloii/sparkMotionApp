import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import logo from '../../assets/logos/sparkMotionLogo.png'
import Modal from '../../components/shared/ErrorModal';
import { apiConnecter } from '../../services/apiConnector';
import { useNavigate } from 'react-router';


// A simple placeholder logo component. You can replace this with your actual logo.
const SparkMotionLogo = () => (
    <img src={logo} className='mb-3 w-[160px] h-[50px]'></img>
);


const CreateEventForm = () => {
    // State for all form fields
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.userInfo)
    const [organizersList, setOrganizersList] = useState([]);
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [expectAttendance, setExpectAttendance] = useState('');
    const [location, setLocation] = useState('');
    const [baseUrl, setBaseUrl] = useState('');
    const [destinationUrl, setDestinationUrl] = useState('');
    const [organizer, setOrganizer] = useState('');
    const [utmSource, setUtmSource] = useState('');
    const [utmMedium, setUtmMedium] = useState('');
    const [utmCampaign, setUtmCampaign] = useState('');
    const [utmTerm, setUtmTerm] = useState('');
    const [utmContent, setUtmContent] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedOrganizer, setSelectedOrganizer] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOrganizers, setFilteredOrganizers] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    // const [fieldErrors, setFieldErrors] = useState({}); // Placeholder for error state
    const organizerInputRef = useRef(null);

    // State for field-specific validation errors
    const [fieldErrors, setFieldErrors] = useState({});


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

        setLoading(true);
        // Simulate an API call with a delay
        try {
            const response = await apiConnecter("POST", process.env.REACT_APP_CREATE_EVENTS_END_POINT, data, { authorization: `Bearer ${userInfo.token}` });
            console.log("data from server", response.data)
            setSuccess(response.data.message);
        } catch (err) {
            setError(err?.response?.data?.message ?? err.message);
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

        // Validation for required fields
        if (!eventName.trim()) {
            newFieldErrors.eventName = 'Event Name is required.';
            isValid = false;
        }
        if (!eventDate.trim()) {
            newFieldErrors.eventDate = 'Event Date is required.';
            isValid = false;
        }
        if (!expectAttendance.trim()) {
            newFieldErrors.expectAttendance = 'Expected Attendance is required.';
            isValid = false;
        }
        if (!location.trim()) {
            newFieldErrors.location = 'Location is required.';
            isValid = false;
        }
        if (!baseUrl.trim()) {
            newFieldErrors.baseUrl = 'Base URL is required.';
            isValid = false;
        }
        if (!destinationUrl.trim()) {
            newFieldErrors.destinationUrl = 'Destination URL is required.';
            isValid = false;
        }
        if (!selectedOrganizer || !selectedOrganizer?._id.trim()) {
            newFieldErrors.organizer = 'Organizer is required.';
            isValid = false;
        }

        setFieldErrors(newFieldErrors);

        if (!isValid) {
            console.log("Form has validation errors. Not submitting.");
            return;
        }
        // {
        //     "eventName": "Summer Festival",
        //         "eventStartDate": "2025-06-01T00:00:00Z",
        //             "eventEndDate": "2025-06-05T00:00:00Z",
        //                 "utmParams": {
        //         "utm_source": "google",
        //             "utm_medium": "cpc",
        //                 "utm_campaign": "summer2025",
        //                     "utm_term": "event",
        //                         "utm_content": "ad1"
        //     },
        //     "expectedAttendees": 5000,
        //         "location": "New York City, Central Park",
        //             "baseUrl": "https://sparkmotion.com/e/123",
        //                 "destinationUrl": "https://example.com/target-url",
        //                     "organizers" : ["68d52d7633b5e1d7d424a589"]
        // }



        const payload =
        {
            "eventName": eventName,
            "eventStartDate": eventDate,
            "eventEndDate": eventEndDate,
            "utmParams": {
                "utm_source": utmSource,
                "utm_medium": utmMedium,
                "utm_campaign": utmCampaign,
                "utm_term": utmTerm,
                "utm_content": utmContent
            },
            "expectedAttendees": expectAttendance,
            "location": location,
            "baseUrl": baseUrl,
            "destinationUrl": destinationUrl,
            "organizer  Ids": [selectedOrganizer?._id]
        }
        console.log("payload", payload)
        createEventHandler(payload)
        // Handle form submission (e.g., send data to an API)
        console.log('Form submitted successfully with the following data:');
        console.log({
            eventName, eventDate, eventEndDate, expectAttendance, location, baseUrl, destinationUrl, organizer, utmSource, utmMedium, utmCampaign, utmTerm, utmContent
        });

        // You would typically reset the form here after a successful submission
        // setEventName('');
        // etc.
    };

    const getInputBorderClass = (fieldName) => {
        return fieldErrors[fieldName] ? "border-orange-600 focus:border-orange-600" : "border-transparent focus:border-[var(--color-primary)]";
    };
    async function getOrganizersList() {
        // Only attempt to fetch if a token exists
        if (!userInfo.token) {
            // Optionally, handle the case where no token is available if necessary
            console.log("No token available. Skipping API call.");
            return;
        }


        setLoading(true);
        setError('');

        try {
            // Your existing API call
            const res = await apiConnecter(
                "GET",
                process.env.REACT_APP_GET_ACTIVE_ORGANIZER_LIST_END_POINT,
                "",
                {
                    authorization: `Bearer ${userInfo.token}`
                }
            );
            setOrganizersList(res.data?.result ?? [])
            setFilteredOrganizers(res.data.result ?? [])
            console.log("Organizers List:", res.data);
            // console.log(response); // Store the response data

        } catch (err) {
            console.error("API Error:", err);
            setError(err?.response?.data?.message ?? err.message);
        } finally {
            setLoading(false);
        }
    }

    // 3. Use useEffect with the correct dependency array
    useEffect(() => {
        // Call the function

        getOrganizersList()
        // Dependency array: Re-run the effect whenever the token changes.
        // This ensures the API call uses the *latest* token (e.g., after login).
    }, [userInfo.token]);
    return (
        <div
            className="min-h-screen w-full font-[Inter] flex justify-center items-center p-4  text-gray-200"
        // style={{
        //     '--color-surface-background': '#1A1A1A',
        //     '--color-surface-card': '#222222',
        //     '--color-surface-input': '#2C2C2C',
        //     '--color-primary': '#3B82F6',
        //     '--color-text-base': '#F5F5F5',
        //     '--color-text-secondary': '#A0A0A0',
        //     '--color-input-placeholder': '#6B7280',
        //     backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://placehold.co/1920x1080/1a1a1a/cccccc?text=Background+Image)',
        //     backgroundSize: 'cover',
        //     backgroundPosition: 'center',
        //     fontFamily: 'Inter, sans-serif'
        // }}
        >
            <style>

            </style>
            <div className='flex flex-col justify-center items-center p-[20px] mx-w-[517px] w-full'>
                {/* <SparkMotionLogo /> */}
                <div className="flex bg-[var(--color-surface-card)] rounded-[12px] border-[#454343] border pb-4 shadow-2xl  mx-auto flex-col justify-center items-center">

                    <div className=" p-[20px] max-h-[400px] overflow-y-auto custom-scrollbar">
                        <div className="w-full mb-2  ">
                            {/* <h2 className="text-center text-[20px] font-semibold tracking-tight text-[var(--color-text-base)]">
                            Create New Event
                        </h2>
                        <p className="mt-1 text-center text-[13px] text-[var(--color-text-secondary)] leading-[20px]">
                            Set up a new SparkMotion event with NFC bracelet tracking.
                        </p> */}
                            <h2 className="text-start text-[23px] font-bold tracking-tight text-[var(--color-text-base)]" style={{ lineHeight: "32px" }}>
                                Create New Event
                            </h2>
                            <p className="mt-1 text-start text-[14px] font-medium text-[var(--color-text-secondary)] leading-[20px]">
                                Set up a new SparkMotion event with NFC bracelet tracking.
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
                                            id="eventDate"
                                            type="date"
                                            value={eventDate}
                                            onChange={(e) => setEventDate(e.target.value)}
                                            placeholder="dd/mm/yyyy"
                                            className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('eventDate')}`}
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
                                            id="eventEndDate"
                                            type="date"
                                            value={eventEndDate}
                                            onChange={(e) => setEventEndDate(e.target.value)}
                                            placeholder="dd/mm/yyyy"
                                            // className="block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border border-transparent transition-colors duration-200 focus:border-[var(--color-primary)]"
                                            className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('eventDate')}`}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Expected Attendance */}
                            <div>
                                <label htmlFor="expectAttendance" className="block text-sm font-bold text-[var(--color-text-base)]">
                                    Expect Attendance
                                </label>
                                <div className="mt-2">
                                    <input
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
                                        id="baseUrl"
                                        type="text"
                                        value={baseUrl}
                                        onChange={(e) => setBaseUrl(e.target.value)}
                                        placeholder="https://r.sparkmotion.app/eventcodes"
                                        className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('baseUrl')}`}
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
                                {(isDropdownVisible && filteredOrganizers.length > 0) ? (
                                    <ul className=" z-10 w-full mt-1 bg-[var(--color-surface)] border border-[var(--color-border-base)] rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        {filteredOrganizers.map(organizer => (
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
                                    <ul className=" z-10 w-full mt-1 bg-[var(--color-surface)] border border-[var(--color-border-base)] rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        {[{ _id: "00", userName: "No Active Organizer Found. " }].map(organizer => (
                                            <li
                                                key={organizer._id}
                                                // onClick={() => {
                                                //     setOrganizer(organizer.userName)
                                                //     setSelectedOrganizer(organizer)
                                                //     setIsDropdownVisible(false)
                                                // }}
                                                className="px-4 py-2 text-sm text-[var(--color-text-base)] cursor-pointer hover:bg-[var(--color-bg-hover)] transition-colors duration-200"
                                            >
                                                {organizer.userName}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            {/* Organizer Selection Section */}
                            {/* <div className="relative" ref={organizerInputRef}>
                                <label htmlFor="organizer" className="block text-sm font-bold text-[var(--color-text-base)]">
                                    Assign Organizer
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="organizer"
                                        type="text"
                                        value={searchTerm}
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                        placeholder="Select or search for an organizer"
                                        autoComplete="off"
                                        className={`block w-full rounded-md bg-[var(--color-surface-input)] px-[12px] py-[6px] text-sm text-[var(--color-text-base)] placeholder-[var(--color-input-placeholder)] outline-none border transition-colors duration-200 ${getInputBorderClass('organizer')}`}
                                    />
                                    {fieldErrors.organizer && (
                                        <p className="mt-1 text-xs text-orange-600">{fieldErrors.organizer}</p>
                                    )}
                                </div>


                            </div> */}

                            {/* Display selected organizer */}
                            {/* {selectedOrganizer && (
                                <div className="mt-6 p-4 bg-[var(--color-bg-highlight)] rounded-lg">
                                    <p className="text-sm font-semibold text-[var(--color-text-base)]">
                                        Selected Organizer: <span className="font-normal">{organizer.userName}</span>
                                    </p>
                                    <p className="text-xs text-[var(--color-text-subtle)]">
                                        ID: {selectedOrganizer._id}
                                    </p>
                                </div>
                            )} */}

                            {/* UTM Parameters Section (optional) */}
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

                            {/* Buttons */}
                        </form>
                    </div>
                    <div className="mt-8 flex justify-end space-x-4 px-8 w-full">
                        <button
                            type="button"
                            onClick={() => navigate("/Events")}
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
                                loading ? "Creating Event..." : "Create Event"
                            }

                        </button>
                    </div>
                </div>
            </div>
            {error && <Modal title="Event Creation Failed" message={error} onClose={handleModalClose} />}
            {success && <Modal title="Event Created Successfully" message={success} onClose={handleModalClose} />}
        </div>
    );
};

export default CreateEventForm;

