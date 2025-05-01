import { Col, Row } from "reactstrap";
import {  Card, CardBody, CardTitle, CardSubtitle, Table, Button, Input} from "reactstrap";
import { useEffect, React, useState, useRef } from "react";
import * as adminService from "service/admin/admin/adminService";
import { useLocation, useNavigate } from 'react-router-dom';
import bS from "style/basic.module.css"

const AdminView = ({adminSn, adminList, setAdminSn}) => {
  const location = useLocation();
  // 관리자 정보
  const [getAdmin, setAdmin] = useState({});
  // 일련번호
  const [getAdminSn] = useState(adminSn);
  // 이름
  const [getAdminName, setAdminName] = useState("");
  // 아이디
  const [getAdminId, setAdminId] = useState("");
  // 비밀번호
  const [getAdminPwd, setAdminPwd] = useState("");

  const navigate = useNavigate();

  const getAdminByFetcher = async  (adminSn) => {
    if(adminSn !=""){  // adminSn이 담겨있을때만 정보조회
      const inputData ={
        id:adminSn,
      };
  
      adminService.fetcherAdmin(inputData).then((outPutData) => {
        //console.log(outPutData);
        setAdmin(outPutData.data);
        setAdminId(outPutData.data.id)
        setAdminName(outPutData.data.name)
        setAdminPwd(outPutData.data.passWord)
      })       
    }
    
  };

  const saveAdminInfo = async  () => {

    if(getAdminId ==""){
      alert("아이디를 입력해주세요!");
      return false;
    }

    if(getAdminPwd ==""){
      alert("비밀번호를 입력해주세요!");
      return false;
    }

    if(getAdminName==""){
      alert("이름을 입력해주세요!");
      return false;
    }

    const inputData ={
      id: getAdminSn ? getAdminSn : 0,
      adminId: getAdminId,
      passWord: getAdminPwd,
      name: getAdminName
    };
    adminService.fetcherAdminSave(inputData).then((outPutData) => {
      if(outPutData.result === "SUCCESS" && outPutData.data != null){
        const adminSn = outPutData.data.sn;
        alert("완료되었습니다.")
        adminList();
        
      }else if (outPutData.data == null){
        alert("관리자 아이디가 중복입니다.")
      }
    })       
  } 

  const deleteAdmin = async  () => {
    const inputData ={
      id: getAdminSn,
    };
    adminService.fetcherAdminDelte(inputData).then((outPutData) => {
      if(outPutData.result === "SUCCESS"){
        alert("완료되었습니다.")
        adminList();
        setAdminSn("");
        
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
    getAdminByFetcher(getAdminSn);
  },[])

  return (
    <div style={{display:"flex", width:"100%", alignContent:"center", marginTop:"1%"}}>
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
            {Object.keys(getAdmin).length !== 0 ? (
                          <Button style={{width:"15%", marginRight:"3%", float:"right"}} 
                          color="danger"
                          onClick={() => deleteAdmin()}
                          >
                            삭제
                          </Button>
                        ):(
                          <></>
                        ) 
            }
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