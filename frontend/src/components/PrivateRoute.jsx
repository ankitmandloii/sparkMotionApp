import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
function PrivateRoute({ children, isLoggedIn }) {
    return isLoggedIn ? children : <Navigate to="/login" />;
}

export default PrivateRoute