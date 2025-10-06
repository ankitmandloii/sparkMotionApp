import React, { useState, useEffect } from 'react';
import { apiConnecter } from '../services/apiConnector';
import API_ENDPOINTS from '../data/EndPoints';
// Assuming you have a Badge component based on the theme
import Badge from '../components/shared/Badge';

// Mock Data structure for reference (it will be replaced by API response)
/*
const mockCFAData = [
    { _id: '68e0ffb8c5299316d1da2226', name: 'ankit', email: 'ankitprajapat@itgeeks.com', position: 'developer', organization: 'itgeeks.com' },
    // ... rest of the data
];
*/

// Tailwind class for max height, similar to the theme
const MAX_HEIGHT_CALC = 'max-h-[calc(100vh-100px)]';

function CFAData() {
    const [cfaData, setCfaData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // This is a simple data normalization/transformation function
    // to map API fields to a structured format for display.
    const normalizedDatahandler = (dataArray) => {
        if (!Array.isArray(dataArray)) return [];
        return dataArray.map(item => ({
            id: item?._id || `item-${Math.random().toString(36).substr(2, 9)}`,
            name: item.name || 'N/A',
            email: item.email || 'N/A',
            position: item.position || 'N/A',
            organization: item.organization || 'N/A',
        }));
    };

    async function fetchData() {
        setLoading(true);
        setError(null);
        try {
            // Note: Since you provided a hardcoded array named 'data', 
            // the initial implementation uses apiConnecter to fetch as requested.
            // If you want to use the provided 'data' array directly, replace 
            // the API call with:
            // const response = { data: { data: your_hardcoded_data_array } }; 

            const response = await apiConnecter("GET", API_ENDPOINTS.REACT_APP_CFA_GET_CAPTCURE_DATA_END_POINT);
            console.log('CFA Data API response', response.data);

            // Assuming the actual data array is in response.data.data or similar. 
            // Adjust the access path (response.data.data) based on your actual API response structure.
            // For now, I'll assume response.data is the array, as you console.logged response.data in the original function.
            const resultData = response.data.data || response.data; // Try to get from .data or use the whole object if it's the array.
            const normalized = normalizedDatahandler(resultData);
            setCfaData(normalized);

        } catch (err) {
            console.error(err);
            setError({ title: 'Error', message: err?.response?.data?.message ?? err.message });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    // Helper to determine badge style based on position (can be customized)
    const getPositionBadgeStyle = (position) => ({ bgColor: 'bg-[var(--border-color)]', textColor: 'text-white' })

    return (
        <div className="text-white m-4 w-full">
            <main>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="md:text-2xl font-semibold text-white text-xl">
                            Captured User Data List
                        </h2>
    
                    </div>
                </div>

                {/* --- */}

                {/* List / Table Section */}
                <div className="space-y-4">
                    {/* Mobile / Tablet Cards */}
                    <div className="flex flex-col space-y-4 lg:hidden">
                        {loading ? (
                            <div className='flex items-center justify-center w-full p-2 bg-[var(--color-surface-background)]'>
                                <div className="loader"></div> {/* Assuming 'loader' class exists in your CSS */}
                            </div>
                        ) : error ? (
                            <div className="text-center text-red-500">{error.message}</div>
                        ) : cfaData.length === 0 ? (
                            <div className="text-center text-gray-300">No data entries found</div>
                        ) : (
                            cfaData.map(item => (
                                <div
                                    key={item.id}
                                    className="bg-[var(--color-surface-background)] rounded-2xl border border-[var(--border-color)] p-4 shadow-md flex flex-col space-y-2"
                                >
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-semibold truncate">{item.name}</h3>
                                        <Badge
                                            label={item.position}
                                            {...getPositionBadgeStyle(item.position)}
                                        />
                                    </div>

                                    <div className="text-gray-400 text-sm">{item.email}</div>

                                    <div className="grid grid-cols-2 gap-4 text-white text-sm mt-2">
                                        <div>
                                            <div className="text-gray-400 text-xs">Organization</div>
                                            <div className="font-semibold">{item.organization}</div>
                                        </div>
                                        <div>
                                            <div className="text-gray-400 text-xs">Email (Full)</div>
                                            <div className="font-semibold truncate text-xs sm:text-sm">
                                                {item.email}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Desktop / Large Table */}
                    <div
                        className={`hidden lg:block bg-[var(--color-surface-background)] rounded-2xl border border-[var(--border-color)] p-5 overflow-x-auto custom-scrollbar ${MAX_HEIGHT_CALC}`}
                    >
                        <h3 className="text-md text-white mb-1">User Entries</h3>
                     
                        <div className="overflow-x-auto">
                            <table className="w-full table-fixed border-collapse">
                                <thead className="bg-[var(--color-surface-background)] sticky top-0 ">
                                    <tr className='border-b border-[var(--border-color)] hover:bg-gray-750'>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-active)] w-1/5">
                                            Name
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-active)] w-1/4">
                                            Email
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-active)] w-1/5">
                                            Position
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-active)] w-1/4">
                                            Organization
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="overflow-y-auto">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="4" className="py-4 px-6 text-center text-gray-300">
                                                <div className="loader"></div>
                                            </td>
                                        </tr>
                                    ) : error ? (
                                        <tr>
                                            <td colSpan="4" className="py-4 px-6 text-center text-red-500">
                                                {error.message}
                                            </td>
                                        </tr>
                                    ) : cfaData.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="py-4 px-6 text-center text-gray-300">
                                                No data entries found
                                            </td>
                                        </tr>
                                    ) : (
                                        cfaData.map(item => (
                                            <tr
                                                key={item.id}
                                                className="border-b border-[var(--border-color)] hover:bg-gray-750"
                                            >
                                                <td className="py-4 px-4 text-white font-medium truncate">
                                                    {item.name}
                                                </td>
                                                <td className="py-4 px-4 text-gray-300 truncate text-sm">
                                                    {item.email}
                                                </td>
                                                <td className="py-4 px-4">
                                                    <Badge
                                                        label={item.position}
                                                        {...getPositionBadgeStyle(item.position)}
                                                    />
                                                </td>
                                                <td className="py-4 px-4 text-gray-300 truncate">
                                                    {item.organization}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default CFAData;