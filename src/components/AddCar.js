import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAsync from '../customHook/useAsync';

async function getCategory(id,maker) {
    const response = await axios.get("http://localhost:8081/car/category?category="+id+"&maker="+maker);
    return response.data;
}

function AddCar() {
    const [cateState, refetch] = useAsync(getCategory,0,0,0);
    // 카테고리 요청 상태 업데이트
    const {loading, data, error} = cateState;
    
    // 카테고리 선택, 메이커 선택 값을 관리
    const [cate, setCate ] = useState({
        category: 1,
        maker : 1
    });

    // 경로 이동을 위한 상태 업데이트 
    const navigate = useNavigate();
    const [formData, setFormData ] = useState({
        title: "",          
        cardesc : "",
        color: "",
        registerNumber: "",
        year: "",
        price: "",
        displacement: "",
        mileage: "",
        transmission: "자동",
        fuel: "전기",
        modelId : 1
    })
    // input에 변화가 일어났을 때 상태 업데이트 
    const onChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }
    // form태그 생성
    const carFormData = new FormData();

    // 파일타입의 Input에 변경이 일어났을 때
    const onChangeImage = (e) => {
        const {name} = e.target;
        // 파일이 업로드 되었을 때 나타내는 조건 - 이벤트가 발생한 Input의 files 속성이 있을 때 ㄴ
        if(e.target.files && e.target.files.length > 0) {
            // 폼태그에 input태그 속성 추가하기
            carFormData.append(name,e.target.files[0]);
        }
    }
    // 초기화 
    const onReset = () => {
        setFormData({
            title: "",          
            cardesc : "",
            color: "",
            registerNumber: "",
            year: "",
            price: "",
            dealerId: "1",
            displacement: "",
            mileage: "",
            transmission: "자동",
            fuel: "전기",
            modelId : 1
        })
    }
    // 로그인 버튼 클릭 시 
    const onSubmit = (e) => {
        // 기존  전송 이벤트 제거
        e.preventDefault();
        // 입력이 완료되었는 지 확인
        carInsert();
    }
    // 이미지 multipart 데이터를 전송할 때 form을 생성하여 값을 전달한다.
    async function carInsert() {
        const dealerId = sessionStorage.getItem("dealerId");
        // 폼에 전달한 속성을 다 추가
        carFormData.append("title", formData.title);
        carFormData.append("cardesc", formData.cardesc);
        carFormData.append("color", formData.color);
        carFormData.append("registerNumber", formData.registerNumber);
        carFormData.append("year", formData.year);
        carFormData.append("price", formData.price);
        carFormData.append("dealerId", dealerId);
        carFormData.append("displacement", formData.displacement);
        carFormData.append("mileage", formData.mileage);
        carFormData.append("transmission", formData.transmission);
        carFormData.append("fuel", formData.fuel);
        carFormData.append("modelId", formData.modelId);
        carFormData.append("categoryId", cate.category);
        carFormData.append("makerId", cate.maker);
        const token = sessionStorage.getItem("jwt");
        try{
            // 로그인 성공 시 받은 토큰은 세션스토리지(브라우저 저장소)에 저장
            const response = await axios.post("http://localhost:8081/dealer/addCar",carFormData,{
                headers : {
                    "Content-Type" : "multipart/form-data",
                    "Authorization" : token
                }
            });
            if(response.data === "ok") {
                navigate("/");
            }
        }catch(e) {
            console.log(e);
        }
    }
    useEffect(() => {
        refetch(cate.category,cate.maker);
    },[cate]);
    if(loading) return <div>로딩중 ....</div>
    if(error) return <div> 에러가 발생했습니다.</div>
    if(!data) return <div> 데이터가 없습니다.</div>


    // 카테고리 & 메이커 상태 변경했을 때 실행
    const onCateChange = (e) => {
        const {name, value} = e.target;
        setCate({
            ...cate,
            [name]:value,
            maker: name !== "category" ? value : value === 2? 6: 1
        });
    }
    
    return (
        <div>
            <h2>차량 등록 하기</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">카테고리</label>
                    <select name="category" id="category" onChange={onCateChange}
                    value={cate.category} className="form-control" >
                        {data.categories.map(li=>(
                            <option value={li.id} key={li.id}>{li.categoryName}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="maker" className="form-label" >브랜드</label>
                    <select name="maker" id="maker" onChange={onCateChange}
                    value={cate.maker} className="form-control" >
                        {data.makers.map(li=>(
                            <option value={li.id} key={li.id}>{li.makerName}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="modelId" className="form-label">모델</label>
                    <select name="modelId" id="modelId" className="form-control" onChange={onChange} value={formData.modelId}>
                        {data.models.map(li=>(
                            <option value={li.id} key={li.id}>{li.modelName}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">제목</label>
                    <input type="text" 
                    name="title"
                    value={formData.title} 
                    onChange={onChange} className="form-control" 
                    id="title" aria-describedby="titleHelp" 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="displacement" className="form-label">배기량</label>
                    <input type="text" 
                    name="displacement"
                    value={formData.displacement} 
                    onChange={onChange} className="form-control" 
                    id="displacement" aria-describedby="displacementlHelp" 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="color" className="form-label">색상</label>
                    <input type="text" 
                    name="color"
                    value={formData.color} 
                    onChange={onChange} className="form-control" 
                    id="color" aria-describedby="colorHelp" 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="registerNumber" className="form-label">등록번호</label>
                    <input type="text" 
                    name="registerNumber"
                    value={formData.registerNumber} 
                    onChange={onChange} className="form-control" 
                    id="registerNumber" aria-describedby="registerNumberHelp" 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">가격</label>
                    <input type="text" 
                    name="price"
                    placeholder='만원단위로 입력하세요'
                    value={formData.price} 
                    onChange={onChange} className="form-control" 
                    id="price" aria-describedby="priceHelp" 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="year" className="form-label">년도</label>
                    <input type="text" 
                    name="year"
                    value={formData.year} 
                    onChange={onChange} className="form-control" 
                    id="year" aria-describedby="yearHelp" 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="mileage" className="form-label">주행거리</label>
                    <input type="text" 
                    name="mileage"
                    value={formData.mileage} 
                    onChange={onChange} className="form-control" 
                    id="mileage" aria-describedby="mileageHelp" 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="transmission" className="form-label">변속기</label>
                    <select  
                    name="transmission"
                    value={formData.mileage} 
                    onChange={onChange} className="form-control" 
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
                    value={formData.fuel} 
                    onChange={onChange} className="form-control" 
                    id="fuel" aria-describedby="fuelHelp" 
                    >
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
                    value={formData.cardesc} 
                    onChange={onChange} className="form-control" 
                    id="cardesc"  
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="uploadFiles" className="form-label">이미지1</label>
                    <input type='file' className='custom-file-input form-control'
                            name='uploadFiles' onChange={onChangeImage}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="uploadFiles" className="form-label">이미지2</label>
                    <input type='file' className='custom-file-input form-control' 
                            name='uploadFiles' onChange={onChangeImage}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="uploadFiles" className="form-label">이미지3</label>
                    <input type='file' className='custom-file-input form-control' 
                            name='uploadFiles' onChange={onChangeImage}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="uploadFiles" className="form-label">이미지4</label>
                    <input type='file' className='custom-file-input form-control' 
                            name='uploadFiles' onChange={onChangeImage}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="uploadFiles" className="form-label">이미지5</label>
                    <input type='file' className='custom-file-input form-control' 
                            name='uploadFiles' onChange={onChangeImage}/>
                </div>
                <div> 
                    <button className="btn btn-primary" type="submit">등록</button>
                    <button  className="btn btn-primary"type="reset" onClick={onReset}>취소</button>
                </div> 
            </form>
        </div>
    );
}

export default AddCar;