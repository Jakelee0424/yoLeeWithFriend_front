import { Col, Row } from "reactstrap";
import {  Card, CardBody, CardTitle, CardSubtitle, Table, Button, Input} from "reactstrap";
import { useEffect, React, useState, useRef } from "react";
import * as adminService from "service/admin/admin/adminService";
import { useLocation, useNavigate } from 'react-router-dom';
import bS from "style/basic.module.css"

const AdminView = () => {
  const location = useLocation();
  // 관리자 정보
  const [getAdmin, setAdmin] = useState({});
  // 이름
  const [getAdminName, setAdminName] = useState("");
  // 아이디
  const [getAdminId, setAdminId] = useState("");
  // 비밀번호
  const [getAdminPwd, setAdminPwd] = useState("");

  const navigate = useNavigate();

  const getAdminByFetcher = async  () => {

    if(location.state.adminSn !=""){  // adminSn이 담겨있을때만 정보조회
      const inputData ={
        id:location.state.adminSn,
      };
  
      adminService.fetcherAdmin(inputData).then((outPutData) => {
        //console.log(outPutData);
        setAdmin(outPutData.data);
        setAdminName(outPutData.data.name)
        setAdminPwd(outPutData.data.passWord)
      })       
    }
    
  };

  const saveAdminInfo = async  () => {
    const inputData ={
      id: location.state.adminSn ? location.state.adminSn : 0,
      adminId: getAdminId,
      passWord: getAdminPwd,
      name: getAdminName
    };
    adminService.fetcherAdminSave(inputData).then((outPutData) => {
      if(outPutData.result === "SUCCESS"){
        const adminSn = outPutData.data.sn;
        alert("완료되었습니다.")
        navigate(`/admin/adminView`, { state: {  adminSn } });
      }
    })       
  } 

  const saveAdminName = event => {
    setAdminName(event.target.value);
  };

  const saveAdminPwd = event => {
    setAdminPwd(event.target.value);
  };

  const saveAdminId = event => {
    setAdminId(event.target.value);
  };

  const goBack = () => {
    navigate(`/admin/adminMngr`);
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
                    <Input
                      id="adminNm"
                      name="adminNm"
                      value={getAdminName}
                      onChange={saveAdminName}
                      type="text"
                    />
                  </td>
                </tr>
                <tr className="border-top">
                  <td>
                    아이디
                  </td>
                  {getAdmin.id ? 
                  (
                  <td>
                     {getAdmin.id}
                   </td>
                  ) : 
                  (
                    <td>
                      <Input
                        id="adminId"
                        name="adminId"
                        value={getAdminId}
                        onChange={saveAdminId}
                        type="text"
                      />
                    </td>   
                  )}     
                </tr>
                <tr className="border-top">
                  <td>
                    비밀번호
                  </td>
                  <td>
                    <Input
                      id="adminPwd"
                      name="adminPwd"
                      value={getAdminPwd}
                      onChange={saveAdminPwd}
                      type="text"
                    />
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
                    color="secondary"
                    onClick={() => goBack()}
            >
              목록
            </Button>
            <Button style={{width:"15%", marginRight:"3%", float:"right"}} 
                    color="danger"
                    onClick={() => console.log("test")}
            >
              삭제
            </Button>
            <Button style={{width:"15%", marginRight:"3%", float:"right"}} 
                    color="primary"
                    onClick={() => saveAdminInfo()}
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