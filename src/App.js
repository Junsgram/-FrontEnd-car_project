import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { useState } from 'react';
import Join from './components/Join';
import AddCar from './components/AddCar';
import CarDetail from './components/CarDetail';
import Main from './components/Main';
import List from './components/List';
import DealerReg from './components/DealerReg';
import UserRoutes from './components/UserRoutes';
import DealerRoutes from './components/DealerRoutes';
import DealerCarList from './components/DealerCarList';
import DealerCarEdit from './components/DealerCarEdit';
import AdminRoutes from './components/AdminRoutes';
import AdminMain from './components/AdminMain';

function App() {
  // 현재 로그인 상태여부 확인
  const [isAuthenticated, setAuth] = useState(false);
  const role = sessionStorage.getItem("role");
  return (
    <div className="App">
      <Header role={role} isAuthenticated={isAuthenticated} setAuth={setAuth} />
      <div className='container'>
        <Routes>
          <Route path="/carList/:categoryId" element={<List />} />
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login isAuthenticated={isAuthenticated} setAuth={setAuth} />} />
          <Route path="/join" element={<Join />} />
          <Route path="/carDetail/:carId" element={<CarDetail />} />
          {/* Member 권한 */}
          <Route element={<UserRoutes role={role} />}>
            <Route path="/dealer" element={<DealerReg />} />
          </Route>
          {/* Dealer 권한 */}
          <Route element={<DealerRoutes role={role} />} >
            <Route path="/addCar" element={<AddCar />} />
            <Route path="/dealerList" element={<DealerCarList />} />
            <Route path="/carEdit/:carId" element={<DealerCarEdit />} />
          </Route>
          {/* Admin 권한 */}
          <Route element={<AdminRoutes role={role}/>}>
            <Route path="/admin" element={<AdminMain />}/>
          </Route>
        </Routes>

      </div>
    </div>
  );
}

export default App;
