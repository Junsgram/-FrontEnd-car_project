import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAsync from '../customHook/useAsync';

async function getCategory(category, maker) {
    const response = await axios.get("http://localhost:8081/car/category?category=" + category + "&maker=" + maker);
    return response.data;
}

function Category({ keyword, onSearch, categoryId }) {
    const [state, refetch] = useAsync(getCategory);
    const [makerView, setMakerView] = useState(false);
    const [modelView, setModelView] = useState(false);

    // 제조사에 맞게 모델명을 불러오기 위해 refetch하고 useAsync를 통해 axios에서 받은 값을 출력한다.
    const onChangeModel = (id) => {
        refetch(categoryId,id)
    }

    // 각 카테고리에 맞는 제조사 값을 출력하고, 카테고리 이동 시 display: none style을 적용
    useEffect(()=>{
        setMakerView(false);
        setModelView(false);
        refetch(categoryId,0);
    },[categoryId])

    const { loading, data, error } = state;
    if (loading) return <div> 로딩중입니다....</div>
    if (error) return <div> 에러가 발생했습니다.</div>
    if (!data) return <div> 데이터가 없습니다.</div>
    const { maker, model } = keyword;
    return (
        <div className='category'>
            <h4>제조사별/모델별 검색</h4>
            <ul className="listUl">
                <li onClick={() => {
                    setMakerView(true);
                    setModelView(false);
                }}> {maker} 
                </li>
                <li onClick={() => {
                    setMakerView(false);
                    setModelView(true);
                }}> {model} 
                </li>
            </ul>
            {/* makerView ? 'view" : ''  */}
            <div className={'makerDiv ' + (makerView && 'view')}>
                <ul>
                    {data.makers.map(li => (
                        <li key={li.id} onClick={() => {
                            onSearch({
                                maker:li.makerName,
                                model:"모델"})
                            onChangeModel(li.id)
                            setMakerView(false)
                        }}>{li.makerName}</li>
                    ))}
                </ul>
            </div>
            <div className={'modelDiv ' + (modelView && 'view')}>
                <ul>
                    {data.models.map(li => (
                        <li key={li.id} onClick={() => {
                            onSearch({model:li.modelName})
                            setModelView(false)
                        }}>{li.modelName}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Category;