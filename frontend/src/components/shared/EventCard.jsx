// EventCard.js
import React from 'react';
import { IoLocationOutline } from "react-icons/io5";
import IconButton from './IconButton';
import ActionButton from './ActionButton';
import { AnalyticIcon, CalendarIcon, LinkIcon } from '../../assets/icons/icons';
import { IoSettingsOutline } from "react-icons/io5";
import Badge from './Badge';
import { useNavigate } from 'react-router';

const EventCard = ({ event, onEdit }) => {
    const navigate = useNavigate();
    // const eventId = event?._id;
    // console.log("----event", event)
    const engagementRate = event?.expectedAttendees
        ? ((event.clickCount / event.expectedAttendees) * 100).toFixed(2)
        : '0.00';
    const handleAnalyticsClick = (eventId, taps, engagement) => {
        navigate(`/analytics/${eventId}`, {
            state: {
                totalTaps: taps,
                engagementRate: engagement
            }
        });
    };
    return (
        <div className="bg-[var(--color-surface-background)] rounded-2xl border border-[var(--border-color)] p-4 sm:p-6 md:p-6 lg:p-8 w-full  mx-auto">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center  mb-4">
                <div className="flex items-center space-x-3 mb-2 sm:mb-0 justify-between">
                    <h3 className="text-lg sm:text-xl font-semibold text-white truncate">{event.eventName}</h3>
                    <Badge
                        label={event.status}
                        bgColor={event.status === 'Active' ? 'bg-[#fafafa]' : 'bg-[#262626]'}
                        textColor={event.status === 'Active' ? 'text-black' : 'text-[#fafafa]'}
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <IconButton
                        icon={AnalyticIcon}
                        label="Analytics"
                        // onClick={() => alert('Analytics clicked')}
                        onClick={() =>
                            handleAnalyticsClick(event?._id, event?.clickCount, engagementRate)
                        }
                        hoverColor="hover:bg-gray-600"
                        bgColor="bg-[var(--color-surface-background)]"
                        border={true}
                    />
                    <IconButton
                        icon={IoSettingsOutline}
                        label="Edit"
                        onClick={onEdit}
                        hoverColor="hover:bg-gray-600"
                        bgColor="bg-[var(--color-surface-background)]"
                        border={true}
                    />
                </div>
            </div>

            {/* Event Info */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm text-gray-400 mb-4 space-y-1 sm:space-y-0">
                <div className="flex items-center space-x-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <IoLocationOutline />
                    <span>{event.location}</span>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                    <div className="text-gray-400 text-sm mb-1">Attendance</div>
                    <div className="text-white text-xl font-semibold">{event?.expectedAttendees ?? '0'}</div>
                </div>
                <div>
                    <div className="text-gray-400 text-sm mb-1">Total Taps</div>
                    <div className="text-white text-xl font-semibold">{event?.clickCount ?? '0'}</div>
                </div>
                <div>
                    <div className="text-gray-400 text-sm mb-1">Engagement Rate</div>
                    <div className="text-white text-xl font-semibold">{engagementRate}%</div>
                </div>
                <div>
                    <div className="text-gray-400 text-sm mb-1">Organizer</div>
                    {event?.organizers?.length > 0 ? (
                        event.organizers.map((org) => (
                            <div key={org._id} className="text-white text-sm truncate">{org.userName}</div>
                        ))
                    ) : (
                        <div className="text-white text-sm">No Organizer Assigned</div>
                    )}
                </div>
            </div>

            {/* URLs */}
            <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-sm">
                    <span className="text-gray-400 flex gap-1 items-center mb-1 sm:mb-0"><LinkIcon /> Bracelet URL:</span>
                    <ActionButton label={event?.braceletUrl ?? 'N/A'} onClick={() => alert('Bracelet URL clicked')} />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-sm">
                    <span className="text-gray-400 flex gap-1 items-center mb-1 sm:mb-0"><LinkIcon /> Destination URL:</span>
                    <ActionButton label={event?.destinationUrl ?? 'N/A'} onClick={() => alert('Destination URL clicked')} />
                </div>
            </div>
        </div>
    );
};

export default EventCard;
// import React from "react";
// import { IoLocationOutline, IoSettingsOutline } from "react-icons/io5";
// import { AnalyticIcon, CalendarIcon, LinkIcon } from "../../assets/icons/icons";
// import IconButton from "./IconButton";
// import ActionButton from "./ActionButton";
// import Badge from "./Badge";

// const EventCard = ({ event, onEdit }) => {
//   const engagementRate = event?.expectedAttendees
//     ? ((event.clickCount / event.expectedAttendees) * 100).toFixed(2)
//     : "0.00";

//   return (
//     <div
//       className="
//         bg-[var(--color-surface-background)]
//         rounded-2xl
//         border border-[var(--border-color)]
//         p-5 sm:p-6
//         shadow-md hover:shadow-lg
//         transition-all duration-300 ease-in-out
//         hover:-translate-y-1
//         w-full
//         mx-auto
//       "
//     >
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
//         <div className="flex flex-wrap items-center  justify-between gap-3 sm:gap-4 w-full sm:w-auto">
//           <h3 className="text-lg sm:text-xl font-semibold text-white truncate">
//             {event.eventName}
//           </h3>
//           <Badge
//             label={event.status}
//             bgColor={
//               event.status === "Active"
//                 ? "bg-[#fafafa]"
//                 : event.status === "Completed"
//                 ? "bg-[#262626]"
//                 : "bg-transparent"
//             }
//             textColor={
//               event.status === "Active" ? "text-black" : "text-[#fafafa]"
//             }
//             borderColor={
//               event.status === "Upcoming" ? "border-gray-700 border" : ""
//             }
//           />
//         </div>

//         <div className="flex flex-wrap ">
//           <IconButton
//             icon={AnalyticIcon}
//             label="Analytics"
//             onClick={() => alert("Analytics clicked")}
//             hoverColor="hover:bg-gray-700"
//             bgColor="bg-[var(--color-surface-background)]"
//             border={true}
//           />
//           <IconButton
//             icon={IoSettingsOutline}
//             label="Edit"
//             onClick={onEdit}
//             hoverColor="hover:bg-gray-700"
//             bgColor="bg-[var(--color-surface-background)]"
//             border={true}
//           />
//         </div>
//       </div>

//       {/* Event Info */}
//       <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 text-sm text-gray-400 mb-5">
//         <div className="flex items-center gap-1">
//           <CalendarIcon className="w-4 h-4" />
//           <span>{event.date}</span>
//         </div>
//         <div className="flex items-center gap-1">
//           <IoLocationOutline />
//           <span>{event.location}</span>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
//         <div className="bg-[var(--color-surface-background)] rounded-xl p-3 text-center">
//           <div className="text-gray-400 text-sm mb-1">Attendance</div>
//           <div className="text-white text-xl font-semibold">
//             {event?.expectedAttendees ?? "0"}
//           </div>
//         </div>

//         <div className="bg-[var(--color-surface-background)] rounded-xl p-3 text-center">
//           <div className="text-gray-400 text-sm mb-1">Total Taps</div>
//           <div className="text-white text-xl font-semibold">
//             {event?.clickCount ?? "0"}
//           </div>
//         </div>

//         <div className="bg-[var(--color-surface-background)] rounded-xl p-3 text-center">
//           <div className="text-gray-400 text-sm mb-1">Engagement Rate</div>
//           <div className="text-white text-xl font-semibold">
//             {engagementRate}%
//           </div>
//         </div>

//         <div className="bg-[var(--color-surface-background)] rounded-xl p-3 text-center">
//           <div className="text-gray-400 text-sm mb-1">Organizer</div>
//           {event?.organizers?.length > 0 ? (
//             event.organizers.map((org) => (
//               <div key={org._id} className="text-white text-sm truncate">
//                 {org.userName}
//               </div>
//             ))
//           ) : (
//             <div className="text-white text-sm">No Organizer Assigned</div>
//           )}
//         </div>
//       </div>

//       {/* URLs */}
//       <div className="space-y-3">
//         <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
//           <span className="text-gray-400 flex gap-1 items-center">
//             <LinkIcon /> Bracelet URL:
//           </span>
//           <ActionButton
//             label={event?.braceletUrl ?? "N/A"}
//             onClick={() => alert("Bracelet URL clicked")}
//           />
//         </div>

//         <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
//           <span className="text-gray-400 flex gap-1 items-center">
//             <LinkIcon /> Destination URL:
//           </span>
//           <ActionButton
//             label={event?.destinationUrl ?? "N/A"}
//             onClick={() => alert("Destination URL clicked")}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventCard;
