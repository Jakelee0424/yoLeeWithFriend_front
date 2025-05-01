import { Col, Row } from "reactstrap";
import {  Card, CardBody, CardTitle, CardSubtitle, Table , Input, Button } from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, React, useState, useRef } from "react";
import * as adminService from "service/admin/admin/adminService";
import bS from "style/basic.module.css"
import AdminView from "./AdminView";

const AdminList = () => {

  // 관리자 목록
  const [getAdminList, setAdminList] = useState([]);
  // 호버 이벤트 
  const [hovered, setHovered] = useState(false);
  // 관리자 일련번호
  const [getAdminSn, setAdminSn] = useState("");

  // 네비게이터
  const navigate = useNavigate(); 

  const getAdminListByFetcher = async  () => {
      const inputData ={
      
      };

      adminService.fetcherAdminList(inputData).then((outPutData) => {
        //console.log(outPutData.data)
        setAdminList(outPutData.data);
      })
  };

  const clickAdmin = (adminSn) => {
    setAdminSn(adminSn);
  };

  useEffect(() => {
    getAdminListByFetcher();
  },[])

  return (
    <div style={{width:"100%"}}>
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
                    {index}
                  </td>
                  <td>
                    {tdata.name}
                  </td>
                  <td>
                    {tdata.id}
                  </td>
                  <td>
                    {tdata.authority}
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
      <AdminView key={getAdminSn} 
                adminSn = {getAdminSn} 
                adminList = {getAdminListByFetcher}
                setAdminSn = {setAdminSn}
                
      />
    </div>
  );
};

export default AdminList;