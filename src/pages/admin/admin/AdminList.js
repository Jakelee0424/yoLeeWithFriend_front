import { Col, Row } from "reactstrap";
import {  Card, CardBody, CardTitle, CardSubtitle, Table , Input, Button } from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, React, useState, useRef } from "react";
import * as adminService from "service/admin/admin/adminService";
import bS from "style/basic.module.css"

const AdminList = () => {

  // 관리자 목록
  const [getAdminList, setAdminList] = useState([]);
  // 호버 이벤트 
  const [hovered, setHovered] = useState(false);

  // 네비게이터
  const navigate = useNavigate(); 

  const getAdminListByFetcher = async  () => {
      const inputData ={
      
      };

      adminService.fetcherAdminList(inputData).then((outPutData) => {
        setAdminList(outPutData.data);
      })
  };

  const clickAdmin = (adminSn) => {
    navigate(`/admin/adminView`, { state: { adminSn } });
  };

  useEffect(() => {
    getAdminListByFetcher();
  },[])

  return (
    <div style={{display:"flex",width:"100%"}}>
      <Card style={{width:"100%"}}>
        <CardBody>
          <CardTitle tag="h5">관리자관리</CardTitle>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>순번</th>
                <th>이름</th>
                <th>아이디</th>
                <th>권한</th>
              </tr>
            </thead>
            <tbody>
              {getAdminList.map((tdata, index) => (
                <tr key={index} className={`${bS.hoverRow} border-top`} 
                  onClick={(e) => {
                  e.preventDefault(); // NavLink 기본 이동 방지
                  clickAdmin(tdata.sn);
              }}>
                  <td>
                    {tdata.sn}
                  </td>
                  <td>
                    {tdata.name}
                  </td>
                  <td>
                    {tdata.id}
                  </td>
                  <td>
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="option1">일반</option>
                      <option value="option2">정지</option>
                    </Input>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div>
            <Button style={{width:"10%", marginRight:"3%", float:"right"}} 
                    color="primary"
                    onClick={(e) => {
                      e.preventDefault(); // NavLink 기본 이동 방지
                      clickAdmin("");
                  }}
            >
              생성
            </Button> 
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminList;