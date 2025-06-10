import { Button, Col, Input, Row } from "reactstrap";
import {  Card, CardBody, CardTitle, CardSubtitle, Table} from "reactstrap";
import Blog from "../../../otherLib/bootStrap/components/dashboard/Blog";
import { useEffect, useState } from "react";
import * as boardMngrService from "service/admin/boardMngr/boardMngrService";
import { useNavigate } from "react-router-dom";

const logo = process.env.PUBLIC_URL+"/asset/images/title.png";
const tempImg1 = process.env.PUBLIC_URL+"/asset/images/BSN 신타6 엣지 1.92kg 초코 (48회분).png";
const tempImg2 = process.env.PUBLIC_URL+"/asset/images/엑스텐드 프로 웨이 아이솔레이트 64서빙.jpg";

const BoardList = () => {

  const navigate = useNavigate();

  // 게시물 목록
  const [getBoardMngrList, setBoardMngrList] = useState([]);

  const getBoardMngrListByFetcher = async  () => {
      const inputData ={
      
      };

      boardMngrService.fetcherBoardMngrList(inputData).then((outPutData) => {
        console.log(outPutData.data)
        setBoardMngrList(outPutData.data);
      })
  };

  const clickBoard = (boardId) => {
    navigate(`/admin/boardView/${boardId}`);
  };

  useEffect(() => {
    getBoardMngrListByFetcher();
  },[])
  
  return (
    <div style={{display:"flex",width:"100%"}}>
      <Card style={{width:"100%"}}>
        <CardBody>
          <CardTitle tag="h5">게시물 관리</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6" style={{display: "flex"}}>
            <Input
              id="adminPwd"
              name="adminPwd"
              type="checkbox"
              style={{marginRight:"3%"}}
            />
            <Input
              type="select"
              name="select"
              id="exampleSelect" 
              style={{width:"10%", marginRight:"1%"}}
            > 
              <option value="nomal">일반</option>
              <option value="ban">정지</option>  
            </Input>
            <Input
              id="adminPwd"
              name="adminPwd"
              placeholder={"회사명"}
              type="text"
              style={{width:"30%", marginRight:"1%"}}
            />
            <Button style={{width:"10%", marginRight:"5%", float:"right"}} 
                    color="primary"
            >
              검색
            </Button>
            <Button style={{width:"8%", marginRight:"1%", float:"right"}} 
                                color="primary"
                        >
                          등록
                        </Button>
            <Button style={{width:"8%", marginRight:"1%", float:"right"}} 
                          color="danger"
                          >
                            삭제
                          </Button>
          </CardSubtitle>
          <Row>
            {getBoardMngrList.map((tdata, index) => (
              <Col sm="6" lg="6" xl="3" key={index} 
                style={{cursor:"pointer"}}
              >
                <Input type="checkbox" name="boardCheckBox" />
                <div
                  style={{ flex: 1 }}
                  onClick={() => clickBoard(tdata.boardId)}
                > 
                  <Blog
                    image={tempImg1}
                    title={tdata.boardName}
                    text={`맛 : 3.5 가격 : 3.5 성분 : 3.5`}
                  />
                </div>
              </Col>
            ))}  
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default BoardList;