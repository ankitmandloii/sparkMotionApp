// components/PrivateRoute.jsx
import { Navigate } from "react-router";

const PrivateRoute = ({ children, isLoggedIn, role, allowedRoles }) => {
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    // // check if user's role is in allowedRoles
    if (allowedRoles && !allowedRoles.includes(role)) {
        return; // redirect if not allowed
    }

    return children;
};

export default PrivateRoute;
