import React from 'react'
import IconButton from '../components/shared/IconButton'
// import { PlusIcon } from '../assets/icons/icons'
// import { IoLocationOutline } from "react-icons/io5";
// import { CalendarIcon, DownloadIcon, EditIcon, LinkIcon, ShareIcon } from '../../assets/icons/icons';
import UrlInput from '../components/shared/UrlInput';
// import logo from '../assets/images/sparkmotion-logo-white.png';
import logo from "../assets/logos/WhiteLogo.png"
import { PlusIcon } from 'lucide-react';



const Settings = () => {
    const event =
    {
        title: "Summer Music Festival 2024",
        status: "Active",
        date: "2024-06-15",
        location: "Austin, TX",
        attendance: "25,000",
        taps: "18,750",
        engagementRate: "75.0%",
        organizer: "organizer@event.com",
        braceletUrl: "https://r.sparkmotion.app/smf2024",
        destinationUrl: "https://summerfest.com/engage",
        analyticsIcon: '', // Replace with actual icon
    }
    return (
        <div className='w-full m-4'>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-semibold text-white">Settings</h2>
                    <p className="text-gray-400 text-sm mt-1">Configure SparkMotion platform settings</p>
                </div>

            </div>


            <div className="bg-[var(--color-surface-background)] rounded-2xl border border-[var(--border-color)] p-6">
                <h3 className="text-md text-[#fafafa]">Change Password</h3>
                {/* <p className="text-gray-400 text-sm mt-1">Global settings for the SparkMotion platform</p> */}



                <div className="space-y-2 mt-4 ">
                    <div className="flex flex-col space-x-2 text-sm">
                        <span className="text-[#FAFAFA] flex gap-1 items-center mb-2 ">Old Password</span>
                        <div className='flex gap-2'>
                            <div className='flex-1 w-full'> <UrlInput label={event.braceletUrl} />

                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-x-2 text-sm mt-4 mb-4">
                        <span className="text-white flex gap-1 items-center mb-2">New Password:</span>
                        <div className='flex gap-2'>
                            <div className='flex-1 w-full'> <UrlInput label={event.braceletUrl} />
                                {/* {/* </div> */}

                            </div>
                        </div>

                    </div>
                    <IconButton
                        icon={PlusIcon}
                        label="Change Password"
                        onClick={() => alert('Add Organizer clicked')}
                        hoverColor="hover:bg-orange-600"
                    />


                </div >


                {/* <div className="space-y-2 mt-4">
                    <div className="flex flex-col space-x-2 text-sm">
                        <span className="text-[#FAFAFA] flex gap-1 items-center mb-2 ">Base Redirect URL:</span>
                        <div className='flex gap-2'>
                            <div className='flex-1 w-full'> <UrlInput label={event.braceletUrl} />

                            </div>
                        </div>
                        <div className='text-[var(--color-grey)] text-xs mt-2'>Base URL for NFC bracelet redirects</div>
                    </div>
                    <div className="flex flex-col space-x-2 text-sm mt-4">
                        <span className="text-white flex gap-1 items-center mb-2">Analytics API Endpoint:</span>
                        <div className='flex gap-2'>
                            <div className='flex-1 w-full'> <UrlInput label={event.braceletUrl} />
                                {/* {/* </div> */}

                {/* </div>
                        </div>

                    </div> */}


                {/* </div >  */}




            </div >

            <div className="bg-[var(--color-surface-background)] rounded-2xl border border-[var(--border-color)] p-6 mt-3">
                <h3 className="text-md text-[#fafafa]">Brand Settings</h3>
                <p className="text-gray-400 text-sm mt-1">Customize the SparkMotion brand appearance</p>

                <div className="flex items-center space-x-3 mt-4">
                    <div className="w-10 h-10 bg-[var(--color-primary)] rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm"><img className="h-6" src={logo} /></span>
                    </div>
                    <div >
                        <h1 className="text-sm font-semibold text-white">SparkMotion Logo</h1>
                        <p className="text-sm text-gray-400">Current brand mark</p>
                    </div>
                </div>









            </div >
        </div>

    )
}

export default Settings