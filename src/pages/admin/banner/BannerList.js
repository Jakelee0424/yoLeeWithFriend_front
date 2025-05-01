import { Col, Row } from "reactstrap";
import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Form, FormGroup, Label, Input } from "reactstrap";
import React, { useState, useEffect } from 'react';
import { endOfDay } from "date-fns";

const tableData = [
  {
    id :"1",
    bannerNm : "테스트 배너 1",
    dueDate : "7",
    endDay : "2025-07-01"
  },
  {
    id :"2",
    bannerNm : "테스트 배너 2",
    dueDate : "5",
    endDay : "2025-08-01"
  },
  {
    id :"3",
    bannerNm : "테스트 배너 3",
    dueDate : "3",
    endDay : "2025-06-01"
  }
];

const BannerList = () => {
  const [selectedBannerId, setSelectedBannerId] = useState(null);
  const [bannerName, setBannerName] = useState("");
  const [bannerEndDay, setBannerEndDay] = useState("");

  const handleBannerNameChange = (e) => {
    setBannerName(e.target.value);
  };
  const handleDueDateChange = (e) => {
    setBannerEndDay(e.target.value);
  };

  const handleRowClick = (tdata) => {

    if(selectedBannerId == null || selectedBannerId != tdata.id){
      setSelectedBannerId(tdata.id);
      setBannerName(tdata.bannerNm);
      setBannerEndDay(tdata.endDay);
    }else{
      setSelectedBannerId(null);
      setBannerName("");
      setBannerEndDay("");
    }

  };

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
            <Table className="no-wrap mt-3 align-middle" responsive borderless hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>배너명</th>
                  <th>남은 기간</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((tdata) => (
                  <tr key={tdata.id} 
                      className={`border-top ${tdata.id === selectedBannerId ? 'table-primary' : ''}`}
                      onClick={() => handleRowClick(tdata)}
                      style={{ cursor: 'pointer' }}
                      >
                    <td>{tdata.id}</td>
                    <td>{tdata.bannerNm}</td>
                    <td>{tdata.dueDate} 일 ( 종료일자 : {tdata.endDay})</td>
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
                      value={bannerName}
                      onChange={handleBannerNameChange}
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
                      value={bannerEndDay}
                      onChange={handleDueDateChange}
                    />
                  </FormGroup>
                </Col>
                <Col></Col>
                <Col md={1}> 
                  <Button color="secondary" outline className="bannerInsertBtn" disabled={bannerName == "" || selectedBannerId != null}> 등록 </Button>
                </Col>
                <Col md={1}> 
                  <Button color="secondary" outline className="bannerUpdateBtn" disabled={selectedBannerId == null}> 변경 </Button>
                </Col>
                <Col md={1}> 
                  <Button color="danger" outline className="bannerDeleteBtn" disabled={selectedBannerId == null}> 삭제 </Button>
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