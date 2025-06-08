import { Col, Row } from "reactstrap";
import {  Card, CardBody, CardTitle, CardSubtitle, Table, Button, Input} from "reactstrap";
import { useEffect, React, useState, useRef } from "react";
import * as adminService from "service/admin/admin/adminService";
import { useLocation, useNavigate } from 'react-router-dom';
import bS from "style/basic.module.css"
import Blog from "otherLib/bootStrap/components/dashboard/Blog";

const BoardView = () => {
  const location = useLocation();

  const tempImg1 = process.env.PUBLIC_URL+"/asset/images/BSN 신타6 엣지 1.92kg 초코 (48회분).png";

  // 관리자 정보
  const [getAdmin, setAdmin] = useState({});
  // 일련번호
  const [getAdminSn] = useState(1);
  // 이름
  const [getBoardName, setBoardName] = useState("");
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

    if(getBoardName==""){
      alert("제품명을 입력해주세요!");
      return false;
    }

    const inputData ={
    };
    adminService.fetcherAdminSave(inputData).then((outPutData) => {
      if(outPutData.result === "SUCCESS" && outPutData.data != null){
        const adminSn = outPutData.data.sn;
        alert("완료되었습니다.")
        
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
        //adminList();
        
      }
    })       
  } 

  const saveBoardName = event => {
    setBoardName(event.target.value);
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

  const clickBoardImg = (boardId) => {
    alert("개발중 boardId: " + boardId);
  };

  useEffect(() => {
    //getAdminByFetcher(getAdminSn);
  },[])

  return (
    <div style={{display:"flex", width:"100%", alignContent:"center", marginTop:"1%"}}>
      <Card style={{width:"30%", height:"10%", marginRight:"1%"}}>
        <CardBody>
          <Row>
             <Col sm="6" lg="6" xl="3"
                style={{cursor:"pointer", width:"100%"}}
                onClick={(e) => {
                  e.preventDefault(); // NavLink 기본 이동 방지
                  clickBoardImg(1);
                }}
              >
                <Blog
                  image={tempImg1}
                  text={`맛 : 3.5 가격 : 3.5 성분 : 3.5`}
                />
              </Col>
          </Row>
        </CardBody>
      </Card>
      <Card style={{width:"70%"}}>
        <CardBody>
          <CardTitle tag="h5">게시물 상세정보</CardTitle>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <tbody>
                <tr className="border-top">
                  <td>
                    제품명
                  </td>
                  <td>
                    <Input
                      id="boardName"
                      name="boardName"
                      value={getBoardName}
                      onChange={saveBoardName}
                      type="text"
                    />
                  </td>
                </tr>
                <tr className="border-top">
                  <td>
                    회사명
                  </td>
                  <td>
                    <Input
                      type="select"
                      name="brandCodeId"
                      id="brandCodeId" 
                      style={{width:"30%", marginRight:"3%"}}
                    > 
                      <option value="boardBrand01">마이프로틴</option>
                      <option value="boardBrand02">신타6</option>  
                      <option value="boardBrand03">옵티멈 뉴트리션</option>  
                    </Input>
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

export default BoardView;