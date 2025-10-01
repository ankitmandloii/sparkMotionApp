import { useNavigate } from "react-router";


export const handleAnalyticsClick = (eventId, taps, engagement, postClick, attendance, navigate) => {
    // console.log("-----Analyytaps", taps);
    // console.log("-----Analyytaps2", engagement);
    console.log("-----postClick", postClick);
    console.log("-----attendance", eventId, taps, engagement, postClick, attendance);

    const tapsNum = Number(taps) || 0;
    const postClickNum = Number(postClick) || 0;
    const attendanceNum = Number(String(attendance).replace(/,/g, '')) || 0;
    // const engagementNum = Number(engagement) || 0;
    // const attendanceNum = Number(attendance) || 0;

    // rate in %
    // const postClickRate = tapsNum > 0 ? (postClickNum / tapsNum) * 100 : 0;
    // const postClickRate = tapsNum > 0 ? (tapsNum / postClickNum) * 100 : 0;
    const postClickRate = attendance > 0 ? ((postClickNum / attendanceNum) * 100).toFixed(2) : 0;

    console.log("---------postRate", postClickNum, tapsNum, postClickNum);

    navigate(`/analytics/${eventId}`, {
        state: {
            totalTaps: tapsNum,
            engagementRate: `${engagement}`,
            postClickRate: `${postClickRate}`, // e.g., 42.86
            // postClickCount: postClickNum,
            attendance: attendance,
        }
    });
};