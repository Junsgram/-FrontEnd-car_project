
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DealerReg() {
    // 경로 이동을 위한 상태 업데이트 
    const navigate = useNavigate();

    // 초기 상태 설정
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        message: "",
        location: "",
        memberId: sessionStorage.getItem("memberId")
    })
    // input에 변화가 일어났을 때 상태 업데이트 
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    // 초기화 
    const onReset = () => {
        setFormData({
            name: "",
            phone: "",
            message: "",
            location: "",
            memberId: ""
        })
    }
    //등록 버튼 클릭 시 
    const onSubmit = (e) => {
        // 기존  전송 이벤트 제거
        e.preventDefault();
        // 입력이 완료되었는 지 확인
        if (formData.name && formData.phone && formData.location) {
            dealerRegister();
        }
    }
    async function dealerRegister() {
        // 세션 스토리지에 저장된 값을 반환한다.
        const token = sessionStorage.getItem("jwt");
        // axios.post("경로", 전송데이터, 옵션지정);
        try {
            const response = await axios.post("http://localhost:8081/member/register", formData,
             { headers: {
                "Authorization" : token
             }});
            if (response.data === "ok") {
                navigate("/");
            }

        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div>
            <h2> 딜러 등록 신청하기</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">이름</label>
                    <input type="text"
                        name="name"
                        value={formData.name}
                        onChange={onChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">전화번호</label>
                    <input type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={onChange}
                        className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">주소</label>
                    <input type="text"
                        name="location"
                        value={formData.location}
                        onChange={onChange}
                        className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">요청사항</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={onChange}
                        className='form-control'>
                    </textarea>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">딜러신청</button>
                    <button type="reset" className="btn btn-primary" onClick={onReset}>취소</button>
                </div>
            </form>
        </div>
    );
}

export default DealerReg;