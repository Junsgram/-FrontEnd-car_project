import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'

function Header({ isAuthenticated, setAuth, role }) {
    // 로그아웃 함수
    const logout = () => {
        sessionStorage.removeItem("jwt");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("dealerId");
        setAuth(false);
    }
    useEffect(() => {
        // 컴포넌트가 화면에 mount될 때 sessionStorage에 jwt가 존재하면 
        // isAuthenticated값을 true로 변경
        if (sessionStorage.getItem("jwt")) {
            setAuth(true);
        }
    })
    return (
        <div>
            <div className="App">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <h2><Link to="/"> Car_Project</Link> </h2>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/carList/10">그린카매장</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/carList/1">국산차</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/carList/2">수입차</Link>
                                </li>
                                {/* 로그인 / 로그아웃 navBar */}
                                {isAuthenticated ?
                                    <li className="nav-item">
                                        <Link className="nav-link active" onClick={logout} >로그아웃</Link>
                                    </li> :
                                    <><li className="nav-item">
                                        <Link className="nav-link active" to="/login" >로그인</Link>
                                    </li><li className="nav-item">
                                            <Link className="nav-link active" to="/join" >회원가입</Link>
                                        </li></>}

                                <li className="nav-item">
                                    <Link className="nav-link active" to="/addCar" >자동차 등록</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/dealer">딜러 신청</Link>
                                </li>
                                {/*  딜러 페이지 */}
                                {role==="DEALER" && (<li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/dealerList">딜러 차량 등록 현황</Link>
                                </li>)}
                                 {/* 어드민 페이지 */}
                                {role==="ADMIN" && (
                                    <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/admin">관리자 페이지 </Link>
                                </li>
                                )}
                            </ul>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Header;