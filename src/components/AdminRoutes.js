import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function AdminRoutes({ role }) {
    if (role === "" || role === null || role === "USER" || role === "DEALER") {
        alert("관리자 계정으로 로그인 해주시길 바랍니다.");
    }
    return role === "ADMIN" ? <Outlet /> : <Navigate to="/" />
}

export default AdminRoutes;