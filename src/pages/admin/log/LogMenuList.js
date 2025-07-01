import { Col, Row } from "reactstrap";
import {  Card, CardBody, CardTitle, CardSubtitle, Table, Button, Input} from "reactstrap";
import { useEffect, React, useState, useRef } from "react";
import * as adminService from "service/admin/admin/adminService";
import { useLocation, useNavigate } from 'react-router-dom';
import bS from "style/basic.module.css"

const LogMenuList = ({}) => {
  const location = useLocation();


  const navigate = useNavigate();

  useEffect(() => {
    
  },[])

  return (
    <div style={{display:"flex", width:"100%", alignContent:"center", marginTop:"1%"}}>
      <Card style={{width:"100%"}}>
        <CardBody>
          <CardTitle tag="h5"></CardTitle>
          
        </CardBody>
      </Card>
    </div>
  );
};

export default LogMenuList;