import { Col, Row } from "reactstrap";
import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Form, FormGroup, Label, Input } from "reactstrap";

const tableData = [
  {
    id :"1",
    bannerNm : "테스트 배너 1",
    dueDate : "3",
  },
  {
    id :"2",
    bannerNm : "테스트 배너 2",
    dueDate : "3",
  },
  {
    id :"3",
    bannerNm : "테스트 배너 3",
    dueDate : "3",
  }
];

const BannerList = () => {
  return (
    <div style={{display:"flex",width:"100%"}}>
      <Card style={{width:"100%"}}>
        <CardBody>
          <CardTitle tag="h5">배너 관리</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            배너 현황 확인 및 등록,삭제
          </CardSubtitle>
          <hr/>
          <div>
            <Table className="no-wrap mt-3 align-middle" responsive borderless>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>배너명</th>
                  <th>남은 기간</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((tdata, index) => (
                  <tr key={index} className="border-top">
                    <td>{tdata.id}</td>
                    <td>{tdata.bannerNm}</td>
                    <td>{tdata.dueDate} 일</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <hr/>

          <div>
            <Form style={{padding:"10px"}}>
              <Row>
                <Col md={3}>
                  <FormGroup>
                    <Label for="bannerNm">
                      배너명
                    </Label>
                    <Input
                      id="bannerNm"
                      name="bannerNm"
                      placeholder="배너명 입력"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="dueDate">
                      배너 유지 기한
                    </Label>
                    <Input
                      id="dueDate"
                      name="dueDate"
                      type="date"
                    />
                  </FormGroup>
                </Col>
                <Col></Col>
                <Col md={1}> 
                  <Button color="secondary" outline> 등록 </Button>
                </Col>
                <Col md={1}> 
                  <Button color="secondary" outline> 변경 </Button>
                </Col>
                <Col md={1}> 
                  <Button color="danger" outline> 삭제 </Button>
                </Col>
              </Row>
              <FormGroup>
                <Label for="bannerFile">
                  배너 사진 파일
                </Label>
                <Input
                  id="bannerFile"
                  name="bannerFile"
                  type="file"
                />
              </FormGroup>
              <Row>
                

              </Row>
            </Form>
            

          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default BannerList;