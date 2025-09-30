import React, { useEffect, useState } from 'react'
import StatCard from '../components/shared/StatsCard'
import { CalendarIcon, PeopleIcon, AnalyticIcon, DownloadIcon } from '../assets/icons/icons'
import GridDemo from './GridDemo'
import { useLocation, useNavigate, useParams } from 'react-router'
import { FaArrowLeftLong } from "react-icons/fa6";
import IconButton from '../components/shared/IconButton'
import { useSelector } from 'react-redux'
import { apiConnecter } from '../services/apiConnector'
const Analytics = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const userInfo = useSelector((state) => state.userInfo)
    const [totalTaps, setTotaltaps] = useState();
    const [engagementRate, setengagementRate] = useState();
    const [postClick, setpostClick] = useState();
    const [attendance, setAttendance] = useState();
    const [analyticsData, setAnalyticsData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        setTotaltaps(state?.totalTaps)
        setengagementRate(state?.engagementRate)
        setpostClick(state?.postClickRate)
        setAttendance(state?.attendance);
    }, [state])

    const getClickAnalysis = async () => {
        // setLoading(true);
        try {
            // console.log(userInfo);

            const response = await apiConnecter("GET", `${process.env.REACT_APP_GET_CLICK_ANALYTICS_BY_ID_END_POINT}/${id}`,
                null, { authorization: `Bearer ${userInfo.token}` });
            console.log("get REACT_APP_GET_CLICK_ANALYTICS_BY_ID_END_POINT response", response);
            // setSuccess(response.data.message);
            // setEventData(response.data.result);
            // setFilteredEvents(response.data.result);
        } catch (err) {
            // setError({ title: "Error", message: err?.response?.data?.message ?? err.message });
        } finally {
            // setLoading(false);
        }
    };
    useEffect(() => {
        getClickAnalysis();
    }, [])
    return (
        <div className='w-full m-5' >
            <div className="flex gap-2 flex-wrap justify-between mb-2">
                <h2 className="text-2xl font-semibold text-white  flex gap-3 cursor-pointer  "><span className='mt-1' onClick={() => navigate(-1)}><FaArrowLeftLong /></span>Event Analytics </h2>
                <IconButton
                    icon={DownloadIcon}
                    label="Export"
                    onClick={() => { }}
                    hoverColor="hover:bg-gray-600"
                    bgColor="bg-[var(--color-surface-background)]"
                    border={true}
                // disabled={loading}
                />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-3">
                <StatCard title="Total Taps" value={totalTaps} icon={CalendarIcon} description="+125 in last 24h" />
                <StatCard title="Engagement Rate" value={engagementRate} icon={PeopleIcon} description={`${totalTaps} of ${attendance} attendees`} />
                <StatCard title="Total Taps" value={postClick} icon={AnalyticIcon} description="Still engaging after event" />
                {/* <StatCard title=" Active Organizers" value="3" icon={PeopleIcon} description="4,500 taps during peak hour" /> */}
            </div>

            <GridDemo eventId={id} />
        </div>
    )
}

export default Analytics

