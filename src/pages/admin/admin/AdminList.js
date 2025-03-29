import { Col, Row } from "reactstrap";
import {  Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, React, useState, useRef } from "react";
import * as adminService from "service/admin/admin/adminService";

const AdminList = () => {

  // 관리자 목록
  const [getAdminList, setAdminList] = useState([]);

  // 네비게이터
  const navigate = useNavigate(); 

  const getAdminListByFetcher = async  () => {
      const inputData ={
      
      };

      adminService.fetcherAdminList(inputData).then((outPutData) => {
        console.log(outPutData);
        console.log("test");
        setAdminList(outPutData.data);
      })
  };

  const clickAdmin = (adminSn) => {
    navigate(`/admin/adminView`); // 피드 
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
                <tr key={index} className="border-top">
                  <td>
                    {tdata.sn}
                  </td>
                  <td>
                    {tdata.name}
                  </td>
                  <td>
                    <h6 className="mb-0" onClick={(e) => {
                                                e.preventDefault(); // NavLink 기본 이동 방지
                                                clickAdmin(tdata.sn);
                                            }}
                    >{tdata.id}</h6>
                  </td>
                  <td>
                    {tdata.authority}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminList;