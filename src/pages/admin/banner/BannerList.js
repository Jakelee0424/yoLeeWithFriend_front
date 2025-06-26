import { Col, Row } from "reactstrap";
import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Form, FormGroup, Label, Input } from "reactstrap";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as bannerService from "service/admin/banner/bannerService";
import dayjs from 'dayjs';
import bannerStyle from "style/banner.module.css"

const BannerList = () => {
  const [selectedBannerIds, setSelectedBannerIds] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState([]);
  const [btnToggleFlg, setBtnToggleFlg] = useState(true);

  const toggleBtnFlg = () => {
    if(btnToggleFlg){
      setBtnToggleFlg(false);
    }else{
      setBtnToggleFlg(true);
    }
  }

  const handleCheckboxChange = (id, checked) => {
  setSelectedBannerIds((prev) =>
    checked ? [...prev, id] : prev.filter((bid) => bid !== id)
  );
};

const toggleCheckbox = (id) => {
  setSelectedBannerIds((prev) =>
    prev.includes(id) ? prev.filter((bid) => bid !== id) : [...prev, id]
  );
};

  const handleBannerNameChange = (e) => {
    setSelectedBanner({
      bannerName: e.target.value
      }
    );
  };

  const handleCreateDateChange = (e) => {
    setSelectedBanner({
      createdAt: e.target.value
      }
    );
  };

  const handleValidDaysChange = (e) => {
    setSelectedBanner({
      validDays: e.target.value
      }
    );
  };

  const handleRowClick = (tdata) => {

    if(selectedBannerIds == null || selectedBannerIds !== tdata.bannerId){
      setSelectedBannerIds(tdata.bannerId);
      setSelectedBanner({
        bannerId: tdata.bannerId,
        bannerName: tdata.bannerName,
        createdAt: dayjs(tdata.createdAt).add(tdata.validDays, 'day').format('YYYY-MM-DD'),
        validDays: tdata.validDays,
      });
    }else{
      setSelectedBannerIds(null);
      setSelectedBanner({
        bannerId: "",
        bannerName: "",
        createdAt: "",
        validDays: "",
      });
    }
  };

  const getBannerList = async  () => {
      bannerService.fetcherbannerList().then((outPutData) => {
      setTableData(outPutData.data)
        console.log(outPutData.data)
    })
  };

  const getExpiredBannerList = async  () => {
      bannerService.fetcherExpiredbannerList().then((outPutData) => {
      setTableData(outPutData.data)
        console.log(outPutData.data)
    })
  };

useEffect(() => {
  getBannerList();
},[])

const [tableData, setTableData] = useState([]);

const handleLevelChange = (level, direction) => {
  setTableData(prev => {
    const dataCopy = [...prev];

    // level 기준으로 정렬
    const sorted = dataCopy.sort((a, b) => Number(a.level) - Number(b.level));
    const index = sorted.findIndex(item => item.level === level);
    if (index === -1) return prev;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= sorted.length) return prev;

    // level 스왑
    const temp = sorted[index].level;
    sorted[index].level = sorted[targetIndex].level;
    sorted[targetIndex].level = temp;

    return [...sorted];
  });
};

  return (
    <div style={{display:"flex",width:"100%"}} >
      <Card style={{width:"100%"}}>
        <CardBody>
          <CardTitle tag="h5">배너 관리</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            배너 현황 확인 및 등록,삭제
          </CardSubtitle>
          <hr/>

          <div>
            <Button 
            color={btnToggleFlg ? "primary" : "secondary"} 
            outline={!btnToggleFlg} 
            onClick={(btnToggleFlg) => {getBannerList(); toggleBtnFlg(btnToggleFlg)}} > 
              활성 배너
            </Button>
            &nbsp;
            <Button 
            color={btnToggleFlg ? "secondary" : "primary"} 
            outline={btnToggleFlg} 
            onClick={(btnToggleFlg) => {getExpiredBannerList(); toggleBtnFlg(btnToggleFlg)}}> 
              만료 배너 
            </Button>
          </div>

          <div>
            <Table className="no-wrap mt-3 align-middle" responsive borderless hover>
              <thead>
                <tr>
                  <th></th>
                  <th>ID</th>
                  <th>배너명</th>
                  <th>시작 일시</th>
                  <th>종료 일시</th>
                </tr>
              </thead>
              <tbody>
                  {[...tableData]
                  .sort((a, b) => Number(a.level) - Number(b.level))
                  .map((tdata) => (
                    <motion.tr
                      key={tdata.bannerId}
                      layout
                      transition={{ duration: 0.3 }}
                      // className={`${bannerStyle['table-row']} ${tdata.bannerId === selectedBannerId ? bannerStyle.selected : ''}`}
                    >
                      <td className="chekbox">
                        <Input type="checkbox"
                          checked={selectedBannerIds.includes(tdata.bannerId)}
                          onChange={(e) => handleCheckboxChange(tdata.bannerId, e.target.checked)}
                        />
                      </td>
                      <td className="cell">{tdata.bannerId}</td>
                      <td className="cell">{tdata.bannerName}</td>
                      <td className="cell">{dayjs(tdata.createdAt).format('YYYY-MM-DD HH:mm')} ( 계약 기간: {tdata.validDays}일 )</td>
                      <td className="cell">{dayjs(tdata.createdAt).add(tdata.validDays, 'day').format('YYYY-MM-DD HH:mm')}</td>
                      <td className="cell">
                        <Button onClick={(e) => { e.stopPropagation(); handleLevelChange(tdata.level, 'up'); }}>Up</Button>
                        &nbsp;
                        <Button onClick={(e) => { e.stopPropagation(); handleLevelChange(tdata.level, 'down'); }}>Down</Button>
                      </td>
                    </motion.tr>
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
                    <Label for="bannerName">
                      배너명
                    </Label>
                    <Input
                      id="bannerName"
                      name="bannerName"
                      placeholder="배너명 입력"
                      type="text"
                      value={selectedBanner.bannerName}
                      onChange={handleBannerNameChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for="createdAt">
                      배너 등록일
                    </Label>
                    <Input
                      id="createdAt"
                      name="createdAt"
                      type="date"
                      value={selectedBanner.createdAt}
                      onChange={handleCreateDateChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for="validDays">
                      계약 기간
                    </Label>
                    <Input
                      id="validDays"
                      name="validDays"
                      type="text"
                      value={selectedBanner.validDays}
                      onChange={handleValidDaysChange}
                    />
                  </FormGroup>
                </Col>
                <Col></Col>
                <Col md={1}> 
                  <Button color="secondary" outline className="bannerInsertBtn" disabled={selectedBannerIds.length !== 0}> 등록 </Button>
                </Col>
                <Col md={1}> 
                  <Button color="secondary" outline className="bannerUpdateBtn" disabled={selectedBannerIds.length !== 1}> 변경 </Button>
                </Col>
                <Col md={1}> 
                  <Button color="danger" outline className="bannerDeleteBtn" disabled={selectedBannerIds.length < 1}> 삭제 </Button>
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