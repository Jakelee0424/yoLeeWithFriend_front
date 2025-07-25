import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';


const SearchForm = ({selectList, setQueryParam, placeholder, paramType, getListEvent, setCurrentPage }) => {
  //paramType  1: 쿼리파라미터 미존재시, 2: 쿼리파라미터 존재시

  const [searchText, setSearchText] = useState("");
  const [selectValue, setSelectValue] = useState(selectList[0].value);
  const dispatch = useDispatch();
  const searchState = useSelector(state => state.search);

  const setQueryParamString = event => {
    setSearchText(event.target.value)
    let queryParam ="";
    if(paramType == 1){
      queryParam = `?searchField=${selectValue}&searchText=${event.target.value}`;
      setQueryParam(queryParam)
    }else{
      queryParam = `&searchField=${selectValue}&searchText=${event.target.value}`;
      setQueryParam(queryParam);
    }
    
    dispatch({
      type: "search",
      payload: {
        data: {
          ...searchState.data,    // 현재 상태를 직접 병합
          queryParam: queryParam
        }
      }
    });

  }

  const selectSearchField = event => {
    setSelectValue(event.target.value)
  }

  const clickButton = () =>{
    if(setCurrentPage != null){
      setCurrentPage(1);
    }

    getListEvent();
  }

  return (
    <>
      <Input
        type="select"
        name="select"
        id="exampleSelect" 
        style={{width:"10%", marginRight:"1%"}}
        onChange={selectSearchField}
      > 
        {selectList.map((tdata, index) => (
           <option key={index} value={tdata.value}>{tdata.name}</option>
        ))}
      </Input>
      <Input
        id="adminPwd"
        name="adminPwd"
        placeholder={placeholder}
        type="text"
        onChange={setQueryParamString}
        value={searchText}
        style={{width:"30%", marginRight:"1%"}}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            //e.preventDefault();
            clickButton();
          }
        }}
      />
      <Button style={{width:"10%", marginRight:"5%", float:"right"}} 
              color="primary"
              onClick={clickButton}
      >
        검색
      </Button>
    </>
  );
};

export default SearchForm;