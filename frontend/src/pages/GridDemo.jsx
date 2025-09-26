import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

// Simulate your API response
const apiResponse = {
    "result": {
        "dailyData": {
            "2025-09-26": 10,
            "2025-09-25": 15,
            "2025-09-24": 12,
            "2025-09-23": 8,
            "2025-09-22": 7,
            "2025-09-21": 5,
            "2025-09-20": 11,
            "2025-09-19": 18,
            "2025-09-18": 14,
            "2025-09-17": 16
        },
        "hourlyData": {
            "2025-09-26 11": 10,
            "2025-09-26 12": 15,
            "2025-09-26 13": 14,
            "2025-09-26 14": 13,
            "2025-09-26 15": 18,
            "2025-09-26 16": 20,
            "2025-09-26 17": 22,
            "2025-09-26 18": 24,
            "2025-09-26 19": 19,
            "2025-09-26 20": 16,
            "2025-09-26 21": 14,
            "2025-09-26 22": 12
        },
        "monthlyData": {
            "2025-09": 10,
            "2025-08": 15,
            "2025-07": 20,
            "2025-06": 18,
            "2025-05": 25,
            "2025-04": 22,
            "2025-03": 30,
            "2025-02": 28,
            "2025-01": 27,
            "2024-12": 24,
            "2024-11": 21,
            "2024-10": 19
        }
    }
};


const EngagementChart = () => {
    const [timeRange, setTimeRange] = useState('daily');

    // Function to transform API data into the required format
    const formatData = (data, range) => {
        if (range === 'hourly') {
            return Object.keys(data).map(key => ({
                date: key,
                rate: data[key],
            }));
        }
        if (range === 'daily') {
            return Object.keys(data).map(key => ({
                date: key,
                rate: data[key],
            }));
        }
        if (range === 'monthly') {
            return Object.keys(data).map(key => ({
                date: key,
                rate: data[key],
            }));
        }
        return [];
    };

    // Select the correct dataset based on the time range
    const data = formatData(apiResponse.result[`${timeRange}Data`], timeRange);

    // Custom dropdown component
    const TimeRangeSelector = () => {
        const [isOpen, setIsOpen] = useState(false);

        const options = [
            { value: 'hourly', label: 'Hourly Data' },
            { value: 'daily', label: 'Daily Data' },
            { value: 'monthly', label: 'Monthly Data' }
        ];

        const currentOption = options.find(opt => opt.value === timeRange);

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
                                    setTimeRange(option.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${timeRange === option.value ? 'bg-gray-700 text-orange-400' : 'text-white'
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // Custom tooltip component with dynamic labels
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-900 border border-gray-600 rounded-lg p-3 shadow-lg">
                    <p className="text-white text-sm font-medium">{`${timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}: ${label}`}</p>
                    <p className="text-[var(--color-primary)] text-sm">
                        {`Engagement: ${payload[0].value} ${timeRange === 'hourly' ? 'taps/hour' : timeRange === 'monthly' ? 'k taps/month' : 'taps/day'}`}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-[var(--color-surface-background)] rounded-lg border border-[var(--border-color)] p-6 relative">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-white">Engagement Timeline</h3>
                    <p className="text-[var(--small-text)] text-sm">
                        Tap activity over time - {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)} view
                    </p>
                </div>
                <TimeRangeSelector />
            </div>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="1 1" stroke="#333333" horizontal={true} vertical={true} />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 11 }}
                            interval={timeRange === 'hourly' ? 1 : 2}
                        />
                        <YAxis
                            domain={[0, 20]}
                            ticks={[0, 5, 10, 15, 20]}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 11 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="rate"
                            stroke="#FF6123"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default EngagementChart;
