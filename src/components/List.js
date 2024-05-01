import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import CarPageList from './CarPageList';
import Category from './Category';

function List() {
    /**
     * params객체는 Url에 담은 요청 내용을 가져올 수 있다.
     * ex) Route path="/page/:categoryId"> {categoryId:10} 
     */
    const {categoryId } = useParams(); 
    const [keyword, setKeyword] = useState({
        maker: "제조사",
        model: "모델"
    });
    const onReset = () => {
        setKeyword ({
            maker : "제조사",
            model : "모델"
        })
    }
    const {maker, model} = keyword;
    const onSearch = (state) => {
        setKeyword({
            ...keyword,
            ...state
        })
    }
    useEffect(()=> {
        onReset();
    },[categoryId])
    return (
        <div>
            <Category keyword={keyword} categoryId={categoryId} onSearch={onSearch}/>
            <CarPageList categoryId={categoryId} maker={maker} model={model}/>
        </div>
    );
}

export default List