import React from 'react';
import axios from 'axios';
import useAsync from '../customHook/useAsync';
import { Link } from 'react-router-dom';

// useAsync 전달 함수 값
async function getCars(dealerId) {
    const token = sessionStorage.getItem("jwt");
    // axios get요청
    const response = await axios.get("http://localhost:8081/dealer/carList?dealerId="+dealerId,{
        headers: {
            "Authorization" : token // 권한을 header에 달고 axios 요청을 보냄
        }
    });
    return response.data;
}

function DealerCarList() {
    // Session에 dealerId를 가져와서 UseAsync에 담아준다.
    const dealerId = sessionStorage.getItem("dealerId");
    const name = sessionStorage.getItem("name");
    const [state] = useAsync(getCars,dealerId);
    const {loading, data, error} = state;

    if(loading) return <div>로딩중 ....</div>;
    if(error) return <div> 에러가 발생했습니다</div>;
    if(!data) return <div> 데이터가 없습니다.</div>;
    
    return (
        <div>
            <h4>  {name} 님이 등록한 차량의 수는 {data.length}대</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">사진</th>
                        <th scope="col">차량 정보</th>
                        <th scope="col">연식</th>
                        <th scope="col">연료</th>
                        <th scope="col">주행</th>
                        <th scope="col">가격</th>
                        <th scope="col">딜러</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((car,index) => (
                        <tr key={index}>
                            <td><img src={"http://localhost:8081/car/image?image="+car.imgName} 
                            style={{width:"160px"}}/></td>
                            <td><Link to={"/carEdit/"+car.id}> {car.title}</Link></td>
                            <td>{car.year}</td>
                            <td>{car.fuel}</td>
                            <td>{car.mileage}</td>
                            <td>{car.price}</td>
                            <td>{car.dealer.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DealerCarList;