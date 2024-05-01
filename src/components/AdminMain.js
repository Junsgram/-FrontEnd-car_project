import React from 'react';
import AdminMemberList from './AdminMemberList';
import AdminDealerList from './AdminDealerList';

function AdminMain() {
    return (
        <div>
            <h3> 관리자 페이지 </h3>
            <div className="flex">
                <AdminMemberList />
                <AdminDealerList />
            </div>
        </div>
    );
}

export default AdminMain;