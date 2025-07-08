import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';


const SearchForm = ({selectList, setQueryParam, placeholder, paramType, getListEvent }) => {
  //paramType  1: 쿼리파라미터 미존재시, 2: 쿼리파라미터 존재시

  const [searchText, setSearchText] = useState("");
  const [selectValue, setSelectValue] = useState("all");

  const setQueryParamString = event => {
    setSearchText(event.target.value)
    if(paramType == 1){
        setQueryParam(`?searchField=${selectValue}&searchText=${event.target.value}`)
    }else{
      setQueryParam(`&searchField=${selectValue}&searchText=${event.target.value}`)
    }
  }

  const selectSearchField = event => {
    setSelectValue(event.target.value)
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
      />
      <Button style={{width:"10%", marginRight:"5%", float:"right"}} 
              color="primary"
              onClick={getListEvent}
      >
        검색
      </Button>
    </>
  );
};

export default SearchForm;