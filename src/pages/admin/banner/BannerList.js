import { Col, Row } from "reactstrap";
import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as bannerService from "service/admin/banner/bannerService";
import dayjs from 'dayjs';
import bannerStyle from "style/banner.module.css"

const BannerList = (args) => {
  const [selectedBannerIds, setSelectedBannerIds] = useState([]);
  const [bannerInfo, setBannerInfo] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [btnToggleFlg, setBtnToggleFlg] = useState(true);
  const [levelData, setLevelData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [fileImg, setfileImg] = useState(null);
  const [previewImg, setPreviewImg] = useState("");

  const toggle = () => {
    setModal(!modal);
  }

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
  } ;

  const bannerInsert = (bannerInfo) => {

    if(!bannerInfo.bannerName || bannerInfo.bannerName.trim() === ""){
      setModalMsg("배너명을 입력하세요")
      toggle();
      return;
    }else if(bannerInfo.createdAt == null) {
      setModalMsg("배너 시작일을 입력하세요")
      toggle();
      return;
    }else if(!bannerInfo.validDays || bannerInfo.validDays.trim() === ""){
      setModalMsg("유효 기간을 입력하세요")
      toggle();
      return;
    }else if(!fileImg){
      setModalMsg("배너 사진을 업로드하세요")
      toggle();
      return;
    }

    const formFileData = new FormData();
    formFileData.append('multipartFile', fileImg); // formData에 파일 추가
    formFileData.append('data', JSON.stringify(bannerInfo));
    
    bannerService.fetcherInsertBanner(formFileData).then((outPutData) => {
      setTableData(outPutData.data)
    })

    if(tableData != null){
      setSelectedBannerIds([]);
      setModalMsg("배너가 등록되었습니다.")
      toggle();
    }
  }

  const bannerUpdate = (bannerInfo) => {

    if(!bannerInfo.bannerName || bannerInfo.bannerName.trim() === ""){
      setModalMsg("배너명을 입력하세요")
      toggle();
      return;
    }else if(bannerInfo.createdAt == null) {
      setModalMsg("배너 시작일을 입력하세요")
      toggle();
      return;
    }else if(!bannerInfo.validDays || bannerInfo.validDays.trim === ""){
      setModalMsg("유효 기간을 입력하세요")
      toggle();
      return;
    }else if(!fileImg){
      setModalMsg("배너 사진을 업로드하세요")
      toggle();
      return;
    }
    
    const formFileData = new FormData();
    formFileData.append('multipartFile', fileImg); // formData에 파일 추가
    formFileData.append('data', JSON.stringify(bannerInfo));
    
    bannerService.fetcherBannerUpdate(formFileData).then((outPutData) => {
      setTableData(outPutData.data)
    })

    if(tableData != null){
      setSelectedBannerIds([]);
      setModalMsg("배너가 수정되었습니다.")
      toggle();
    }
  }

  const bannerDelete = (selectedBannerIds) => {
    bannerService.fetcherDeleteBanner(selectedBannerIds).then((outPutData) => {
      setTableData(outPutData.data)
    })
      setSelectedBannerIds([]);
      setModalMsg(selectedBannerIds.length + " 건이 삭제 되었습니다.")
      toggle();
  }

  const bannerRestore = (selectedBannerIds) => {
    bannerService.fetcherRestoreBanner(selectedBannerIds).then((outPutData) => {
      setTableData(outPutData.data)
    })
      setSelectedBannerIds([]);
      setModalMsg(selectedBannerIds.length + " 건이 복구 되었습니다.")
      toggle();
  }

  const handleBannerNameChange = (e) => {
    setBannerInfo(prev => ({
      ...prev,
      bannerName: e.target.value,
    }));
  };

  const handleCreateDateChange = (e) => {
    const dateOnly = e.target.value;
    const fullDateTime = `${dateOnly}T00:00:00`;

    setBannerInfo(prev => ({
      ...prev,
      createdAt: fullDateTime,
    }));
  };

  const handleValidDaysChange = (e) => {
    setBannerInfo(prev => ({
      ...prev,
      validDays: e.target.value,
    }));
  };
  
  const handelImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setfileImg(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  }

  const getBannerList = async  () => {
      bannerService.fetcherBannerList().then((outPutData) => {
      setTableData(outPutData.data)
    })
  };

  const getExpiredBannerList = async  () => {
      bannerService.fetcherExpiredBannerList().then((outPutData) => {
      setTableData(outPutData.data)
    })
  };

useEffect(() => {
   if(selectedBannerIds.length === 1){
    const selected = tableData.find(t => t.bannerId === selectedBannerIds[0]);
    setBannerInfo({
      bannerId: selected.bannerId,
      bannerName: selected.bannerName,
      createdAt: dayjs(selected.createdAt).format('YYYY-MM-DDT00:00:00'),
      validDays: selected.validDays,
    });
    if(selected.imgUrl){
      setPreviewImg(process.env.PUBLIC_URL + selected.imgUrl.split("public")[1].replace(/\\/g, "/"));
    }
  }else{
    setBannerInfo({
      bannerId: "",
      bannerName: "",
      createdAt: "",
      validDays: "",
    });
    setPreviewImg("");
  }
},[selectedBannerIds])

useEffect(() => {
  getBannerList();
},[])

const handleLevelChange = (level, bannerId, direction) => {
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

    // bannerId 기준으로 levelData 구성
    const newLevelData = [
      { bannerId: sorted[index].bannerId, level: sorted[index].level },
      { bannerId: sorted[targetIndex].bannerId, level: sorted[targetIndex].level }
    ];

    setLevelData(newLevelData);
    bannerService.fetcherBannerLevelChange(newLevelData); // API 호출

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
                  .map((tdata) => {
                    const isChecked = selectedBannerIds.includes(tdata.bannerId);

                    return (
                      <motion.tr
                        key={tdata.bannerId}
                        layout
                        transition={{ duration: 0.3 }}
                        onClick={() => {
                          handleCheckboxChange(tdata.bannerId, !isChecked);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <td className="chekbox">
                          <Input
                            type="checkbox"
                            checked={isChecked}
                            onClick={(e) => e.stopPropagation()} 
                            onChange={(e) => {
                              handleCheckboxChange(tdata.bannerId, e.target.checked);
                            }}
                          />
                        </td>
                        <td className="cell">{tdata.bannerId}</td>
                        <td className="cell">{tdata.bannerName}</td>
                        <td className="cell">
                          {dayjs(tdata.createdAt).format('YYYY-MM-DD')} ( 계약 기간: {tdata.validDays}일 )
                        </td>
                        <td className="cell">
                          {dayjs(tdata.createdAt).add(tdata.validDays, 'day').format('YYYY-MM-DD')}
                        </td>
                        <td className="cell">
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLevelChange(tdata.level, tdata.bannerId, 'up');
                            }}
                          >
                            Up
                          </Button>
                          &nbsp;
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLevelChange(tdata.level, tdata.bannerId, 'down');
                            }}
                          >
                            Down
                          </Button>
                        </td>
                      </motion.tr>
                    );
                  })}
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
                      value={bannerInfo.bannerName}
                      onChange={handleBannerNameChange}
                      disabled={selectedBannerIds.length > 1}
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
                      value={bannerInfo.createdAt ? bannerInfo.createdAt.split('T')[0] : ''}
                      onChange={handleCreateDateChange}
                      disabled={selectedBannerIds.length > 1}
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
                      value={bannerInfo.validDays}
                      onChange={handleValidDaysChange}
                      disabled={selectedBannerIds.length > 1}
                    />
                  </FormGroup>
                </Col>
                <Col></Col>
                <Col md={1}> 
                  <Button 
                    color="secondary" 
                    outline 
                    className="bannerInsertBtn" 
                    disabled={selectedBannerIds.length !== 0}
                    onClick={() => {bannerInsert(bannerInfo);}}
                    > 등록 
                  </Button>
                </Col>
                <Col md={1}> 
                  <Button 
                    color="secondary" 
                    outline 
                    className="bannerUpdateBtn" 
                    disabled={selectedBannerIds.length !== 1}
                    onClick={() => {bannerUpdate(bannerInfo);}}
                    > 변경 
                  </Button>
                </Col>
                {btnToggleFlg && (
                  <Col md={1}> 
                    <Button 
                      color="danger" 
                      outline 
                      className="bannerDeleteBtn" 
                      disabled={selectedBannerIds.length < 1}
                      onClick={() => {
                        bannerDelete(selectedBannerIds);
                        toggle();
                      }}
                    >
                      삭제
                    </Button>
                  </Col>
                )}
                {!btnToggleFlg && (
                  <Col md={1}> 
                    <Button 
                      color="danger" 
                      outline 
                      className="bannerDeleteBtn" 
                      disabled={selectedBannerIds.length < 1}
                      onClick={() => {
                        bannerRestore(selectedBannerIds);
                        toggle();
                      }}
                    >
                      복구
                    </Button>
                  </Col>
                )}
              </Row>
              <FormGroup>
                <Label for="bannerFile">
                  배너 사진 파일
                </Label>
                <Input
                  id="bannerFile"
                  name="bannerFile"
                  type="file"
                  accept="image/*" 
                  onChange={handelImage}
                />
              </FormGroup>
              <Row>
                <Label>
                  배너 사진 미리보기
                </Label>
                {previewImg  && (
                  <div className="mt-2">
                    <img
                      src={previewImg}
                      alt="배너 미리보기"
                      className="w-full max-w-md rounded-lg shadow"
                    />
                  </div>
                )}
              </Row>
            </Form>
            

          </div>
        </CardBody>
      </Card>

      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalBody>
          {modalMsg}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            확인
          </Button>
        </ModalFooter>
      </Modal>

    </div>
  );
};

export default BannerList;