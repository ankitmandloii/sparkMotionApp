// import React from 'react';
// import { Calendar, Users, BarChart3, Settings, LogOut } from 'lucide-react';
// import { AnalyticIcon, CalendarIcon, PeopleIcon } from '../assets/icons/icons';
// import Badge from '../components/shared/Badge';
// // import backgroundImg from './images/BackgroundLoginImage.png';
// // import backgroundImg from './images/bg-dashboard.jpg';
// // import whiteLogo from './images/whiteLogo.png'


// const Overview = () => {
//     return (
//         <div className="min-h-screen text-white m-5 w-full" style={{
//             // backgroundImage: `url(${backgroundImg})`,
//             backgroundSize: 'cover', // Optional: Ensures the image covers the div
//             backgroundPosition: 'center', // Optional: Centers the image
//             backgroundRepeat: 'no-repeat', // Optional: Prevents tiling
//         }}>


//             {/* Header */}




//             {/* Main Content */}
//             <main className=" pb-6">
//                 <h2 className="text-2xl font-semibold mb-6">Overview</h2>

//                 {/* Stats Cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                     {/* Total Events */}
//                     <div className="bg-[var(--color-surface-background)] rounded-2xl p-3 border border-[var(--border-color)]">
//                         <div className="flex items-center justify-between mb-4">
//                             <h3 className="text-gray-400 text-sm font-medium">Total Events</h3>
//                             {/* <Calendar className="w-5 h-5 text-gray-500" /> */}
//                             <CalendarIcon className="w-6 h-6 " />
//                         </div>
//                         <div className="text-2xl font-bold text-white mb-1">3</div>
//                         <p className="text-gray-400 text-sm">1 active</p>
//                     </div>

//                     {/* Total Attendance */}
//                     <div className="bg-[var(--color-surface-background)] rounded-2xl p-3 border border-[var(--border-color)] ">
//                         <div className="flex items-center justify-between mb-4">
//                             <h3 className="text-gray-400 text-sm font-medium">Total Attendance</h3>
//                             {/* <Users className="w-5 h-5 text-gray-500" /> */}
//                             <PeopleIcon className="w-6 h-6 " />
//                         </div>
//                         <div className="text-2xl font-bold text-white mb-1">30,500</div>
//                         <p className="text-gray-400 text-sm">Across all events</p>
//                     </div>

//                     {/* Total Taps */}
//                     <div className="bg-[var(--color-surface-background)] rounded-2xl p-3 border border-[var(--border-color)]">
//                         <div className="flex items-center justify-between mb-4">
//                             <h3 className="text-gray-400 text-sm font-medium">Total Taps</h3>
//                             <AnalyticIcon className="w-6 h-6 " />
//                         </div>
//                         <div className="text-2xl font-bold text-white mb-1">19,175</div>
//                         <p className="text-gray-400 text-sm">82.9% engagement rate</p>
//                     </div>

//                     {/* Active Organizers */}
//                     <div className="bg-[var(--color-surface-background)] rounded-2xl p-3 border border-[var(--border-color)]">
//                         <div className="flex items-center justify-between mb-4">
//                             <h3 className="text-gray-400 text-sm font-medium">Active Organizers</h3>
//                             <PeopleIcon className="w-6 h-6 " />

//                         </div>
//                         <div className="text-2xl font-bold text-white mb-1">3</div>
//                         <p className="text-gray-400 text-sm">Registered organizers</p>
//                     </div>
//                 </div>

//                 {/* Recent Events Table */}
//                 <div className="bg-[var(--color-surface-background)] rounded-2xl border border-[var(--border-color)]  p-5 ">
//                     <div className="">
//                         <h3 className="text-md  text-white">Recent Events</h3>
//                         <p className="text-[var(--color-grey)] text-sm mt-1 mb-1">Latest SparkMotion events and their performance</p>
//                     </div>

//                     <div className="overflow-x-auto ">
//                         <table className="w-full">
//                             <thead>
//                                 <tr className="border-b border-[var(--border-color)]">
//                                     <th className="text-left py-4 px-6 text-[var(--color-active)] text-sm font-medium">Event</th>
//                                     <th className="text-left py-4 px-6 text-[var(--color-active)] text-sm font-medium">Date</th>
//                                     <th className="text-left py-4 px-6 text-[var(--color-active)] text-sm font-medium">Status</th>
//                                     <th className="text-left py-4 px-6 text-[var(--color-active)] text-sm font-medium">Attendance</th>
//                                     <th className="text-left py-4 px-6 text-[var(--color-active)] text-sm font-medium">Taps</th>
//                                     <th className="text-left py-4 px-6 text-[var(--color-active)] text-sm font-medium">Engagement</th>
//                                     <th className="text-left py-4 px-6 text-[var(--color-active)] text-sm font-medium">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr className="border-b border-[var(--border-color)] hover:bg-gray-750 ">
//                                     <td className="py-4 px-6">
//                                         <div>
//                                             <div className="text-white font-medium">Summer Music Festival 2024</div>
//                                             <div className="text-gray-400 text-sm">Austin, TX</div>
//                                         </div>
//                                     </td>
//                                     <td className="py-4 px-6 text-gray-300">2024-06-15</td>
//                                     <td className="py-4 px-6">
//                                         <Badge label="Active" bgColor="bg-[#fafafa]" textColor="text-black" />
//                                     </td>
//                                     <td className="py-4 px-6 text-gray-300">25,000</td>
//                                     <td className="py-4 px-6 text-gray-300">18,750</td>
//                                     <td className="py-4 px-6 text-gray-300">75.0%</td>
//                                     <td className="py-4 px-6">
//                                         <button className="text-[var(--color-primary-dark)] hover:text-orange-300 text-sm">
//                                             View Analytics
//                                         </button>
//                                     </td>
//                                 </tr>
//                                 <tr className="border-b border-gray-700 hover:bg-gray-750">
//                                     <td className="py-4 px-6">
//                                         <div>
//                                             <div className="text-white font-medium">Charity Gala 2024</div>
//                                             <div className="text-gray-400 text-sm">New York, NY</div>
//                                         </div>
//                                     </td>
//                                     <td className="py-4 px-6 text-gray-300">2024-05-20</td>
//                                     <td className="py-4 px-6">
//                                         {/* <span className="bg-[#262626] text-[#fafafa] px-2 py-1 rounded text-xs font-medium">
//                                             completed
//                                         </span> */}
//                                         <Badge label="Completed" bgColor="bg-[#262626]" textColor="text-[#fafafa]" />
//                                     </td>
//                                     <td className="py-4 px-6 text-gray-300">500</td>
//                                     <td className="py-4 px-6 text-gray-300">425</td>
//                                     <td className="py-4 px-6 text-gray-300">85.0%</td>
//                                     <td className="py-4 px-6">
//                                         <button className="text-[var(--color-primary-dark)] hover:text-orange-300 text-sm">
//                                             View Analytics
//                                         </button>
//                                     </td>
//                                 </tr>
//                                 <tr className="hover:bg-gray-750">
//                                     <td className="py-4 px-6">
//                                         <div>
//                                             <div className="text-white font-medium">Tech Conference 2024</div>
//                                             <div className="text-gray-400 text-sm">San Francisco, CA</div>
//                                         </div>
//                                     </td>
//                                     <td className="py-4 px-6 text-gray-300">2024-07-10</td>
//                                     <td className="py-4 px-6">
//                                         <Badge label="Upcoming" borderColor="border-gray-700" textColor="text-gray-300" />
//                                     </td>
//                                     <td className="py-4 px-6 text-gray-300">5,000</td>
//                                     <td className="py-4 px-6 text-gray-300">0</td>
//                                     <td className="py-4 px-6 text-gray-300">0.0%</td>
//                                     <td className="py-4 px-6">
//                                         <button className="text-[var(--color-primary-dark)] hover:text-orange-300 text-sm">
//                                             View Analytics
//                                         </button>
//                                     </td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>

//                 {/* Bottom Right Corner Notification */}
//                 <div className="fixed bottom-4 right-4 bg-gray-800 border border-gray-700 rounded-lg p-2 shadow-lg max-w-xs">
//                     <div className="text-white text-sm font-medium mb-1">Activate Windows</div>
//                     <div className="text-gray-400 text-xs">Go to Settings to activate Windows.</div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Overview;

import React from 'react';
import { CalendarIcon, PeopleIcon, AnalyticIcon } from '../assets/icons/icons';
import StatCard from '../components/shared/StatsCard';
import Badge from '../components/shared/Badge';

const Overview = () => {
    const tableData = [
        {
            event: "Summer Music Festival 2024",
            date: "2024-06-15",
            status: "Active",
            attendance: "25,000",
            taps: "18,750",
            engagement: "75.0%",
        },
        {
            event: "Charity Gala 2024",
            date: "2024-05-20",
            status: "Completed",
            attendance: "500",
            taps: "425",
            engagement: "85.0%",
        },
        {
            event: "Tech Conference 2024",
            date: "2024-07-10",
            status: "Upcoming",
            attendance: "5,000",
            taps: "0",
            engagement: "0.0%",
        },
        {
            event: "Tech Conference 2024",
            date: "2024-07-10",
            status: "Upcoming",
            attendance: "5,000",
            taps: "0",
            engagement: "0.0%",
        },
        {
            event: "Tech Conference 2024",
            date: "2024-07-10",
            status: "Upcoming",
            attendance: "5,000",
            taps: "0",
            engagement: "0.0%",
        },
    ];

    return (
        <div className="text-white m-4 w-full">
            <main>
                <h2 className="text-2xl font-semibold mb-2">Overview</h2>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-3">
                    <StatCard title="Total Events" value="3" icon={CalendarIcon} description="1 active" />
                    <StatCard title="Total Attendance" value="30,500" icon={PeopleIcon} description="Across all events" />
                    <StatCard title="Total Taps" value="19,175" icon={AnalyticIcon} description="82.9% engagement rate" />
                    <StatCard title="Active Organizers" value="3" icon={PeopleIcon} description="Registered organizers" />
                </div>

                {/* Recent Events Table */}
                <div className="bg-[var(--color-surface-background)] rounded-2xl border border-[var(--border-color)] p-3">
                    <div>
                        <h3 className="text-md text-white">Recent Events</h3>
                        <p className="text-[var(--color-grey)] text-sm mt-1 mb-1">Latest SparkMotion events and their performance</p>
                    </div>

                    {/* Table with fixed header and scrollable body */}
                    <div className="overflow-x-auto max-h-[280px] no-scrollbar">
                        <table className="w-full table-fixed">
                            <thead className="sticky top-0 bg-[var(--color-surface-background)]">
                                <tr className="border-b border-[var(--border-color)]">
                                    <th className="text-left py-4 px-6 text-[var(--color-active)] text-sm font-medium w-1/3">Event</th>
                                    <th className="text-left py-4 px-6 text-[var(--color-active)] text-sm font-medium w-1/6">Date</th>
                                    <th className="text-left py-4 px-6 text-[var(--color-active)] text-sm font-medium w-1/6">Status</th>
                                    <th className="text-left py-4 px-6 text-[var(--color-active)] text-sm font-medium w-1/6">Attendance</th>
                                    <th className="text-left py-4 px-6 text-[var(--color-active)] text-sm font-medium w-1/6">Taps</th>
                                    <th className="text-left py-4 px-6 text-[var(--color-active)] text-sm font-medium w-1/6">Engagement</th>
                                    <th className="text-left py-4 px-6 text-[var(--color-active)] text-sm font-medium w-1/6">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="overflow-y-auto">
                                {tableData.map((data, index) => (
                                    <tr key={index} className="border-b border-[var(--border-color)] hover:bg-gray-750">
                                        <td className="py-4 px-6 w-1/3">
                                            <div>
                                                <div className="text-white font-medium">{data.event}</div>
                                                <div className="text-gray-400 text-sm">{data.location || "N/A"}</div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 w-1/6 text-gray-300">{data.date}</td>
                                        <td className="py-4 px-6 w-1/6">
                                            <Badge
                                                label={data.status}
                                                bgColor={data.status === "Active" ? "bg-[#fafafa]" : data.status === "Completed" ? "bg-[#262626]" : "bg-transparent"}
                                                textColor={data.status === "Active" ? "text-black" : "text-white"}
                                                borderColor={data.status === "Upcoming" ? "border-gray-700" : ""}
                                            />

                                            {/* <Badge label={data.status} bgColor={data.status === "Active" ? "bg-[#fafafa]" : "bg-[#262626]"} textColor="text-black" /> */}
                                        </td>
                                        <td className="py-4 px-6 w-1/6 text-gray-300">{data.attendance}</td>
                                        <td className="py-4 px-6 w-1/6 text-gray-300">{data.taps}</td>
                                        <td className="py-4 px-6 w-1/6 text-gray-300">{data.engagement}</td>
                                        <td className="py-4 px-6 w-1/6">
                                            <button className="text-[var(--color-primary-dark)] hover:text-orange-300 text-sm">View Analytics</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Overview;