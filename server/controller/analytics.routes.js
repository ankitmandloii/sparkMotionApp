const axios = require('axios');  // For IP geolocation API requests
const ClickAnalytics = require('../model/clickAnalytics.js');  // Analytics model
const Event = require('../model/eventSchema');  // Event model
const { sendResponse } = require('../utils/sendResponse');
const { statusCode } = require('../constant/statusCodes');
const { SuccessMessage, ErrorMessage } = require('../constant/messages');
const eventSchema = require('../model/eventSchema');
const moment = require('moment');  // Useful for formatting dates and grouping clicks by day/hour

// The tracking function to capture click data
exports.trackClick = async (req, res) => {
  try {
    const { eventId } = req.params;  // Event ID from the URL (e.g., /e/123)
    // console.log(`Tracking click for eventId: ${eventId}`);
    // Get the user's IP address from the request
    const ipAddress = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress;

    // Capture the user agent (browser/device info)
    const userAgent = req.get('User-Agent');

    // Get UTM parameters from the query string
    const utmSource = req.query.utm_source || '';
    const utmMedium = req.query.utm_medium || '';
    const utmCampaign = req.query.utm_campaign || '';
    const utmTerm = req.query.utm_term || '';
    const utmContent = req.query.utm_content || '';

    // Fetch the event details from the database to get the destination URL
    const eventDetails = await eventSchema.findById(eventId);

    if (!eventDetails) {
      return sendResponse(res, statusCode.NOT_FOUND, false, ErrorMessage.EVENT_NOT_FOUND);
    }

    const destinationUrl = eventDetails.destinationUrl;  // Get the destination URL from the event
    const eventEndDate = eventDetails.eventEndDate;



    // Get the user's geolocation data from IP (using a third-party service like ipstack or ipinfo)
    const geoData = await getGeolocationData(ipAddress);

    // Debugging line to check the geolocation data
    // Get the referrer (the page from which the click originated)
    const referrer = req.get('Referrer') || 'Direct';

    if (geoData) {
      geoData.country = geoData.country || 'Unknown';
      geoData.region = geoData.region || 'Unknown';
      geoData.city = geoData.city || 'Unknown';
      geoData.latitude = geoData.latitude || null;
      geoData.longitude = geoData.longitude || null;
    } else {
      console.log("No geolocation data available for IP:", ipAddress);
    }



    // Store the analytics data in the database
    const newClick = new ClickAnalytics({
      eventId,
      ipAddress,
      location: geoData,
      userAgent,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
      destinationUrl
    });

    await newClick.save();

    // Only track the click if the current date is after the event's end date
    const currentDate = new Date();
    const postEventClick = currentDate > new Date(eventEndDate);  // Check if the click is after the event
    if (postEventClick) {
      // Increment the post-event click count for the event
      await eventSchema.findByIdAndUpdate(eventId, { $inc: { postEventClickCount: 1 } });
    }
    // Increment the click count for the event
    await eventSchema.findByIdAndUpdate(eventId, { $inc: { clickCount: 1 } });



    // Redirect the user to the destination URL
    res.redirect(destinationUrl || 'https://sparkmotion.net/');
    // sendResponse(res, statusCode.OK, true, 'Click tracked successfully', { redirectURL: destinationUrl });
  } catch (error) {
    console.error('Error tracking click:', error);
    sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, 'Error tracking click');
  }
};

// Function to get geolocation data from an IP address
const getGeolocationData = async (ipAddress) => {
  try {
    // console.log("Fetching geolocation for IP:", ipAddress); // Debugging line to check the IP address
    const token = process.env.IPINFO_API_TOKEN; // Use your IPinfo API token
    if (!token) {
      console.warn('IPINFO_API_TOKEN is not set. Skipping geolocation lookup.');
      return {};
    }
    const response = await axios.get(`https://ipinfo.io/${ipAddress}/json?token=${token}`);
    const locationData = response.data;
    // console.log("Location Data:", locationData); // Debugging line to check the location data
    return {
      country: locationData?.country,
      city: locationData?.city,
      region: locationData?.region,
      latitude: locationData?.loc?.split(',')[0],
      longitude: locationData?.loc?.split(',')[1],
    };
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.log('Rate limit exceeded. Retrying...');
      // Implement retry logic or delay
    } else {
      console.error('Error fetching geolocation data:', error);
    }
    return {};
  }
};


// API to get the total number of clicks for a specific event
exports.getEventClickCount = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);

    if (!event) {
      return sendResponse(res, statusCode.NOT_FOUND, false, ErrorMessage.EVENT_NOT_FOUND);
    }

    // Get the click count for this event
    const clickCount = event.clickCount;
    return sendResponse(res, statusCode.OK, true, SuccessMessage.CLICK_COUNT_FETCHED, { clickCount });
  } catch (error) {
    console.error('Error fetching click count:', error);
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};


// API to get click analytics data, including UTM parameters and timeline
exports.getClickAnalytics = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Fetch the event by eventId to get the clickCount
    const event = await eventSchema.findById(eventId);

    if (!event) {
      return sendResponse(res, statusCode.NOT_FOUND, false, ErrorMessage.EVENT_NOT_FOUND);
    }

    // Fetch all click analytics for the given event
    const analyticsData = await ClickAnalytics.find({ eventId }).sort({ timestamp: -1 });  // Sort by most recent

    // Group clicks by UTM parameters
    const utmData = analyticsData.reduce((acc, click) => {
      const { utmSource, utmMedium, utmCampaign, utmTerm, utmContent } = click;

      if (!acc[utmSource]) acc[utmSource] = {};
      if (!acc[utmSource][utmMedium]) acc[utmSource][utmMedium] = [];

      acc[utmSource][utmMedium].push({
        utmCampaign, utmTerm, utmContent, timestamp: click.timestamp
      });

      return acc;
    }, {});

    // Return the event click count along with analytics data
    return sendResponse(res, statusCode.OK, true, SuccessMessage.ANALYTICS_FETCHED, {
      clickCount: event.clickCount,
      postEventClickCount: event.postEventClickCount,  // Return the postEventClickCount from the event schema
      analyticsData,
      eventName: event.eventName,
      utmData
    });
  } catch (error) {
    console.error('Error fetching click analytics:', error);
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

// Useful for formatting dates and grouping clicks by day/hour/month

exports.getClickTimeline = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Fetch all click analytics for the given event
    const clicks = await ClickAnalytics.find({ eventId });

    if (clicks.length === 0) {
      return sendResponse(res, statusCode.OK, true, ErrorMessage.NO_CLICKS_FOUND, []);
    }

    // Group clicks by date (daily), hour (hourly), month (monthly), city, and country
    const dailyData = groupClicksByDay(clicks);
    const hourlyData = groupClicksByHourAmPm(clicks);
    // const monthlyData = groupClicksByMonth(clicks);
    const cityData = groupClicksByCity(clicks);
    const countryData = groupClicksByCountry(clicks);

    //  let peakHour = null;
    // let peakHourCount = 0;
    // for (const [hour, count] of Object.entries(hourlyData)) {
    //   if (count > peakHourCount) {
    //     peakHourCount = count;
    //     peakHour = hour;
    //   }
    // }

    const eventData = await eventSchema.findById(eventId);


    return sendResponse(res, statusCode.OK, true, SuccessMessage.ANALYTICS_FETCHED, {
      eventData: eventData || {},
      dailyData,
      hourlyData,
      // monthlyData,
      cityData,
      countryData,
      // peakHour: {
      //   hour: peakHour,
      //   taps: peakHourCount
      // }
    });
  } catch (error) {
    console.error('Error fetching click timeline:', error);
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};


// Helper function to group clicks by day and sort them by date
const groupClicksByDay = (clicks) => {
  const grouped = clicks.reduce((acc, click) => {
    const day = moment(click.timestamp).format('YYYY-MM-DD');

    // Skip invalid timestamps
    const timestamp = moment(click.timestamp);
    if (!timestamp.isValid()) {
      console.warn('Invalid timestamp:', click.timestamp);  // Log the invalid timestamp
      return acc;
    }

    if (!acc[day]) acc[day] = 0;
    acc[day] += 1;
    return acc;
  }, {});

  // Sort the grouped data by date (ascending order)
  const sortedGrouped = Object.entries(grouped)
    .sort(([dayA], [dayB]) => {
      const dateA = new Date(dayA);
      const dateB = new Date(dayB);
      return dateA - dateB;  // Sort by date in ascending order
    })
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  return sortedGrouped;
};

// Helper function to group clicks by hour and sort them by date & time
const groupClicksByHourAmPm = (clicks) => {
  const grouped = clicks.reduce((acc, click) => {
    const hour = moment(click.timestamp).format('YYYY-MM-DD hh:00 A'); // Format with AM/PM

    // Skip invalid timestamps
    const timestamp = moment(click.timestamp);
    if (!timestamp.isValid()) {
      console.warn('Invalid timestamp:', click.timestamp);  // Log the invalid timestamp
      return acc;
    }

    if (!acc[hour]) acc[hour] = 0;
    acc[hour] += 1;
    return acc;
  }, {});

  // Sort the grouped data by date and time (ascending order)
  const sortedGrouped = Object.entries(grouped)
    .sort(([hourA], [hourB]) => {
      const dateA = new Date(hourA);
      const dateB = new Date(hourB);
      return dateA - dateB;  // Sort by date and hour in ascending order
    })
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  return sortedGrouped;
};



// Helper function to group clicks by month
// const groupClicksByMonth = (clicks) => {
//   return clicks.reduce((acc, click) => {
//     const month = moment(click.timestamp).format('YYYY-MM');
//     if (!acc[month]) acc[month] = 0;
//     acc[month] += 1;
//     return acc;
//   }, {});
// };

// Helper function to group clicks by city
const groupClicksByCity = (clicks) => {
  return clicks.reduce((acc, click) => {
    // console.log("sss",click)
    const city = click.location.city || 'Unknown';  // Default to 'Unknown' if no city data
    if (!acc[city]) acc[city] = 0;
    acc[city] += 1;
    return acc;
  }, {});
};

// Helper function to group clicks by country
const groupClicksByCountry = (clicks) => {
  return clicks.reduce((acc, click) => {
    const country = click.location.country || 'Unknown';  // Default to 'Unknown' if no country data
    if (!acc[country]) acc[country] = 0;
    acc[country] += 1;
    return acc;
  }, {});
};
