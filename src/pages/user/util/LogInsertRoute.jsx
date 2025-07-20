// src/utils/IPBlockProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import * as logsService from "service/admin/logs/logsService";

function LogInsertRoute() {
    const navigate = useNavigate();
    const location = useLocation();
  useEffect(() => {
    const checkIpBlock = async () => {
      try {

        const ipRes = await axios.get("https://api.ipify.org?format=json");
        const userIp = ipRes.data.ip;
        const userAgent = navigator.userAgent;
        let device = "";
        if (/Windows NT/.test(userAgent)) {
          device = "Windows";
        } else if (/Mac OS X/.test(userAgent)) {
          device = "MacOS";
        } else if (/Android/.test(userAgent)) {
          device = "Android";
        } else if (/iPhone|iPad/.test(userAgent)) {
          device = "iOS";
        } else if (/Linux/.test(userAgent)) {
          device = "Linux";
        } else {
          device = "Unknown OS";
        }

        function getBrowserName() {
          const userAgent = navigator.userAgent;

          if (userAgent.includes("Edg")) return "Edge";
          if (userAgent.includes("OPR") || userAgent.includes("Opera")) return "Opera";
          if (userAgent.includes("Chrome")) return "Chrome";
          if (userAgent.includes("Safari")) return "Safari";
          if (userAgent.includes("Firefox")) return "Firefox";
          if (userAgent.includes("MSIE") || userAgent.includes("Trident")) return "Internet Explorer";

          return "Unknown";
        }

        const inputData ={
            ipAddress  : userIp,
            browser : getBrowserName(),
            device : device,
            url : location.pathname
        };

        logsService.fetcherLogsSave(inputData).then((outPutData) => {
           console.log(outPutData)
        })

        
      } catch (err) {
        console.error("IP 확인 실패", err);
      } finally {
       
      }
    };

    checkIpBlock();
  }, [location]);


  return <Outlet />;
}

export default LogInsertRoute;
