import { Button, Col, Input, Row } from "reactstrap";
import {  Card, CardBody, CardTitle, CardSubtitle, Table} from "reactstrap";
import Blog from "../../../otherLib/bootStrap/components/dashboard/Blog";

const logo = process.env.PUBLIC_URL+"/asset/images/title.png";
const tempImg1 = process.env.PUBLIC_URL+"/asset/images/BSN 신타6 엣지 1.92kg 초코 (48회분).png";

const BoardList = () => {
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
            />
            <Input
              id="adminPwd"
              name="adminPwd"
              value={"ssss"}
              type="text"
              style={{width:"15%"}}
            />
            <Button style={{width:"15%", marginRight:"3%", float:"right"}} 
                          color="danger"
                          >
                            삭제
                          </Button>
          </CardSubtitle>
          <Row>
            <Col sm="6" lg="6" xl="3">
                <input type="checkbox" />
                <Blog
                  image={tempImg1}
                  title={"BSN 신타6 엣지 1.92kg 초코 (48회분)"}
                  text={`맛 : 3.5 가격 : 3.5 성분 : 3.5`}
                />
            </Col>
            <Col sm="6" lg="6" xl="3">
                <input type="checkbox" />
                <Blog
                  image={tempImg1}
                  title={"BSN 신타6 엣지 1.92kg 초코 (48회분)"}
                  text={`맛 : 3.5 가격 : 3.5 성분 : 3.5`}
                />
            </Col>
            <Col sm="6" lg="6" xl="3">
                <input type="checkbox" />
                <Blog
                  image={tempImg1}
                  title={"BSN 신타6 엣지 1.92kg 초코 (48회분)"}
                  text={`맛 : 3.5 가격 : 3.5 성분 : 3.5`}
                />
            </Col>
            <Col sm="6" lg="6" xl="3">
                <input type="checkbox" />
                <Blog
                  image={tempImg1}
                  title={"BSN 신타6 엣지 1.92kg 초코 (48회분)"}
                  text={`맛 : 3.5 가격 : 3.5 성분 : 3.5`}
                />
            </Col>
            <Col sm="6" lg="6" xl="3">
                <input type="checkbox" />
                <Blog
                  image={tempImg1}
                  title={"BSN 신타6 엣지 1.92kg 초코 (48회분)"}
                  text={`맛 : 3.5 가격 : 3.5 성분 : 3.5`}
                />
            </Col>
            <Col sm="6" lg="6" xl="3">
                <input type="checkbox" />
                <Blog
                  image={tempImg1}
                  title={"BSN 신타6 엣지 1.92kg 초코 (48회분)"}
                  text={`맛 : 3.5 가격 : 3.5 성분 : 3.5`}
                />
            </Col>
            <Col sm="6" lg="6" xl="3">
                <input type="checkbox" />
                <Blog
                  image={tempImg1}
                  title={"BSN 신타6 엣지 1.92kg 초코 (48회분)"}
                  text={`맛 : 3.5 가격 : 3.5 성분 : 3.5`}
                />
            </Col>
            <Col sm="6" lg="6" xl="3">
                <input type="checkbox" />
                <Blog
                  image={tempImg1}
                  title={"BSN 신타6 엣지 1.92kg 초코 (48회분)"}
                  text={`맛 : 3.5 가격 : 3.5 성분 : 3.5`}
                />
            </Col>    
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default BoardList;