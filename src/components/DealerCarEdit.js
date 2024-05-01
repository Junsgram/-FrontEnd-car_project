import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import useAsync from '../customHook/useAsync';
import EditCategory from './EditCategory';

// 차량 상세보기를 위해 전달할 함수
async function getCar(id) {
    const response = await axios.get("http://localhost:8081/car/car/" + id)
    return response.data;
}

function DealerCarEdit() {
    const { carId } = useParams();
    const [state] = useAsync(getCar, carId);
    const { loading, data, error } = state;
    const navigate = useNavigate();

    // 로그인 버튼 클릭 시 
    const onSubmit = (e) => {
        // 기존  전송 이벤트 제거
        e.preventDefault();
        // 입력이 완료되었는 지 확인
        registerCar(e.target);
    }
    // 이미지 multipart 데이터를 전송할 때 form을 생성하여 값을 전달한다.
    async function registerCar(form) {
        const dealerId = sessionStorage.getItem("dealerId");
        const token = sessionStorage.getItem("jwt");
        try {
            // 로그인 성공 시 받은 토큰은 세션스토리지(브라우저 저장소)에 저장
            const response = await axios.post("http://localhost:8081/dealer/carEdit", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": token
                }
            });
            if (response.data === "ok") {
                alert("수정되었습니다.")
                navigate("/dealerList");
            }
        } catch (e) {
            alert("수정되지 않았습니다. 다시 한 번 확인해주세요.")
            console.log(e);
        }
    }



    if (loading) return <div>로딩중 ....</div>;
    if (error) return <div> 에러가 발생했습니다.</div>;
    if (!data) return null;

    return (
        <div>
            <h2>차량 수정 하기</h2>
            <form onSubmit={onSubmit}>
                <EditCategory categoryId={data.categoryId} makerId={data.makerId} modelId={data.modelId} />
                <input type="hidden" name="id" value={carId} />
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">제목</label>
                    <input type="text" defaultValue={data.title}
                        name="title"
                        className="form-control"
                        id="title" aria-describedby="titleHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="displacement" className="form-label">배기량</label>
                    <input type="text" defaultValue={data.displacement}
                        name="displacement"
                        className="form-control"
                        id="displacement" aria-describedby="displacementlHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="color" className="form-label">색상</label>
                    <input type="text" defaultValue={data.color}
                        name="color"
                        className="form-control"
                        id="color" aria-describedby="colorHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="registerNumber" className="form-label">등록번호</label>
                    <input type="text" defaultValue={data.registerNumber}
                        name="registerNumber"
                        className="form-control"
                        id="registerNumber" aria-describedby="registerNumberHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">가격</label>
                    <input type="text" defaultValue={data.price}
                        name="price"
                        placeholder='만원단위로 입력하세요'
                        className="form-control"
                        id="price" aria-describedby="priceHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="year" className="form-label">년도</label>
                    <input type="text" defaultValue={data.year}
                        name="year"
                        className="form-control"
                        id="year" aria-describedby="yearHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="mileage" className="form-label">주행거리</label>
                    <input type="text" defaultValue={data.mileage}
                        name="mileage"
                        className="form-control"
                        id="mileage" aria-describedby="mileageHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="transmission" className="form-label">변속기</label>
                    <select
                        name="transmission"
                        defaultValue={data.transmission}
                        className="form-control"
                        id="transmission" aria-describedby="transmissionHelp"
                    >
                        <option value="자동">자동</option>
                        <option value="수동">수동</option>
                        <option value="CVT">CVT</option>
                        <option value="듀얼클러치">듀얼클러치</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="fuel" className="form-label">연료</label>
                    <select
                        name="fuel"
                        defaultValue={data.fuel}
                        className="form-control"
                        id="fuel" aria-describedby="fuelHelp">
                        <option value="전기">전기</option>
                        <option value="가솔린">가솔린</option>
                        <option value="수소">수소</option>
                        <option value="디젤">디젤</option>
                        <option value="하이브리드">하이브리드</option>
                        <option value="LPG">LPG</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="cardesc" className="form-label">설명글</label>
                    <textarea type="text"
                        name="cardesc"
                        defaultValue={data.cardesc}
                        className="form-control"
                        id="cardesc"
                    ></textarea>
                </div>
                {data.carImageDtos.map((img, index) => (
                    <div className="mb-3">
                        <label htmlFor="file" className="form-label">이미지{index + 1}</label>
                        <input type='file' className='custom-file-input form-control'
                            name='uploadFiles' />
                    </div>
                ))}
                <div>
                    <button className="btn btn-primary" type="submit"> 등록 </button>
                    <button className="btn btn-primary" type="button"> 취소 </button>
                </div>
            </form>
        </div>
    );
}

export default DealerCarEdit;