const API_ENDPOINTS = {
    REACT_APP_LOGIN_END_POINT: 'sparkMotion-auth/login',
    REACT_APP_CHANGE_PASSWORD_END_POINT: 'sparkMotion-auth/admin-change-password',

    // Organizers Endpoints
    REACT_APP_CREATE_ORGANIZER_END_POINT: 'sparkMotion-organizer/create-organizer',
    REACT_APP_UPDATE_ORGANIZER_END_POINT: 'sparkMotion-organizer/update-organizer',
    REACT_APP_DELETE_ORGANIZER_END_POINT: 'sparkMotion-organizer/delete-organizer',
    REACT_APP_GET_ORGANIZER_LIST_END_POINT: 'sparkMotion-organizer/get-organizers-list',
    REACT_APP_GET_ACTIVE_ORGANIZER_LIST_END_POINT: 'sparkMotion-organizer/get-active-organizers-list',
    REACT_APP_GET_ORGANIZER_BY_ID_END_POINT: 'sparkMotion-organizer/get-organizer',
    REACT_APP_ASSIGN_ORGANIZER_END_POINT: 'sparkMotion-organizer/assign-organizers',
    REACT_APP_GET_ORGANIZER_EVENTS_BY_ID_END_POINT: 'sparkMotion-events/get-organizer-events',

    // Events Endpoints
    REACT_APP_CREATE_EVENTS_END_POINT: 'sparkMotion-events/create-event',
    REACT_APP_UPDATE_EVENTS_END_POINT: 'sparkMotion-events/update-event',
    REACT_APP_UPDATE_DESTINATION_URL_END_POINT: 'sparkMotion-events/update-destination-url',
    REACT_APP_GET_ALL_EVENTS_END_POINT: 'sparkMotion-events/get-all-events',
    REACT_APP_GET_EVENT_BY_ID_END_POINT: 'sparkMotion-events/get-eventsById',
    REACT_APP_DELETE_EVENT_BY_ID_END_POINT: 'sparkMotion-events/delete-event',

    // Analytics Endpoints
    REACT_APP_TRACK_URL_END_POINT: 'sparkMotion-analytics/e/',
    REACT_APP_GET_CLICK_COUNT_BY_ID_END_POINT: 'sparkMotion-analytics/getEventClickCount',
    REACT_APP_GET_CLICK_ANALYTICS_BY_ID_END_POINT: 'sparkMotion-analytics/getClickAnalytics',
    REACT_APP_GET_CLICK_TIMELINE_ANALYTICS_BY_ID_END_POINT: 'sparkMotion-analytics/getClickTimeline'
};

export default API_ENDPOINTS;
