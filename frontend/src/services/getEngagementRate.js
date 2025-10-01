export const getEngagementRate = (totalAttendance, totalTaps) => {
    const totalEngagement = totalAttendance > 0
        ? ((totalTaps / totalAttendance) * 100).toFixed(1) + '%'
        : '0.0%';

    return totalEngagement;
}
