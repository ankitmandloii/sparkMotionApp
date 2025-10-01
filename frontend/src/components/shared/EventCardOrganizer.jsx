// EventCardOrganizer.js
import React, { useRef, useState } from 'react';
import { IoLocationOutline } from "react-icons/io5";
import IconButton from './IconButton';
import { FaCheck } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { AnalyticIcon, CalendarIcon, DownloadIcon, EditIcon, ShareIcon } from '../../assets/icons/icons';
import Badge from './Badge';
import { useReactToPrint } from "react-to-print";
import UrlInput from './UrlInput';
import { apiConnecter } from '../../services/apiConnector';
import Modal from "./ErrorModal";
import { Link, useNavigate } from "react-router";
// import { exportEventAsReport } from './exportEventAsTable';
// import { exportEventAsCSV } from '';
import API_ENDPOINTS from '../../data/EndPoints';
import { exportEventAsCSV } from '../../services/exportEventAsCSV';
import { exportEventAsReport } from '../../services/exportEventAsTable';

const EventCardOrganizer = ({ event, userInfo, getAllEventsDataHandler }) => {
    console.log("---------customerevent", event)
    // safely handle undefined props
    const expectedAttendees = event?.expectedAttendees ?? 0;
    const navigate = useNavigate();
    const clickCount = event?.clickCount ?? 0;
    const postEventClickCount = event?.postEventClickCount ?? 0;

    const engagementRate = expectedAttendees
        ? ((clickCount / expectedAttendees) * 100).toFixed(2)
        : "0.00";

    const postEventEngagementRate = expectedAttendees
        ? ((postEventClickCount / expectedAttendees) * 100).toFixed(2)
        : "0.00";

    // state for editing destination URL
    const [newDestinationUrl, setNewDestinationUrl] = useState(event?.destinationUrl?.trim() ? event?.destinationUrl : "");
    const [newExpectedAttendees, setNewExpectedAttendees] = useState(event?.expectedAttendees ?? 0);

    const [isEditing, setIsEditing] = useState(false);
    const [isEditingAttendece, setIsEditingAttendece] = useState(false);

    const [loading, setLoading] = useState(false);

    const cardRef = useRef(null);

    // react-to-print handler
    const handlePrint = () => {
        exportEventAsCSV(event)
    }


    // save API handler
    const handleSave = async () => {
        if (loading) return;

        // Validate the destination URL
        if (newDestinationUrl.trim() === "" || newDestinationUrl === "N/A") {
            Modal({
                title: "Error",
                message: "Destination URL cannot be empty.",
            });
            return;
        }

        if (newDestinationUrl && (!/^https?:\/\/.+\..+/.test(newDestinationUrl))) {
            Modal({
                title: "Error",
                message: "Destination URL must be a valid URL",
            });
            return;
        }


        try {
            setLoading(true);
            const response = await apiConnecter(
                "PUT",
                `${API_ENDPOINTS.REACT_APP_UPDATE_DESTINATION_URL_END_POINT}/${event._id}`,
                {
                    destinationUrl: newDestinationUrl
                },
                { authorization: `Bearer ${userInfo.token}` }
            );
            Modal({
                title: "Success",
                message: response.data.message,
            });
            getAllEventsDataHandler();
            setIsEditing(false);
        } catch (error) {
            setNewDestinationUrl(event?.destinationUrl);
            setNewExpectedAttendees(event?.expectedAttendees); // Revert on error
            console.error(error);
            Modal({
                title: "Error",
                message: error.response.data.message,
            });
        } finally {
            setLoading(false);
        }
    };
    const handleSaveExpectedAttendence = async () => {
        if (loading) return;


        // Validate expected attendees
        if (!String(newExpectedAttendees).trim()) {
            Modal({
                title: "Error",
                message: "Expected Attendance be empty",
            });
            return
        }
        if (isNaN(newExpectedAttendees) || Number(newExpectedAttendees) <= 0) {
            Modal({
                title: "Error",
                message: "Expected Attendance must be a positive number.",
            });
            return
        }
        console.log(Number(newExpectedAttendees), Number(event.expectedAttendees), "XXXXXXXXXXX")
        if (Number(newExpectedAttendees) == Number(event.expectedAttendees)) {
            Modal({
                title: "Error",
                message: "Expected attendees must be a different number.",
            });
            return;
        }
        if (newExpectedAttendees <= 0) {
            Modal({
                title: "Error",
                message: "Expected attendees must be a positive number.",
            });
            return;
        }

        try {
            setLoading(true);
            const response = await apiConnecter(
                "PUT",
                `${API_ENDPOINTS.REACT_APP_UPDATE_DESTINATION_URL_END_POINT}/${event._id}`,
                {
                    expectedAttendees: newExpectedAttendees, // Send the new expected attendees
                },
                { authorization: `Bearer ${userInfo.token}` }
            );
            Modal({
                title: "Success",
                message: "Expetected attendence updated successfully",
            });
            getAllEventsDataHandler();
            setIsEditing(false);
        } catch (error) {
            setNewDestinationUrl(event?.destinationUrl);
            setNewExpectedAttendees(event?.expectedAttendees); // Revert on error
            console.error(error);
            Modal({
                title: "Error",
                message: error.response.data.message,
            });
        } finally {
            setLoading(false);
        }
    };


    const handleCancel = () => {
        setIsEditing(false)
        setNewDestinationUrl(event.destinationUrl ? event.destinationUrl : "")
    };
    const handleAnalyticsClick = (eventId, taps, engagement, postClick, attendance) => {
        // console.log("-----Analyytaps", taps);
        // console.log("-----Analyytaps2", engagement);
        // console.log("-----Analyytaps3", postClick);
        // console.log("-----Analyytaps4", attendance);

        const tapsNum = Number(taps) || 0;
        const postClickNum = Number(postClick) || 0;
        // const engagementNum = Number(engagement) || 0;
        // const attendanceNum = Number(attendance) || 0;

        // rate in %
        const postClickRate = tapsNum > 0 ? (tapsNum / postClickNum) * 100 : 0;
        console.log("---------postRate", postClickRate);

        navigate(`/analytics/${eventId}`, {
            state: {
                totalTaps: tapsNum,
                engagementRate: engagement,
                postClickRate: `${postEventEngagementRate}`, // e.g., 42.86
                // postClickCount: postClickNum,
                attendance: attendance,
            }
        });
    };

    return (
        <div
            ref={cardRef}
            className="bg-[var(--color-surface-background)] rounded-2xl border border-[var(--border-color)] p-4 sm:p-6 w-full"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div className="flex flex-wrap items-center gap-2 justify-between">
                    <h3 className="text-lg font-semibold text-[#fafafa] break-words">
                        {event?.eventName ?? "Platform Configuration"}
                    </h3>
                    {event?.status && (
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
                    )}
                </div>
                <div className="flex gap-2 flex-wrap">
                    <IconButton
                        icon={DownloadIcon}
                        label="Export"
                        onClick={handlePrint}
                        hoverColor="hover:bg-gray-600"
                        bgColor="bg-[var(--color-surface-background)]"
                        border={true}
                        disabled={loading}
                    />
                    <IconButton
                        icon={AnalyticIcon}
                        color="text-[var(--color-primary)]"
                        label="View Analytics"
                        // onClick={() => alert("View Analytics clicked")}
                        onClick={() =>
                            handleAnalyticsClick(event?._id, event?.clickCount, engagementRate, event?.postEventClickCount, event?.expectedAttendees)
                        }
                        hoverColor="hover:bg-gray-600"
                        bgColor="bg-[var(--color-surface-background)]"
                        border={true}
                    />
                </div>
            </div>

            {/* Date + Location */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4 shrink-0" />
                    <span className="truncate">
                        {event?.eventStartDate?.slice(0, 10) ?? "TBD"} -  {event?.eventEndDate?.slice(0, 10) ?? "TBD"} • {event?.location ?? "Location TBD"}
                    </span>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div className="bg-[var(--color-surface-input)] flex flex-col items-center justify-center p-3 rounded-xl">
                    <div className="text-xl sm:text-2xl text-[var(--color-primary)] font-semibold">
                        {expectedAttendees}
                    </div>
                    <div className="text-gray-400 text-xs sm:text-sm">Attendance</div>
                </div>
                <div className="bg-[var(--color-surface-input)] flex flex-col items-center justify-center p-3 rounded-xl">
                    <div className="text-xl sm:text-2xl text-[var(--color-primary)] font-semibold">
                        {clickCount}
                    </div>
                    <div className="text-gray-400 text-xs sm:text-sm">Total Taps</div>
                </div>
                <div className="bg-[var(--color-surface-input)] flex flex-col items-center justify-center p-3 rounded-xl">
                    <div className="text-xl sm:text-2xl text-[var(--color-primary)] font-semibold">
                        {engagementRate}%
                    </div>
                    <div className="text-gray-400 text-xs sm:text-sm">Engagement Rate</div>
                </div>
                <div className="bg-[var(--color-surface-input)] flex flex-col items-center justify-center p-3 rounded-xl">
                    <div className="text-xl sm:text-2xl text-[var(--color-primary)] font-semibold">
                        {postEventEngagementRate}%
                    </div>
                    <div className="text-gray-400 text-xs sm:text-sm">Post-Event Retention</div>
                </div>
            </div>

            {/* URLs */}
            <div className="space-y-6">
                {/* Bracelet URL */}
                <div className="flex flex-col text-sm">
                    <span className="text-[#FAFAFA] mb-2">Bracelet URL:</span>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-1 w-full">
                            <UrlInput label={event?.baseUrl?.slice(0, 50) + "..." ?? "https://example.com/bracelet"} />
                        </div>
                        <Link target="_blank" rel="noopener noreferrer" to={event?.baseUrl} className="shrink-0">
                            <span className="border border-[var(--border-color)] p-2 flex justify-center items-center rounded hover:bg-gray-600 cursor-pointer">
                                <ShareIcon />
                            </span>
                        </Link>
                    </div>
                    <div className="text-[var(--color-grey)] text-xs mt-2">
                        This URL is encoded in your NFC bracelets (read-only)
                    </div>
                </div>

                {/* Destination URL */}
                <div className="flex flex-col text-sm">
                    <span className="text-white mb-2">Destination URL:</span>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-1 w-full">
                            {isEditing ? (
                                <input
                                    type="text"
                                    className="w-full bg-[var(--color-surface-input)] text-white rounded p-2"
                                    value={newDestinationUrl !== "N/A" ? newDestinationUrl : ""}
                                    placeholder='Ex. https://example.com'
                                    onChange={(e) => setNewDestinationUrl(e.target.value)}
                                    disabled={loading}
                                />
                            ) : (<UrlInput label={newDestinationUrl !== "" ? newDestinationUrl : "No destination set"} />

                            )}
                        </div>
                        <div className="flex gap-2">
                            {isEditing ? (
                                <>
                                    <span
                                        onClick={handleCancel}
                                        className={`border border-[var(--border-color)] p-2 flex justify-center items-center rounded hover:bg-gray-600 cursor-pointer ${loading ? "pointer-events-none cursor-not-allowed" : ""
                                            }`}
                                    >
                                        <MdOutlineCancel style={{ color: "white", fontSize: 16 }} />
                                    </span>
                                    <span
                                        onClick={handleSave}
                                        disabled={loading}
                                        className="border border-[var(--border-color)] p-2 flex justify-center items-center rounded hover:bg-gray-600 cursor-pointer"
                                    >
                                        {loading ? (
                                            <div className="w-5 h-5 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <FaCheck style={{ color: "white" }} />
                                        )}
                                    </span>
                                </>
                            ) : (
                                <span
                                    onClick={() => setIsEditing(true)}
                                    className="border border-[var(--border-color)] p-2 flex justify-center items-center rounded hover:bg-gray-600 cursor-pointer"
                                >
                                    <EditIcon />
                                </span>
                            )}
                            <Link target="_blank" rel="noopener noreferrer" to={event.destinationUrl} className="shrink-0">
                                <span className="border border-[var(--border-color)] p-2 flex justify-center items-center rounded hover:bg-gray-600 cursor-pointer">
                                    <ShareIcon />
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="text-[var(--color-grey)] text-xs mt-2">
                        Where attendees are redirected when they tap their bracelet
                    </div>
                </div>
                {/* Expected Attendance */}
                <div className="flex flex-col text-sm">
                    <span className="text-white mb-2">Expected Attendance:</span>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-1 w-full">
                            {isEditingAttendece ? (
                                <input
                                    type="text"
                                    className="w-full bg-[var(--color-surface-input)] text-white rounded p-2 "
                                    value={newExpectedAttendees}
                                    placeholder="Enter expected attendees"
                                    onChange={(e) => setNewExpectedAttendees(e.target.value)}
                                    disabled={loading}

                                />
                            ) : (
                                <div className="w-full bg-[var(--color-surface-input)] text-white p-2 rounded">
                                    {newExpectedAttendees || "No attendees set"}
                                </div>
                            )}
                        </div>
                        <div className="flex gap-2">
                            {isEditingAttendece ? (
                                <>
                                    <span
                                        onClick={() => {
                                            setIsEditingAttendece(false)
                                            setNewExpectedAttendees(event.expectedAttendees)
                                        }}
                                        className={`border border-[var(--border-color)] p-2 flex justify-center items-center rounded hover:bg-gray-600 cursor-pointer ${loading ? "pointer-events-none cursor-not-allowed" : ""}`}
                                    >
                                        <MdOutlineCancel style={{ color: "white", fontSize: 16 }} />
                                    </span>
                                    <span
                                        onClick={handleSaveExpectedAttendence}
                                        disabled={loading}
                                        className="border border-[var(--border-color)] p-2 flex justify-center items-center rounded hover:bg-gray-600 cursor-pointer"
                                    >
                                        {loading ? (
                                            <div className="w-5 h-5 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <FaCheck style={{ color: "white" }} />
                                        )}
                                    </span>
                                </>
                            ) : (
                                <span
                                    onClick={() => setIsEditingAttendece(true)}
                                    className="border border-[var(--border-color)] p-2 flex justify-center items-center rounded hover:bg-gray-600 cursor-pointer"
                                >
                                    <EditIcon />
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="text-[var(--color-grey)] text-xs mt-2">
                        The number of attendees expected for the event.
                    </div>
                </div>

            </div>
        </div>

    );
};

export default EventCardOrganizer;
