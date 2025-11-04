import { Navigate } from "react-router-dom";
import { getToken } from "../api";

export default function ProtectedRoute({ children }) {
    const token = getToken();
    if (!token) return <Navigate to="/admin" replace />; // solo si /admin es login

    return children;
}
