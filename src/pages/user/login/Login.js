
import React, { useEffect } from "react";
import moduleStyle from "../../../style/common.module.css";
import Logo from "pages/admin/template/Logo";
import { Link } from "react-router-dom";

const Login = () => {
    const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
    const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;
    const KAKAO_CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
    const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const STATE = "false";
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${NAVER_REDIRECT_URI}`;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}`;
    const naver = process.env.PUBLIC_URL+"/asset/images/naver.png";
    const kakao = process.env.PUBLIC_URL+"/asset/images/kakao.png";


    const naverLoginClick = () => {
        window.open(NAVER_AUTH_URL,'_blank','width=700, height=600, top=50, left=50, scrollbars=yes');     
    };
    const kakaoLoginClick = () => {
        window.open(KAKAO_AUTH_URL,'_blank','width=700, height=600, top=50, left=50, scrollbars=yes');     
    };

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data === "naver_login_success") {
                //console.log("로그인 성공!");
                window.opener.postMessage("naver_login_success", "*");
                window.close();
            }else if(event.data === "kakao_login_success"){
                window.opener.postMessage("kakao_login_success", "*");
                window.close();
            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);
        
    return  <div>
                <div className="body" style={{display:"flex", height:"97vh",}}>        
                    <div className={moduleStyle.bodySideHeight100} style={{border:"solid black 0px"}}>
                    </div>
                    <div className={`${moduleStyle.bodyCenter} ${moduleStyle.verticalHorizontalCenter}`}  style={{border:"solid black 0px"}}>
                        <div style={{border:"solid black 0px",height: "60vh", width: "60vh"}} >
                            <div style={{border:"solid black 0px",height:"20vh", justifyContent:"center",display:"flex" }}>
                                <Link to={"/"} style={{paddingBottom:"1%"}}>
                                    <Logo />
                                </Link>
                            </div>
                            <div style={{border:"solid black 0px",height:"40vh"}}>
                                <div style={{border:"solid black 0px",height:"10vh",margin:"2vh",justifyContent:"center",display:"flex"}}>
                                    <div onClick={naverLoginClick} style={{cursor:"pointer"}}>
                                        <img  src={naver} style={{width:"40vh" }} ></img>
                                    </div>
                                </div>
                                <div style={{border:"solid black 0px",height:"10vh",margin:"2vh",justifyContent:"center",display:"flex"}}>
                                    <div onClick={kakaoLoginClick} style={{cursor:"pointer"}}>
                                        <img  src={kakao} style={{width:"40vh" }} ></img>
                                    </div>
                                </div>
                                <div style={{border:"solid black 0px",height:"10vh"}} >
                                </div>  
                            </div>
                        </div>
                    </div>
                    <div className={moduleStyle.bodySideHeight100}  style={{border:"solid black 0px"}}>
                    </div>      
                </div>
            </div>;
};

export default Login;

