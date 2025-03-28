import { Col, Row } from "reactstrap";
import {  Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { useEffect, React, useState, useRef } from "react";
import * as adminService from "service/admin/admin/adminService";

const AdminView = () => {

  // 관리자 정보
  const [getAdmin, setAdmin] = useState({});

  const getAdminByFetcher = async  () => {
      const inputData ={
        id:1,
      };

      adminService.fetcherAdmin(inputData).then((outPutData) => {
        console.log(outPutData);
        setAdmin(outPutData.data);
      })
  };

  useEffect(() => {
    getAdminByFetcher();
  },[])

  return (
    <div style={{display:"flex", width:"100%", alignContent:"center"}}>
      <Card style={{width:"50%"}}>
        <CardBody>
          <CardTitle tag="h5">관리자 상세정보</CardTitle>
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
                <tr className="border-top">
                  <td>
                    {getAdmin.sn}
                  </td>
                  <td>
                    {getAdmin.name}
                  </td>
                  <td>
                    {getAdmin.id}
                  </td>
                  <td>
                    {getAdmin.authority}
                  </td>
                </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminView;