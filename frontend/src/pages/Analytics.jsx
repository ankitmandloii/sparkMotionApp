import React, { useEffect, useState } from 'react'
import StatCard from '../components/shared/StatsCard'
import { CalendarIcon, PeopleIcon, AnalyticIcon } from '../assets/icons/icons'
import GridDemo from './GridDemo'
import { useLocation, useParams } from 'react-router'

const Analytics = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const [totalTaps, setTotaltaps] = useState();
    const [engagementRate, setengagementRate] = useState();

    useEffect(() => {
        setTotaltaps(state?.totalTaps)
        setengagementRate(state?.engagementRate)
    }, [state])
    // console.log("----taps", totalTaps)
    return (
        <div className='w-full m-5' >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-3">
                <StatCard title="Total Taps" value={totalTaps} icon={CalendarIcon} description="+125 in last 24h" />
                <StatCard title="Engagement Rate" value={engagementRate} icon={PeopleIcon} description="18,750 of 25,000 attendees" />
                <StatCard title="Total Taps" value="19,175" icon={AnalyticIcon} description="Still engaging after event" />
                <StatCard title=" Active Organizers" value="3" icon={PeopleIcon} description="4,500 taps during peak hour" />
            </div>

            <GridDemo eventId={id} />
        </div>
    )
}

export default Analytics

