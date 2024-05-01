import React from 'react';
import { Navigate , Outlet } from 'react-router-dom';

function DealerRoutes({ role }) {
    if(role==="" || role === "USER" || role === null) {
        alert("딜러로 등록된 회원만 차량 등록이 가능합니다.")
    }
    return role==="DEALER" ? <Outlet /> : <Navigate to="/login" />;
}

export default DealerRoutes;