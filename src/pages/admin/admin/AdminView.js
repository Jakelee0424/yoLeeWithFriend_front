import { Col, Row } from "reactstrap";
import {  Card, CardBody, CardTitle, CardSubtitle, Table, Button, } from "reactstrap";
import { useEffect, React, useState, useRef } from "react";
import * as adminService from "service/admin/admin/adminService";
import { useLocation } from 'react-router-dom';
import bS from "style/basic.module.css"

const AdminView = () => {
  const location = useLocation();
  // 관리자 정보
  const [getAdmin, setAdmin] = useState({});
  // 이름
  const [getAdminName, setAdminName] = useState("");

  const getAdminByFetcher = async  () => {
      const inputData ={
        id:location.state.adminSn,
      };

      adminService.fetcherAdmin(inputData).then((outPutData) => {
        //console.log(outPutData);
        setAdmin(outPutData.data);
        setAdminName(outPutData.data.name)
      })
  };

  const saveAdminName = event => {
    setAdminName(event.target.value);
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
            <tbody>
                <tr className="border-top">
                  <td>
                    이름
                  </td>
                  <td>
                  <input className={bS.basicInput}
                    value={getAdminName}
                    onChange={saveAdminName}
                  ></input> 
                  </td>
                </tr>
                <tr className="border-top">
                  <td>
                    아이디
                  </td>  
                  <td>
                    {getAdmin.id}
                  </td>
                </tr>
                <tr className="border-top">
                  <td>
                    권한
                  </td>
                  <td>
                    {getAdmin.authority}
                  </td>
                </tr>
            </tbody>
          </Table>
          <div style={{marginBottom:"3%"}} >
            <Button style={{width:"15%", marginRight:"3%", float:"right"}} 
                    color="danger"
                    onClick={console.log("test")}
            >
              삭제
            </Button>
            <Button style={{width:"15%", marginRight:"3%", float:"right"}} 
                    color="primary"
                    onClick={console.log("test")}
            >
              저장
            </Button> 
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminView;