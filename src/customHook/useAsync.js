import { useEffect, useReducer } from "react";

// 1. 상태 초기화
const initialState = {
    loading: false,
    data: null,
    error: null
}

// reducer 함수
// 로딩중일때 상태 업데이트 Loading
// 데이터 성공적으로 받을 때 SUCCESS
// 에러가 발생했을 때 ERROR

function reducer(state,action) {
    switch(action.type) {
        case "LOADING" :
            return {
                loading: true,
                data : null,
                error : null
            };
        case "SUCCESS" :
            return {
                loading: false,
                data : action.data,
                error: null
            };
        case "ERROR" :
            return {
                loading: false,
                data: null,
                error: action.error
            };
        default:
            return state;
    }
}

function useAsync(callback,id=0,maker,model) {
    const [state, dispatch] = useReducer(reducer, initialState);
    // 데이터 요청을 시작 
    // default 변수 fetchData(값) ---> 없으면 default값 출력
    async function fetchData(state = {
        category:0,
        maker: 0
    }) {
        dispatch({type: "LOADING"});
        const {category, maker } = state;
        try {
            const data = await callback(category,maker);
            dispatch({type:"SUCCESS", data: data})
        }
        catch(e) {
            dispatch({type:"ERROR", error: e})
        }
    }

    // CarList 목록 요청할 때 or Car 조회할 때 사용
    async function fetchDataCar(){
        dispatch({type: "LOADING"});
        try {
            const data = await callback(id,maker,model);
            dispatch({type:"SUCCESS", data: data})
        }
        catch(e) {
            dispatch({type:"ERROR", error: e})
        }
    }

    useEffect(()=>{
        if(id===0) {
            fetchData();
        }else{
            fetchDataCar();
        }  
    // 배열안에 변화되는 값을 넣으면 리렌더(재로딩)되고 싶은 값을 넣어 관리해야한다.
    },[id,maker,model])
    return [state, fetchData];
}

export default useAsync;