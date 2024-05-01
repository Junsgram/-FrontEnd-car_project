import CarList from './CarList';
import React from 'react';

function Main() {
    return (
        <div>
            <div className='main'>
                <h2>국산차 베스트 매물 </h2>
                {/* Proxy에 값을 포함 및 javascript 구문 1을 문자가 아닌 숫자를 전달하기 위해서 {}를 사용 */}
                <CarList id={1}/>
            </div>
            <div>
                <h2>수입차 베스트 매물</h2>
                <CarList id={2}/>
            </div>
        </div>
    );
}

export default Main;