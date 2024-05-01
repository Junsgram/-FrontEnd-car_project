import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAsync from '../customHook/useAsync';


async function getCategory(id,maker){
    const response = await axios.get
    ("http://localhost:8081/car/category?category="+id+"&maker="+maker);
    console.log(response);
    return response.data;
}
function EditCategory({categoryId,makerId,modelId}) {


    //1)카테고리 선택, 메이커선택 값을 관리 
    const [ group, setGroup] = useState({
        categoryId:categoryId,
        makerId:makerId,
        modelId:modelId
    });
    const [cateState,refetch] = useAsync(getCategory,0,categoryId,makerId);
    const { loading,data,error} = cateState;
    const onCateChange =  (e) => {
        //이벤트를 발생시킨 select의 name값과 value값 각각 변수에 할당
        const {name,value} = e.target;
        console.log(name);
        console.log(value);
        //상태 업데이트 
        setGroup(state=>
            ({
            ...state,
            [name]:value,
            maker: name!=="categoryId" ? value : value===2 ? 6 : 1 
            })
        );  
    }

    useEffect(() => {
        refetch(group.categoryId, group.makerId);
    }, [group])
    if(loading) return <div>로딩중입니다.</div>;
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!data) return <div>데이터가 없습니다.</div>;
    return ( 
    <div>
        <div class="mb-3">
                    <label for="category" className="form-label">카테고리</label>
                    <select name="categoryId" id="categoryId" onChange={onCateChange}
                    value={group.categoryId} className="form-control" >
                        {data.categories.map(li=>(
                            <option value={li.id} key={li.id}>{li.categoryName}</option>
                        ))}
                    </select>
                </div>
                <div class="mb-3">
                    <label for="makerId" className="form-label" >브랜드</label>
                    <select name="makerId" id="makerId" onChange={onCateChange}
                    value={group.makerId} className="form-control" >
                        {data.makers.map(li=>(
                            <option value={li.id} key={li.id}>{li.makerName}</option>
                        ))}
                    </select>
                </div>
                <div class="mb-3">
                    <label for="modelId" className="form-label">모델</label>
                    <select name="modelId" id="modelId" className="form-control" 
                    onChange={onCateChange} value={group.modelId}> 
                        {data.models.map(li=>(
                            <option value={li.id} key={li.id}>{li.modelName}</option>
                        ))}
                    </select>
                </div>
    </div> 
    );
}

export default EditCategory;