import { Col, Row } from "reactstrap";
import {  Card, CardBody, CardTitle, CardSubtitle, Table , Input, Button } from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, React, useState, useRef } from "react";
import * as userService from "service/user/user/userService";
import bS from "style/basic.module.css"

const MemberList = () => {

  // 관리자 목록
  const [getUserList, setUserList] = useState([]);
  // 호버 이벤트 
  const [hovered, setHovered] = useState(false);

  // 네비게이터
  const navigate = useNavigate(); 

  const getUserListByFetcher = async  () => {
      const inputData ={
      
      };

      userService.fetcherUserList(inputData).then((outPutData) => {
        console.log(outPutData.data)
        setUserList(outPutData.data);
      })
  };

  const deleteUser = async  (userId) => {
    const inputData ={
      id: userId,
    };
    userService.fetcherUserDelte(inputData).then((outPutData) => {
      if(outPutData.result === "SUCCESS"){
        alert("완료되었습니다.")
        navigate(`/admin/memberMngr`);
      }
    })       
  };

  const updateUserStatus = async  (userId, userStatus) => {
    const inputData ={
      id: userId,
      status: userStatus
    };
    userService.fetcherUserStatus(inputData).then((outPutData) => {
      if(outPutData.result === "SUCCESS"){
        alert("완료되었습니다.");
      }
    })       
  };

  const viewUserReviewList = async  (userId) => {
    const inputData ={
      id: userId,
    };
    alert("모달 공통 컴포넌트 구현시 까지 대기");      
  };  

  useEffect(() => {
    getUserListByFetcher();
  },[])

  return (
    <div style={{display:"flex",width:"100%"}}>
      <Card style={{width:"100%"}}>
        <CardBody>
          <CardTitle tag="h5">회원관리</CardTitle>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>순번</th>
                <th>닉네임</th>
                <th>Oauth Type</th>
                <th>상태값</th>
                <th>관리기능</th>
              </tr>
            </thead>
            <tbody>
              {getUserList.map((tdata, index) => (
                <tr key={index} className={`${bS.hoverRow} border-top`} >
                  <td>
                    {tdata.id}
                  </td>
                  <td>
                    {tdata.nickName}
                  </td>
                  <td>
                    {tdata.oauthType}
                  </td>
                  <td>
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => updateUserStatus(tdata.id,e.target.value)}  
                      defaultValue={tdata.status}
                    > 
                     <option value="nomal">일반</option>
                     <option value="ban">정지</option>  
                    </Input>
                  </td>
                  <td>
                    <div>
                      <Button style={{width:"30%", marginRight:"3%", float:"left"}} 
                                          color="danger"
                                          onClick={() => deleteUser(tdata.id)}
                                  >
                                    삭제
                                  </Button>
                      <Button style={{width:"40%", marginRight:"3%", float:"left"}} 
                              color="secondary"
                              onClick={() => viewUserReviewList(tdata.id)}
                      >
                        리뷰 리스트 보기
                      </Button>            
                    </div>
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

export default MemberList;