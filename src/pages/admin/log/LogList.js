import React, { useEffect, useState } from "react";
import { Button, Col, Input, Label, Row } from "reactstrap";
import {  Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import * as logsService from "service/admin/logs/logsService";
import bS from "style/basic.module.css"
import dayjs from 'dayjs';
import PaginationComponet from 'components/common/PaginationComponet';
import {search} from 'data/search';
import SearchForm from "components/common/SearchForm";

const LogList = () => {

  // 로그 목록
  const [getLogList, setLogList] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [getIpAddress, setIpAddress] =  useState("");
  const [getTotalCount, setTotalCount] =  useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // 쿼리파라미터
  const [queryParam, setQueryParam] = useState("");
  const [formData, setFormData] = useState({
    searchStartDate: "",
    searchEndDate : ""
  }); // 초기값 빈 객체

  const handleRightClick = (e, ip) => {
    e.preventDefault(); // 기본 우클릭 방지
    setMenuVisible(true);
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setIpAddress(ip);
  };

  const handleClickAnywhere = () => {
    setMenuVisible(false); // 바깥 클릭 시 박스 숨김
  };

  const getLogsListByFetcher = async  () => {
      const inputData ={
        currentPage : currentPage,
        itemsPerPage : 10,
        pageBlockSize : 10,
        queryParam: queryParam,
        formData: formData
      };

      logsService.fetcherLogsList(inputData).then((outPutData) => {
        //console.log(outPutData.data)
        setLogList(outPutData.data.content);
        setTotalCount(outPutData.data.totalCount);
      })
  };

  const blockIp = () => {
    console.log(getIpAddress)
    const inputData ={
      ipAddress  : getIpAddress
    };
    logsService.fetcherIpBlock(inputData).then((outPutData) => {
        //console.log(outPutData.data)
        if(outPutData.data.message == "save"){
          alert(getIpAddress + "차단되었습니다.")
        }else{
          alert(getIpAddress + "이미 차단된 아이피입니다.")
        }
      })
  };

  const unBlockIp = () => {
    console.log(getIpAddress)
    const inputData ={
      ipAddress  : getIpAddress
    };
    logsService.fetcherUnIpBlock(inputData).then((outPutData) => {
        //console.log(outPutData.data)
        if(outPutData.data.message == "unBlock"){
          alert(getIpAddress + " 차단 해제 되었습니다.")
        }else{
          alert(getIpAddress + " 차단 된적이 없습니다!")
        }
      })
  };

  const getLogTypeLabel = (type) => {
    switch (type) {
      case 'GET':
        return '조회';
      case 'PUT':
        return '수정';
      case 'DELETE':
        return '삭제';
      case 'POST':
        return '등록';
      default:
        return '조회';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // 전역 클릭 이벤트 등록
  React.useEffect(() => {
    document.addEventListener("click", handleClickAnywhere);
    return () => {
      document.removeEventListener("click", handleClickAnywhere);
    };
  }, []);


  useEffect(() => {
    getLogsListByFetcher();
  },[currentPage])

  return (
    <div style={{width:"100%"}}>
      <div style={{display:"flex"}}>
        <Label for="searchStartDate" style={{marginRight:"2%", marginTop:"1%"}}>
                      시작일
        </Label>
        <Input
                      id="searchStartDate"
                      name="searchStartDate"
                      type="date"
                      style={{width:"13%", marginRight:"3%"}}
                      onChange={handleChange}
                    />
        <div style={{marginRight:"3%"}}>
            ~
        </div>
        <Input
                      id="searchEndDate"
                      name="searchEndDate"
                      type="date"
                      style={{width:"13%", marginRight:"3%"}}
                      onChange={handleChange}
                    />            
        <SearchForm 
          selectList={[
            {value:"searchField1",name:"Ip"}
          ]}
          setQueryParam={setQueryParam}
          placeholder={"검색어 입력"}
          paramType={2} // 1: 쿼리파라미터 미존재시, 2: 쿼리파라미터 존재시
          getListEvent={getLogsListByFetcher}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <Card style={{width:"100%", marginTop:"3%"}}>
        <CardBody>
          <CardTitle tag="h5">로그관리</CardTitle>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr
              >
                <th>발생일자</th>
                <th>url</th>
                <th>로그 구분</th>
                <th>ip</th>
              </tr>
            </thead>
            <tbody>
              {getLogList.map((tdata, index) => (
                  <tr
                    key={index}
                    className={`${bS.hoverRow} border-top`}
                    onContextMenu={(e) => handleRightClick(e, tdata.ipAddress)}
                  >
                     <td>
                      {dayjs(tdata.createdDate).format('YYYY-MM-DD HH:mm:ss')}
                    </td>
                    <td>
                      {tdata.url}
                    </td>
                    <td>
                      {getLogTypeLabel(tdata.logsType)}
                    </td>
                    <td>
                      {tdata.ipAddress}
                    </td>
                  </tr>
                ))}   
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <PaginationComponet  
        itemsPerPage={10}
        totalCount={getTotalCount}
        pageBlockSize={10}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {menuVisible && (
        <div
          style={{
            position: "fixed",
            top: menuPosition.y,
            left: menuPosition.x,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            padding: "8px",
            zIndex: 1000,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          <div 
            style={{cursor:"pointer"}}
            className={`${bS.hoverRow} border-top`}
            onClick={(e) => {
              e.preventDefault(); // NavLink 기본 이동 방지
              blockIp();
          }}
          >
            차단하기
          </div>
          <div 
            style={{cursor:"pointer"}}
            className={`${bS.hoverRow} border-top`}
            onClick={(e) => {
              e.preventDefault(); // NavLink 기본 이동 방지
              unBlockIp();
          }}
          >
            해제하기
          </div>
        </div>
      )}
    </div>    
  );
};

export default LogList;