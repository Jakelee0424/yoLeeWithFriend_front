import { useEffect, React, useState, useRef } from "react";
import {  Card, CardBody, CardTitle, CardSubtitle, Table, Button, } from "reactstrap";
import loginStyle from "style/login.module.css"
import basicStyle from "style/basic.module.css"
import Logo from "../template/Logo";
import * as adminLoginService from "service/admin/login/adminLoginService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  
  // 아이디
  const [getAdminId, setAdminId] = useState("");

  // 비밀번호
  const [getAdminPassWord, setAdminPassWord] = useState("");

  const saveAdminId = event => {
    setAdminId(event.target.value);
  };

  const saveAdminPassWord = event => {
    setAdminPassWord(event.target.value);
  };

  const navigate = useNavigate();


  const adminLogin = async  () => {
    const inputData ={
      id : getAdminId,
      passWord : getAdminPassWord
    }

    adminLoginService.fetcherAdminLogin(inputData).then((outPutData) => {

        if(outPutData.data != null){
          sessionStorage.setItem("accessToken", outPutData.data.accessToken);
          navigate(`/admin`);
        }else{
          alert("로그인에 실패했습니다. 아이디 또는 비밀번호를 확인하세요.")
        }
    })
  };

  return (
    <div className={loginStyle.loginContainer} >
        <Logo></Logo>
        <Card  style={{height:"40%", width:"25%"}}>
          <CardBody style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
              <label className={basicStyle.basicLabel} >아이디</label>
              <input className={basicStyle.basicInput}
                value={getAdminId}
                onChange={saveAdminId}
              ></input> 
              <label className={basicStyle.basicLabel} >비밀번호</label>
              <input className={basicStyle.basicInput}
                value={getAdminPassWord}
                onChange={saveAdminPassWord}
                type="password"
              ></input>
              <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"10%"}} >
                <Button style={{width:"40%"}} 
                        color="primary"
                        onClick={adminLogin}
                >
                  로그인
                </Button> 
              </div>          
          </CardBody>
        </Card>
    </div>
  );
};

export default Login;