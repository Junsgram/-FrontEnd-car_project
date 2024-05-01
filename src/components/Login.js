import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({setAuth, isAuthenticated}) {
    // 경로 이동을 위한 상태 업데이트 
    const navigate = useNavigate();
    const [formData, setFormData ] = useState({
        username : "",
        password: "",
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
            username:"",
            password:""
        })
    }
    // 로그인 버튼 클릭 시 
    const onSubmit = (e) => {
        // 기존  전송 이벤트 제거
        e.preventDefault();
        // 입력이 완료되었는 지 확인
        if(formData.username && formData.password) {
            memberLogin();
        }
    }
    async function memberLogin() {
        try{
            // 로그인 성공 시 받은 토큰은 세션스토리지(브라우저 저장소)에 저장
            const response = await axios.post("http://localhost:8081/site/login",formData);
            // response.date {grantType": "Bearer" , accessToken = "asdadwqdsad등"}
            const jwtToken = response.data.grantType+" "+response.data.accessToken;
            sessionStorage.setItem("jwt", jwtToken);
            sessionStorage.setItem("email",response.data.email);
            sessionStorage.setItem("role",response.data.role);
            sessionStorage.setItem("name", response.data.name);
            sessionStorage.setItem("dealerId", response.data.dealerId);
            sessionStorage.setItem("memberId", response.data.memberId);
            // 로그인 성공 시 메인페이지로 이동
            setAuth(true);
            navigate("/")
        }catch(e) {
            console.log(e);
        }
    }
    useEffect(() => {
        // login 마운트 되었을 때 로그인했는 지 체크해서 로그인 했을 경우 main page로 이동
        if(isAuthenticated) {
            navigate("/")
        }
    },[])
    return (
        <div>
            <h2> 로그인 페이지</h2>
            <form onClick={onSubmit}> 
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">아이디 </label>
                    <input type="text" className="form-control" id="email" name="username" placeholder="메일 주소를 입력해주세요." value = {formData.username} onChange={onChange}/>
                </div>
                <div class="mb-3">
                    <label htmlFor="password" className="form-label">패스워드</label>
                    <input type="password" className="form-control" id="password" placeholder="패스워드를 입력해주세요." name="password" value={formData.password} onChange={onChange}/>
                </div>
                <div>
                    <button className='btn btn-primary' type="submit" > 로그인 </button>
                    <button className='btn btn-primary' type="reset" onClick={onReset}> 취소 </button>
                </div>
            </form>
        </div>
    );
}

export default Login;