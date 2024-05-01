import React from 'react';
import { Navigate , Outlet } from 'react-router-dom';

function UserRoutes({role}) {
    if(role==="" || role===null) {
        alert("로그인이 되어 있지 않습니다. 로그인 진행해주세요");
    }
    if(role==="DEALER") {
        alert("해당 계정은 이미 딜러 권한이 적용되어 있습니다.");
    }
    return role==="USER" ? <Outlet/> : <Navigate to="/login/"/>
}

export default UserRoutes;