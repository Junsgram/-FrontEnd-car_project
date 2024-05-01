import React from 'react';
import axios from 'axios';
import useAsync from '../customHook/useAsync';

// axios로 데이터 요청 진행
async function getDealer() {
    const response = await axios.get("http://localhost:8081/admin/dealerRegList", {
        headers: {
            "Authorization": sessionStorage.getItem("jwt")
        }
    });
    return response.data;
}


function AdminDealerList() {
    // axios로 받은 데이터 useAsync로 처리 진행
    const [state] = useAsync(getDealer);
    const { loading, data, error } = state;
    const addDealer = async (e) => {
        const dataset = e.target.dataset;
        console.log(dataset);
        const response = await axios.post("http://localhost:8081/admin/dealerAdd", JSON.stringify(dataset), {
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("jwt")
            }
        });
        if (response.data === "ok") {
            alert("딜러 등록 되었습니다.");
        } else {
            alert("문제가 발생했습니다.");
        }
    };
    if (loading) return <div>로딩중입니다 .... </div>
    if (error) return <div> 에러가 발생했습니다.</div>
    if (!data) return <div> 데이터를 불러오지 못했습니다.</div>
    return (
        <div>
            <h3> 딜러 신청 목록 </h3>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>이름</th>
                        <th scope='col'>연락처</th>
                        <th scope='col'>위치</th>
                        <th scope='col'>메세지</th>
                        <th scope='col'>회원아이디</th>
                        <th scope='col'>승인여부</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(dealer => (
                        <tr key={dealer.id}>
                            <td>{dealer.name}</td>
                            <td>{dealer.phone}</td>
                            <td>{dealer.location}</td>
                            <td>{dealer.message}</td>
                            <td>{dealer.memberId} </td>
                            <td>{dealer.dealerState}</td>
                            {dealer.dealerState === "신청" ? <button
                                className="btn btn-primary"
                                data-name={dealer.name}
                                data-phone={dealer.phone}
                                data-location={dealer.location}
                                data-memberid={dealer.memberId}
                                onClick={addDealer}
                            >승인</button> : <button className="btn btn-primary">승인완료</button>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDealerList;