import React from 'react';
import Papa from 'papaparse';

const exportToCSVRow = (analyticsData) => {
    // Step 1: Map the data into the required row format
    const csvData = analyticsData.map((entry) => ({
        destinationUrl: entry.destinationUrl,
        eventId: entry.eventId,
        ipAddress: entry.ipAddress,
        country: entry.location.country,
        region: entry.location.region,
        city: entry.location.city,
        latitude: entry.location.latitude,
        longitude: entry.location.longitude,
        referrer: entry.referrer,
        timestamp: entry.timestamp,
        userAgent: entry.userAgent,
        utmCampaign: entry.utmCampaign,
        utmContent: entry.utmContent,
        utmMedium: entry.utmMedium,
        utmSource: entry.utmSource,
        utmTerm: entry.utmTerm
    }));

    // Step 2: Generate CSV using PapaParse
    const csv = Papa.unparse(csvData);

    // Step 3: Trigger the download of the CSV
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'analytics_data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};


export default exportToCSVRow;
