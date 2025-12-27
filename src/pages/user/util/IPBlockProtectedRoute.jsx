// src/utils/IPBlockProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import * as logsService from "service/admin/logs/logsService";

function IPBlockProtectedRoute() {
    const navigate = useNavigate();
    
  useEffect(() => {
    const checkIpBlock = async () => {
      try {

        const ipRes = await axios.get("https://api.ipify.org?format=json");
        const userIp = ipRes.data.ip;
        const inputData ={
            ipAddress  : userIp
        };

        logsService.fetcherGetIpBlock(inputData).then((outPutData) => {
            //console.log(outPutData.data)
            if(outPutData.data.message == "Block"){
                alert(userIp + " 정책상 차단된 아이피입니다.")
                navigate("/");
            }else{
                // console.log(userIp)
                // console.log(outPutData.data.message)
            }
        })

        
      } catch (err) {
        console.error("IP 확인 실패", err);
      } finally {
       
      }
    };

    const checkUserBlock = async () => {
      try {

        const ipRes = await axios.get("https://api.ipify.org?format=json");
        const userIp = ipRes.data.ip;
        const inputData ={
            ipAddress  : userIp
        };

        logsService.fetcherGetIpBlock(inputData).then((outPutData) => {
            //console.log(outPutData.data)
            if(outPutData.data.message == "Block"){
                alert(userIp + " 정책상 차단된 아이피입니다.")
                navigate("/");
            }else{
                // console.log(userIp)
                // console.log(outPutData.data.message)
            }
        })

        
      } catch (err) {
        console.error("IP 확인 실패", err);
      } finally {
       
      }
    };

    checkIpBlock();
  }, []);


  return <Outlet />;
}

export default IPBlockProtectedRoute;
