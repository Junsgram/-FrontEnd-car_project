import React from 'react';
import axios from 'axios';
import useAsync from '../customHook/useAsync';

// axios로 데이터 요청 진행
async function getMember() {
    const response = await axios.get("http://localhost:8081/admin/memberList", {
        headers : {
            "Authorization" : sessionStorage.getItem("jwt")
        }
    });
    return response.data;
}


function AdminMemberList() {
    // axios로 받은 데이터 useAsync로 처리 진행
    const [state] = useAsync(getMember);
    const {loading, data, error} = state;
    if(loading) return <div>로딩중입니다 .... </div>
    if(error) return <div> 에러가 발생했습니다.</div>
    if(!data) return <div> 데이터를 불러오지 못했습니다.</div>
    return (
        <div>
            <h3> 회원 목록 </h3>
            <table className='table'>
                <thead>
                <tr>
                    <th scope='col'>이름</th>
                    <th scope='col'>이메일</th>
                    <th scope='col'>주소</th>
                    <th scope='col'>권한</th>
                    <th scope='col'>딜러 번호</th>
                </tr>
                </thead>
                <tbody>
                {data.map(member => (
                    <tr key={member.id}>
                        <td>{member.name}</td>
                        <td>{member.email}</td>
                        <td>{member.address}</td>
                        <td>{member.role}</td>
                        <td>{member.dealerId}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminMemberList;