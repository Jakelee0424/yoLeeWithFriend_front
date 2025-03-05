import {  Card, CardBody, CardTitle, CardSubtitle, Table, Button, } from "reactstrap";
import loginStyle from "../../../style/login.module.css"
import basicStyle from "../../../style/basic.module.css"
import Logo from "../template/Logo";

const Login = () => {
  return (
    <div className={loginStyle.loginContainer} >
        <Logo></Logo>
        <Card  style={{height:"40%", width:"25%"}}>
          <CardBody style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
              <label className={basicStyle.basicLabel} >아이디</label>
              <input className={basicStyle.basicInput}>
              </input> 
              <label className={basicStyle.basicLabel} >비밀번호</label>
              <input className={basicStyle.basicInput}>
              </input>
              <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"10%"}} >
                <Button style={{width:"40%"}} color="primary">로그인</Button> 
              </div>
              
          </CardBody>
        </Card>
    </div>
  );
};

export default Login;