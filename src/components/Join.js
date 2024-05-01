
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Join() {
    // 경로 이동을 위한 상태 업데이트 
    const navigate = useNavigate();
    const [formData, setFormData ] = useState({
        name:"",
        email: "",
        password:"",
        address:""
    })
    // input에 변화가 일어났을 때 상태 업데이트 
    const onChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }
    // 초기화 
    const onReset = () => {
        setFormData({
            name:"",
            email: "",
            password:"",
            address:""
        })
    }
    // 로그인 버튼 클릭 시 
    const onSubmit = (e) => {
        // 기존  전송 이벤트 제거
        e.preventDefault();
        // 입력이 완료되었는 지 확인
        if(formData.name && formData.password && formData.email && formData.address) {
            memberJoin();
        }
    }
    async function memberJoin() {
        try{
            // 로그인 성공 시 받은 토큰은 세션스토리지(브라우저 저장소)에 저장
            const response = await axios.post("http://localhost:8081/site/join",formData);
            if(response.data === "ok") {
                navigate("/login");
            }
            
        }catch(e) {
            console.log(e);
        }
    }
    return (
        <div>
            <h2> 회원가입 페이지</h2>
            <form onSubmit={onSubmit}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">이름</label>
                    <input type="text" 
                                name="name"
                                value={formData.name} 
                                onChange={onChange} className="form-control"/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">이메일</label>
                    <input type="text" 
                        name="email"
                        value={formData.email} 
                        onChange={onChange} 
                        className="form-control"/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">패스워드</label>
                    <input type="password" 
                            name="password"
                            value={formData.password} 
                            onChange={onChange} 
                        className="form-control"/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">주소</label>
                    <input type="text" 
                            name="address"
                            value={formData.address} 
                            onChange={onChange} 
                        className="form-control"/>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">회원가입</button>
                    <button type="reset" className="btn btn-primary" onClick={onReset}>취소</button>
                </div>              
            </form>
        </div>
    );
}

export default Join;