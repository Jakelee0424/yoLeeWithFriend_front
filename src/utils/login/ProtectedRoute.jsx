import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "./auth";
import * as logsService from "service/admin/logs/logsService";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // const currentUrl = window.location.href;
  // console.log(currentUrl)

  // const saveBoardInfo = async  () => {

  //   const inPutData = {};

  //   logsService.fetcherLogsSave(inPutData).then((outPutData) => {
  //     console.log(outPutData)
  //   })  
  // }

  //saveBoardInfo();

  if (!isAuthenticated()) {
    // 로그인 안됐으면 로그인 페이지로 이동
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // 로그인 되어있으면 해당 페이지 보여줌
  return children;
};

export default ProtectedRoute;