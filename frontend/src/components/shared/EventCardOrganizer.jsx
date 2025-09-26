// // EventCard.js
// import React from 'react';

// import { IoLocationOutline } from "react-icons/io5";
// import IconButton from './IconButton';
// import ActionButton from './ActionButton';
// import { AnalyticIcon, CalendarIcon, DownloadIcon, LinkIcon, SettingsIcon, ShareIcon } from '../../assets/icons/icons';
// import { IoSettingsOutline } from "react-icons/io5";

// import Badge from './Badge';
// import UrlInput from './UrlInput';
// const EventCardOrganizer = ({ event }) => {
//     return (
//         <div className="bg-[var(--color-surface-background)] rounded-2xl border border-[var(--border-color)] p-6">
//             <div className="flex items-center justify-between mb-2">
//                 <div className="flex items-center space-x-3">
//                     <h3 className="text-md  text-[#fafafa]">{event.title}</h3>
//                     <Badge label={event.status} bgColor={event.status === 'Active' ? 'bg-[#fafafa]' : 'bg-[#262626]'} textColor={event.status === 'Active' ? 'text-black' : 'text-[#fafafa]'} />
//                 </div>
//                 <div className="flex items-center space-x-2">
//                     <IconButton
//                         icon={DownloadIcon}
//                         label="Export"
//                         onClick={() => alert('Analytics clicked')}
//                         hoverColor="hover:bg-gray-600"
//                         bgColor="bg-[var(--color-surface-background)]"
//                         border={true}
//                     />
//                     <IconButton
//                         // icon={IoSettingsOutline}
//                         label="View Analytics"
//                         onClick={() => alert('Edit clicked')}
//                         hoverColor="hover:bg-gray-600"
//                         bgColor="bg-[var(--color-surface-background)]"
//                         border={true}
//                     />
//                 </div>
//             </div>

//             <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
//                 <div className="flex items-center space-x-1">
//                     <CalendarIcon className="w-4 h-4" />
//                     <span>{event.date}</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                     <span><IoLocationOutline /></span>
//                     <span>{event.location}</span>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
//                 <div className='bg-[var(--color-surface-input)] flex flex-col items-center justify-center p-2 rounded-2xl'>
//                     <div className="text-xl text-[var(--color-primary)] font-semibold">{event.attendance}</div>

//                     <div className="text-gray-400 text-sm mb-1">Attendance</div>
//                 </div>
//                 <div className='bg-[var(--color-surface-input)] flex flex-col items-center justify-center p-2 rounded-2xl'>
//                     <div className="text-xl text-[var(--color-primary)] font-semibold">{event.taps}</div>

//                     <div className="text-gray-400 text-sm mb-1">Total Taps</div>
//                 </div>
//                 <div className='bg-[var(--color-surface-input)] flex flex-col items-center justify-center p-2 rounded-2xl'>
//                     <div className="text-xl text-[var(--color-primary)] font-semibold">{event.engagementRate}</div>

//                     <div className="text-gray-400 text-sm mb-1">Engagement Rate</div>
//                 </div>
//                 <div className='bg-[var(--color-surface-input)] flex flex-col items-center justify-center p-2 rounded-2xl'>
//                     <div className="text-xl text-[var(--color-primary)] font-semibold">{event.engagementRate}</div>

//                     <div className="text-gray-400 text-sm mb-1">Post-Event Retention</div>
//                 </div>
//                 {/* <div>
//                     <div className="text-gray-400 text-sm mb-1">Total Taps</div>
//                     <div className="text-white text-xl font-semibold">{event.taps}</div>
//                 </div>
//                 <div>
//                     <div className="text-gray-400 text-sm mb-1">Engagement Rate</div>
//                     <div className="text-white text-xl font-semibold">{event.engagementRate}</div>
//                 </div>
//                 <div>
//                     <div className="text-gray-400 text-sm mb-1">Organizer</div>
//                     <div className="text-white text-sm">{event.organizer}</div>
//                 </div> */}
//             </div>

//             <div className="space-y-2">
//                 <div className="flex  flex-col  space-x-2 text-sm">
//                     <span className="text-gray-400 flex gap-1 items-center mb-2"> Bracelet URL:</span>
//                     <div className='flex '>
//                         <UrlInput label={event.braceletUrl} onClick={() => alert('Bracelet URL clicked')} />
//                         <span className='bg-gray-400 p-2 flex justify-center align-middle rounded'><ShareIcon /></span>


//                     </div>
//                     <div className='text-white'>This URL is encoded in your NFC bracelets (read-only)</div>
//                 </div>
//                 <div className="flex items-center space-x-2 text-sm">
//                     <span className="text-gray-400 flex gap-1 items-center"><LinkIcon /> Destination URL:</span>
//                     <ActionButton label={event.destinationUrl} onClick={() => alert('Destination URL clicked')} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EventCardOrganizer;

// EventCardOrganizer.js
import React from 'react';
import { IoLocationOutline } from "react-icons/io5";
import IconButton from './IconButton';
import ActionButton from './ActionButton';
import { CalendarIcon, DownloadIcon, EditIcon, LinkIcon, ShareIcon } from '../../assets/icons/icons';
import Badge from './Badge';
import UrlInput from './UrlInput';

const EventCardOrganizer = ({ event }) => (
    <div className="bg-[var(--color-surface-background)] rounded-2xl border border-[var(--border-color)] p-6">
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
                <h3 className="text-md text-[#fafafa]">Platform Configuration</h3>
                {/* <Badge label={event.status} bgColor={event.status === 'Active' ? 'bg-[#fafafa]' : 'bg-[#262626]'} textColor={event.status === 'Active' ? 'text-black' : 'text-[#fafafa]'} /> */}
            </div>
            <div className="flex items-center space-x-2">
                <IconButton
                    icon={DownloadIcon}
                    label="Export"
                    onClick={() => alert('Export clicked')}
                    hoverColor="hover:bg-gray-600"
                    bgColor="bg-[var(--color-surface-background)]"
                    border={true}
                />
                <IconButton
                    color="text-[var(--color-primary)]"
                    label="View Analytics"
                    onClick={() => alert('View Analytics clicked')}
                    hoverColor="hover:bg-gray-600"
                    bgColor="bg-[var(--color-surface-background)]"
                    border={true}
                />
            </div>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
            <div className="flex items-center space-x-1">
                {/* <CalendarIcon className="w-4 h-4" /> */}
                {/* <span>{event.date}. {event.location}</span>
                <span>{event.date}. {event.location}</span> */}
                <span>2024-06-15 • Austin, TX</span>

            </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
            <div className='bg-[var(--color-surface-input)] flex flex-col items-center justify-center p-2 rounded'>
                <div className="text-2xl text-[var(--color-primary)] font-semibold">{event.attendance}</div>
                <div className="text-gray-400 text-sm mb-1">Attendance</div>
            </div>
            <div className='bg-[var(--color-surface-input)] flex flex-col items-center justify-center p-2 rounded'>
                <div className="text-2xl text-[var(--color-primary)] font-semibold">{event.taps}</div>
                <div className="text-gray-400 text-sm mb-1">Total Taps</div>
            </div>
            <div className='bg-[var(--color-surface-input)] flex flex-col items-center justify-center p-2 rounded'>
                <div className="text-2xl text-[var(--color-primary)] font-semibold">{event.engagementRate}</div>
                <div className="text-gray-400 text-sm mb-1">Engagement Rate</div>
            </div>
            <div className='bg-[var(--color-surface-input)] flex flex-col items-center justify-center p-2 rounded'>
                <div className="text-2xl text-[var(--color-primary)] font-semibold">{event.engagementRate}</div>
                <div className="text-gray-400 text-sm mb-1">Post-Event Retention</div>
            </div>
        </div>

        <div className="space-y-2">
            <div className="flex flex-col space-x-2 text-sm">
                <span className="text-[#FAFAFA] flex gap-1 items-center mb-2 ">Bracelet URL:</span>
                <div className='flex gap-2'>
                    <div className='flex-1 w-full'> <UrlInput label={event.braceletUrl} />
                    </div>
                    <span className=' border border-[var(--border-color)] p-2 flex justify-center align-middle rounded hover:bg-gray-600 cursor-pointer'><ShareIcon /></span>
                </div>
                <div className='text-[var(--color-grey)] text-xs mt-2'>This URL is encoded in your NFC bracelets (read-only)</div>
            </div>
            <div className="flex flex-col space-x-2 text-sm">
                <span className="text-white flex gap-1 items-center mb-2">Destination URL:</span>
                <div className='flex gap-2'>
                    <div className='flex-1 w-full'> <UrlInput label={event.braceletUrl} />
                    </div>
                    <span className=' border border-[var(--border-color)] p-2 flex justify-center align-middle rounded hover:bg-gray-600 cursor-pointer'><EditIcon /></span>

                    <span className=' border border-[var(--border-color)] p-2 flex justify-center align-middle rounded hover:bg-gray-600 cursor-pointer'><ShareIcon /></span>
                </div>
                <div className='text-[var(--color-grey)] text-xs mt-2'>Where attendees are redirected when they tap their bracelet</div>
            </div>
            {/* <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-400 flex gap-1 items-center"><LinkIcon /> Destination URL:</span>
                <ActionButton label={event.destinationUrl} onClick={() => alert('Destination URL clicked')} />
            </div> */}
        </div>

        <div className="flex justify-between mt-6 gap-2 ">
            <button className="bg-transparent text-white border border border-[var(--border-color)] rounded px-4 py-2 w-full hover:bg-gray-600 cursor-pointer">View Full Analytics</button>
            <button className="bg-transparent text-white border border border-[var(--border-color)] rounded px-4 py-2 flex items-center w-full gap-2 justify-center hover:bg-gray-600 cursor-pointer"><DownloadIcon className="w-4 h-4 mr-2" /> Export Data</button>
        </div>
    </div>
);

export default EventCardOrganizer;
