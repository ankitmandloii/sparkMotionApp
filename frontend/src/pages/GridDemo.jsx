import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, BarChart, Bar } from 'recharts';
import { apiConnecter } from '../services/apiConnector';
import { useSelector } from 'react-redux';

// Hook: fetches click timeline
function useClickTimeline({ eventId }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const userInfo = useSelector((state) => state.userInfo);
    const token = userInfo?.token;

    useEffect(() => {
        const fetchClickTimeline = async () => {
            if (!eventId) {
                setError('Event Id Not Found');
                return;
            }
            // if (!token) {
            //     setError('Auth token missing');
            //     return;
            // }

            setLoading(true);
            setError(null);
            try {
                const url = `${process.env.REACT_APP_GET_CLICK_TIMELINE_ANALYTICS_BY_ID_END_POINT}/${eventId}`;
                const res = await apiConnecter('GET', url, null, { authorization: `Bearer ${userInfo.token}` });
                // console.log("----res2222222", res)

                if (res?.data?.status) {
                    setData(res.data.result);
                } else {
                    setError(res?.data?.message || 'Failed to fetch analytics data');
                }
            } catch (err) {
                console.error('ClickTimeline fetch error:', err);
                setError(err?.response?.data?.message ?? 'Failed to fetch analytics data');
            } finally {
                setLoading(false);
            }
        };

        fetchClickTimeline();
    }, [eventId, token]);

    return { data, loading, error };
}

// Normalizer for your actual response shape (objects → arrays)
function useNormalizedTimeline(raw) {
    return useMemo(() => {
        if (!raw) return { hourly: [], daily: [], monthly: [] };

        const objToArray = (obj) =>
            Object.entries(obj || {}).map(([k, v]) => ({
                date: String(k),
                rate: Number(v) || 0,
            }));

        const hourly = objToArray(raw.hourlyData);
        const daily = objToArray(raw.dailyData);
        const monthly = objToArray(raw.monthlyData);

        return { hourly, daily, monthly };
    }, [raw]);
}

// Geographic Distribution (now uses API data)
const GeographicChart = ({ eventId, token }) => {
    const { data: raw, loading, error } = useClickTimeline({ eventId, token });
    const [geoView, setGeoView] = useState('country');

    // Build Intl region name resolver once
    const regionFmt = useMemo(() => {
        try { return new Intl.DisplayNames(['en'], { type: 'region' }); } catch (_) { return null; }
    }, []);

    const cityData = useMemo(
        () => Object.entries(raw?.cityData || {}).map(([name, value]) => ({ name, value: Number(value) || 0 })),
        [raw]
    );

    const countryData = useMemo(
        () => Object.entries(raw?.countryData || {}).map(([code, value]) => ({
            name: code === 'Unknown' ? 'Unknown' : (regionFmt?.of(code) || code),
            code,
            value: Number(value) || 0,
        })),
        [raw, regionFmt]
    );
    const CustomBarTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-900 border border-gray-600 rounded-lg p-3 shadow-lg">
                    <p className="text-white text-sm font-medium">{payload[0].payload.name}</p>
                    <p className="text-orange-400 text-sm">
                        {`Taps: ${payload[0].value}`}
                    </p>
                    {geoView === 'country' && payload[0].payload.code !== 'Unknown' && (
                        <p className="text-gray-400 text-xs mt-1">
                            {`Country Code: ${payload[0].payload.code}`}
                        </p>
                    )}
                </div>
            );
        }
        return null;
    };

    const currentData = geoView === 'country' ? countryData : cityData;

    const GeoViewSelector = () => {
        const [isOpen, setIsOpen] = useState(false);
        const options = [
            { value: 'country', label: 'By Country' },
            { value: 'city', label: 'By City' },
        ];
        const currentOption = options.find((opt) => opt.value === geoView);

        return (
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors border border-gray-600"
                >
                    <span className="text-sm font-medium">{currentOption?.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                    <div className="absolute top-full mt-2 right-0 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-10 min-w-[140px]">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => {
                                    setGeoView(option.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${geoView === option.value ? 'bg-gray-700 text-orange-400' : 'text-white'}`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="bg-[var(--color-surface-background)] border border-[var(--border-color)] rounded-lg  p-6 relative">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-white">Geographic Distribution</h3>
                    <p className="text-gray-400 text-sm">Tap activity by {geoView === 'country' ? 'country' : 'city'}</p>
                </div>
                <GeoViewSelector />
            </div>

            {/* {loading && <div className="h-96 flex items-center justify-center text-gray-400 text-sm">Loading…</div>} */}
            {loading && <div className="h-96 flex items-center justify-center text-gray-400 text-sm">
                <div className="loader"></div>
            </div>}

            {error && !loading && <div className="h-96 flex items-center justify-center text-red-400 text-sm">{error}</div>}

            {!loading && !error && (
                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={currentData} margin={{ top: 20, right: 30, left: 60, bottom: 5 }} layout="vertical">
                            <CartesianGrid strokeDasharray="1 1" stroke="#333333" horizontal={false} vertical={true} />
                            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} domain={[0, 'auto']} />
                            <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#ffffff', fontSize: 12 }} width={120} />
                            {/* <Tooltip /> */}
                            <Tooltip
                                content={<CustomBarTooltip />}
                                cursor={{ fill: 'transparent' }}
                            />
                            <Bar dataKey="value" fill="#ff6b35" radius={[0, 4, 4, 0]} barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

        </div>
    );
};

// Engagement Timeline
const EngagementChart = ({ eventId, token }) => {
    const { data: raw, loading, error } = useClickTimeline({ eventId, token });
    const { hourly, daily, monthly } = useNormalizedTimeline(raw);
    const [timeRange, setTimeRange] = useState('daily');

    const data = useMemo(() => {
        switch (timeRange) {
            case 'hourly': return hourly;
            case 'monthly': return monthly;
            default: return daily;
        }
    }, [timeRange, hourly, daily, monthly]);

    // Dropdown selector restored with Hourly/Daily/Monthly options
    const TimeRangeSelector = () => {
        const [isOpen, setIsOpen] = useState(false);
        const options = [
            { value: 'hourly', label: 'Hourly Data' },
            { value: 'daily', label: 'Daily Data' },
            // { value: 'monthly', label: 'Monthly Data' },
        ];
        const currentOption = options.find((opt) => opt.value === timeRange);

        return (
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors border border-gray-600"
                >
                    <span className="text-sm font-medium">{currentOption?.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                    <div className="absolute top-full mt-2 right-0 bg-[var(--color-surface-background)] border border-[var(--border-color)] rounded-lg shadow-lg z-10 min-w-[140px]">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => { setTimeRange(option.value); setIsOpen(false); }}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${timeRange === option.value ? 'bg-gray-700 text-orange-400' : 'text-white'}`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const getTooltipLabel = () => (timeRange === 'hourly' ? 'Time' : timeRange === 'monthly' ? 'Month' : 'Date');
            const getEngagementUnit = () => (timeRange === 'hourly' ? 'taps/hour' : timeRange === 'monthly' ? 'taps/month' : 'taps/day');
            return (
                <div className="bg-gray-900 border border-[var(--border-color)] rounded-lg p-3 shadow-lg">
                    <p className="text-white text-sm font-medium">{`${getTooltipLabel()}: ${label}`}</p>
                    <p className="text-orange-400 text-sm">{`Engagement: ${payload[0].value} ${getEngagementUnit()}`}</p>
                    <p className="text-gray-400 text-xs mt-1">{payload[0].value >= 15 ? 'Peak activity period' : 'Normal activity'}</p>
                </div>
            );
        }
        return null;
    };


    return (
        <div className="bg-[var(--color-surface-background)] border border-[var(--border-color)] rounded-lg  p-6 relative">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-white">Engagement Timeline</h3>
                    <p className="text-gray-400 text-sm">Tap activity over time (API data) – {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)} view</p>
                </div>
                <TimeRangeSelector />
            </div>

            {loading && <div className="h-64 flex items-center justify-center text-gray-400"><div className="loader"></div></div>}
            {error && !loading && <div className="h-64 flex items-center justify-center text-red-400">{error}</div>}

            {!loading && !error && (
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="1 1" stroke="#333333" />
                            <XAxis dataKey="date" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                            <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line type="monotone" dataKey="rate" stroke="#ff6b35" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

const Analytics = ({ eventId, token }) => {
    return (
        <div className="min-h-screen text-white">
            <EngagementChart eventId={eventId} token={token} />
            <div className="mt-6">
                <GeographicChart eventId={eventId} token={token} />
            </div>
        </div>
    );
};

export default Analytics;

