import React from 'react';
import axios from 'axios';
import useAsync from '../customHook/useAsync';
import { Link } from 'react-router-dom'

// callback 전달할 함수
async function getCars(id) {
    const response = await axios.get("http://localhost:8081/car/cars?categoryId=" + id);
    return response.data;
}
function CarList({ id }) {
    const [state] = useAsync(getCars, id);
    const { loading, data, error } = state;
    if (loading) return <div>로딩중 ....</div>;
    if (error) return <div> 에러가 발생했습니다.</div>;
    if (!data) return null;
    return (
        <div className='mainlist'>
            {data.dtoList.map((car, index) =>
                <div class="card" style={{ width: "18rem" }} key={index}>
                    <img src={"http://localhost:8081/car/image?image=" + car.imgName} width="300" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{car.title}</h5>
                        <p className="card-text">{car.makerName}</p>
                        <p className="card-text">{car.modelName}</p>
                        <p className="card-text" >{car.price} 만원</p>
                        <Link to={"/carDetail/" + car.id} className="btn btn-primary">상세보기</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CarList;